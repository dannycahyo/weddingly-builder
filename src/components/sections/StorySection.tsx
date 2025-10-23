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
  const storyImage1Url = watch('storyImage1Url');
  const storyImage2Url = watch('storyImage2Url');

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
            <div className="space-y-2">
              <FormField
                label="Story Image 1 URL"
                name="storyImage1Url"
                type="url"
                placeholder="https://example.com/image1.jpg"
                register={register}
                errors={errors}
              />
              {storyImage1Url && (
                <img
                  src={storyImage1Url}
                  alt="Story 1"
                  className="w-full h-32 object-cover rounded-md"
                />
              )}
            </div>
            <div className="space-y-2">
              <FormField
                label="Story Image 2 URL (Optional)"
                name="storyImage2Url"
                type="url"
                placeholder="https://example.com/image2.jpg"
                register={register}
                errors={errors}
              />
              {storyImage2Url && (
                <img
                  src={storyImage2Url}
                  alt="Story 2"
                  className="w-full h-32 object-cover rounded-md"
                />
              )}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
