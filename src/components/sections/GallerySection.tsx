import { useState } from 'react';
import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { FormField } from '../FormField';
import { ImageUpload } from '../ImageUpload';
import { Trash2, Plus } from 'lucide-react';
import type { WeddingSiteFormData } from '../../lib/validations';

interface GallerySectionProps {
  register: UseFormRegister<WeddingSiteFormData>;
  errors: FieldErrors<WeddingSiteFormData>;
  control: Control<WeddingSiteFormData>;
  watch: UseFormWatch<WeddingSiteFormData>;
}

export function GallerySection({
  register,
  errors,
  control,
  watch,
}: GallerySectionProps) {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(
    null,
  );
  const galleryEnabled = watch('galleryEnabled');
  const galleryImages = watch('galleryImages') || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Photo Gallery</CardTitle>
            <CardDescription>
              Upload up to 10 photos (image URLs)
            </CardDescription>
          </div>
          <Controller
            name="galleryEnabled"
            control={control}
            render={({ field }) => (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Enabled</span>
              </label>
            )}
          />
        </div>
      </CardHeader>
      {galleryEnabled && (
        <CardContent className="space-y-4">
          <FormField
            label="Section Title"
            name="galleryTitle"
            register={register}
            errors={errors}
            required
          />

          <Controller
            name="galleryImages"
            control={control}
            render={({ field }) => (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">
                    Gallery Images
                  </label>
                  <p className="text-xs text-muted-foreground">
                    {field.value.length}/10 images
                  </p>
                </div>

                {errors.galleryImages && (
                  <p className="text-sm text-red-500">
                    {errors.galleryImages.message}
                  </p>
                )}

                <div className="grid grid-cols-3 gap-4">
                  {field.value.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => {
                          const newImages = field.value.filter(
                            (_, i) => i !== index,
                          );
                          field.onChange(newImages);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}

                  {field.value.length < 10 && (
                    <div className="relative">
                      <ImageUpload
                        value=""
                        onChange={(url) => {
                          if (field.value.length < 10) {
                            field.onChange([...field.value, url]);
                          }
                        }}
                        className="h-32"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          />
        </CardContent>
      )}
    </Card>
  );
}
