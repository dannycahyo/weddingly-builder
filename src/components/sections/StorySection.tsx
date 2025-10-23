import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { FormField } from '../FormField';
import { ImageUpload } from '../ImageUpload';
import type { WeddingSiteFormData } from '../../lib/validations';

interface StorySectionProps {
  register: UseFormRegister<WeddingSiteFormData>;
  errors: FieldErrors<WeddingSiteFormData>;
  control: Control<WeddingSiteFormData>;
  watch: UseFormWatch<WeddingSiteFormData>;
}

export function StorySection({
  register,
  errors,
  control,
  watch,
}: StorySectionProps) {
  const storyEnabled = watch('storyEnabled');

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Our Story</CardTitle>
            <CardDescription>
              Share your love story with your guests
            </CardDescription>
          </div>
          <Controller
            name="storyEnabled"
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
      {storyEnabled && (
        <CardContent className="space-y-4">
          <FormField
            label="Section Title"
            name="storyTitle"
            register={register}
            errors={errors}
            required
          />

          <FormField
            label="Your Story"
            name="storyText"
            placeholder="Tell your story..."
            register={register}
            errors={errors}
            multiline
            rows={6}
          />

          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="storyImage1Url"
              control={control}
              render={({ field }) => (
                <ImageUpload
                  label="Story Image 1"
                  value={field.value || ''}
                  onChange={field.onChange}
                  onClear={() => field.onChange('')}
                />
              )}
            />

            <Controller
              name="storyImage2Url"
              control={control}
              render={({ field }) => (
                <ImageUpload
                  label="Story Image 2 (Optional)"
                  value={field.value || ''}
                  onChange={field.onChange}
                  onClear={() => field.onChange('')}
                />
              )}
            />
          </div>

          {errors.storyImage1Url && (
            <p className="text-sm text-red-500">
              {errors.storyImage1Url.message}
            </p>
          )}
          {errors.storyImage2Url && (
            <p className="text-sm text-red-500">
              {errors.storyImage2Url.message}
            </p>
          )}
        </CardContent>
      )}
    </Card>
  );
}
