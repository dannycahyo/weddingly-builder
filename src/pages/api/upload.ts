import type { APIRoute } from 'astro';
import { requireAuth } from '../../lib/auth';

interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
}

export const POST: APIRoute = async (context) => {
  try {
    await requireAuth(context);

    const formData = await context.request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file provided' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    // Validate file type (images and audio)
    const isImage = file.type.startsWith('image/');
    const isAudio =
      file.type.startsWith('audio/') ||
      file.name.match(/\.(mp3|wav|m4a|ogg)$/i);

    if (!isImage && !isAudio) {
      return new Response(
        JSON.stringify({
          error: 'File must be an image or audio file',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return new Response(
        JSON.stringify({ error: 'File size must be less than 10MB' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    const dataUri = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary
    const resourceType = isAudio ? 'video' : 'image'; // Cloudinary uses 'video' for audio
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${
      import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME
    }/${resourceType}/upload`;

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', dataUri);
    cloudinaryFormData.append('upload_preset', 'weddingly'); // We'll need to create this preset
    cloudinaryFormData.append('folder', 'weddingly-builder');

    if (isAudio) {
      cloudinaryFormData.append('resource_type', 'video'); // Required for audio files
    }

    const uploadResponse = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: cloudinaryFormData,
    });

    if (!uploadResponse.ok) {
      const error = await uploadResponse.text();
      console.error('Cloudinary upload error:', error);
      return new Response(
        JSON.stringify({
          error: `Failed to upload ${
            isAudio ? 'audio' : 'image'
          } to Cloudinary`,
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const result =
      (await uploadResponse.json()) as CloudinaryUploadResponse;

    return new Response(
      JSON.stringify({
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Failed to upload file';
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
