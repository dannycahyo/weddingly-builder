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
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { FormField } from '../FormField';
import { ImageUpload } from '../ImageUpload';
import type { WeddingSiteFormData } from '../../lib/validations';

interface HeroSectionProps {
  register: UseFormRegister<WeddingSiteFormData>;
  errors: FieldErrors<WeddingSiteFormData>;
  control: Control<WeddingSiteFormData>;
  watch: UseFormWatch<WeddingSiteFormData>;
}

export function HeroSection({
  register,
  errors,
  control,
  watch,
}: HeroSectionProps) {
  const heroEnabled = watch('heroEnabled');
  const heroImageUrl = watch('heroImageUrl');

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Hero Section</CardTitle>
            <CardDescription>
              Main banner with couple names and wedding date
            </CardDescription>
          </div>
          <Controller
            name="heroEnabled"
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
      {heroEnabled && (
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Bride's Name"
              name="brideName"
              placeholder="Enter bride's name"
              register={register}
              errors={errors}
            />

            <FormField
              label="Groom's Name"
              name="groomName"
              placeholder="Enter groom's name"
              register={register}
              errors={errors}
            />
          </div>

          <Controller
            name="weddingDate"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Wedding Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value
                        ? format(field.value, 'PPP')
                        : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value || undefined}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.weddingDate && (
                  <p className="text-sm text-red-500">
                    {errors.weddingDate.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="heroImageUrl"
            control={control}
            render={({ field }) => (
              <ImageUpload
                label="Hero Image"
                value={field.value || ''}
                onChange={field.onChange}
                onClear={() => field.onChange('')}
              />
            )}
          />

          {errors.heroImageUrl && (
            <p className="text-sm text-red-500">
              {errors.heroImageUrl.message}
            </p>
          )}
        </CardContent>
      )}
    </Card>
  );
}
