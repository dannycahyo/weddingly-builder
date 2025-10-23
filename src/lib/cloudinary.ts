// Cloudinary configuration and utilities

export interface CloudinaryUploadResult {
  success: boolean;
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  error?: string;
}

export interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

/**
 * Upload an image file to Cloudinary
 */
export async function uploadImage(
  file: File,
): Promise<CloudinaryUploadResult> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to upload image');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Failed to upload image';
    return {
      success: false,
      url: '',
      publicId: '',
      width: 0,
      height: 0,
      format: '',
      error: message,
    };
  }
}

/**
 * Validate image file before upload
 */
export function validateImageFile(file: File): {
  valid: boolean;
  error?: string;
} {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'File must be an image' };
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size must be less than 10MB',
    };
  }

  // Check file extension
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (!extension || !validExtensions.includes(extension)) {
    return {
      valid: false,
      error: `File must be one of: ${validExtensions.join(', ')}`,
    };
  }

  return { valid: true };
}

/**
 * Generate Cloudinary URL with transformations
 */
export function getCloudinaryUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'scale' | 'crop' | 'thumb';
    quality?: 'auto' | number;
    format?: 'auto' | 'jpg' | 'png' | 'webp';
  },
): string {
  const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    console.error('Cloudinary cloud name not configured');
    return '';
  }

  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;

  const transformations: string[] = [];

  if (options?.width) transformations.push(`w_${options.width}`);
  if (options?.height) transformations.push(`h_${options.height}`);
  if (options?.crop) transformations.push(`c_${options.crop}`);
  if (options?.quality) transformations.push(`q_${options.quality}`);
  if (options?.format) transformations.push(`f_${options.format}`);

  const transformationString =
    transformations.length > 0 ? `${transformations.join(',')}/` : '';

  return `${baseUrl}/${transformationString}${publicId}`;
}

/**
 * Extract public ID from Cloudinary URL
 */
export function extractPublicId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');

    // Find the upload index
    const uploadIndex = pathParts.findIndex(
      (part) => part === 'upload',
    );
    if (uploadIndex === -1) return null;

    // Get everything after transformations
    const afterUpload = pathParts.slice(uploadIndex + 1);

    // Skip version if present (starts with 'v' followed by numbers)
    const startIndex = afterUpload[0]?.match(/^v\d+$/) ? 1 : 0;

    // Join the remaining parts (folder + filename without extension)
    const publicIdParts = afterUpload.slice(startIndex);
    const filename = publicIdParts[publicIdParts.length - 1];
    const filenameWithoutExt = filename?.split('.')[0];

    if (!filenameWithoutExt) return null;

    publicIdParts[publicIdParts.length - 1] = filenameWithoutExt;

    return publicIdParts.join('/');
  } catch (error) {
    console.error('Error extracting public ID:', error);
    return null;
  }
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${
    sizes[i]
  }`;
}
