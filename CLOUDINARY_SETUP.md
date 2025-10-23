# Cloudinary Image Upload Setup Guide

This guide explains how to set up Cloudinary for image uploads in the Weddingly Builder application.

## Prerequisites

1. A Cloudinary account (free tier is sufficient)
2. Cloudinary credentials in `.env` file

## Step 1: Create Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. After logging in, go to the Dashboard

## Step 2: Get Your Credentials

From your Cloudinary Dashboard, you'll need:

- **Cloud Name**: Found at the top of the dashboard
- **API Key**: Found in the "Account Details" section
- **API Secret**: Found in the "Account Details" section (click "Reveal" to see it)

These should already be in your `.env` file:

```env
PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
PUBLIC_CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Step 3: Create Upload Preset

An upload preset is required for unsigned uploads from the browser.

1. Go to **Settings** → **Upload** in your Cloudinary dashboard
2. Scroll down to **Upload presets**
3. Click **Add upload preset**
4. Configure the preset:
   - **Preset name**: `weddingly`
   - **Signing mode**: Choose **Unsigned** (important!)
   - **Folder**: `weddingly-builder` (optional, for organization)
   - **Access mode**: Leave as **Public**
   - **Allowed formats**: Select image formats (jpg, png, gif, webp)
   - **Max file size**: Set to 10MB (10485760 bytes)
5. Click **Save**

> **Important**: The preset name must be `weddingly` as it's hardcoded in `/src/pages/api/upload.ts`. If you want to use a different name, update the code accordingly.

## Step 4: Test the Upload

1. Start your development server: `npm run dev`
2. Log in to the admin dashboard
3. Go to the Wedding Builder
4. Try uploading an image in any section (Hero, Story, or Gallery)
5. You should see:
   - A loading indicator while uploading
   - The uploaded image preview after successful upload
   - The image stored in your Cloudinary account

## Features Implemented

### Image Upload Component (`ImageUpload.tsx`)

- **Drag and drop**: Drag images directly onto the upload area
- **Click to upload**: Click to open file picker
- **File validation**:
  - Only accepts image files
  - Maximum size: 10MB
  - Supported formats: JPG, PNG, GIF, WEBP
- **Preview**: Shows uploaded image with hover actions
- **Replace/Remove**: Easy buttons to change or remove images
- **Loading state**: Shows spinner during upload

### Upload API Endpoint (`/api/upload`)

- **Authentication**: Requires user to be logged in
- **Validation**: Checks file type and size
- **Base64 conversion**: Converts file to data URI for Cloudinary
- **Error handling**: Returns descriptive error messages
- **Response**: Returns secure URL, public ID, dimensions, and format

### Cloudinary Utilities (`lib/cloudinary.ts`)

- `uploadImage()`: Upload image file to Cloudinary
- `validateImageFile()`: Validate file before upload
- `getCloudinaryUrl()`: Generate URL with transformations
- `extractPublicId()`: Extract public ID from Cloudinary URL
- `formatFileSize()`: Format bytes to human-readable size

## Sections with Image Upload

### 1. Hero Section

- **Hero Image**: Main banner image
- **Usage**: Single upload with preview

### 2. Story Section

- **Story Image 1**: First story image
- **Story Image 2**: Second story image (optional)
- **Usage**: Two separate uploads with previews

### 3. Gallery Section

- **Gallery Images**: Up to 10 images
- **Usage**: Multiple uploads with grid preview
- **Features**: Add more images until limit, remove individual images

## Image Transformations

The Cloudinary utility supports transformations:

```typescript
import { getCloudinaryUrl } from '../lib/cloudinary';

// Get optimized thumbnail
const thumbnailUrl = getCloudinaryUrl(publicId, {
  width: 300,
  height: 300,
  crop: 'fill',
  quality: 'auto',
  format: 'auto',
});
```

**Available transformations**:

- `width`: Set image width
- `height`: Set image height
- `crop`: Crop mode (fill, fit, scale, crop, thumb)
- `quality`: Image quality (auto or 1-100)
- `format`: Output format (auto, jpg, png, webp)

## Folder Structure

Images are organized in Cloudinary:

```
weddingly-builder/
  ├── image1.jpg
  ├── image2.jpg
  └── ...
```

## Security Notes

1. **Upload preset is unsigned**: This allows direct browser uploads without exposing API secrets
2. **Authentication required**: Users must be logged in to upload
3. **File validation**: Both client-side and server-side validation
4. **Size limits**: Maximum 10MB per image
5. **Type restrictions**: Only image files allowed

## Troubleshooting

### Error: "Failed to upload image to Cloudinary"

**Solution**: Check that your upload preset is:

- Named `weddingly`
- Set to **Unsigned** mode
- Folder is set to `weddingly-builder`

### Error: "File must be an image"

**Solution**: Ensure you're uploading a valid image file (JPG, PNG, GIF, or WEBP)

### Error: "File size must be less than 10MB"

**Solution**: Compress or resize your image before uploading

### Images not showing

**Solution**:

1. Check browser console for errors
2. Verify Cloudinary credentials in `.env`
3. Check that images exist in your Cloudinary Media Library
4. Ensure the returned URL is accessible

## Environment Variables

Required in `.env`:

```env
# Cloudinary Configuration
PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
PUBLIC_CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

> **Note**: `PUBLIC_` prefix makes the variable available in browser code (needed for generating Cloudinary URLs).

## Next Steps

- Consider adding image compression before upload
- Implement automatic image optimization
- Add support for multiple file uploads at once
- Create image cropping functionality
- Add progress percentage indicator
