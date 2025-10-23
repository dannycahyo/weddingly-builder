import type {
  Control,
  FieldErrors,
  UseFormRegister,
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
import { FormField } from '../FormField';
import type { WeddingSiteFormData } from '../../lib/validations';

interface GlobalStylesSectionProps {
  register: UseFormRegister<WeddingSiteFormData>;
  errors: FieldErrors<WeddingSiteFormData>;
  control: Control<WeddingSiteFormData>;
}

export function GlobalStylesSection({
  register,
  errors,
  control,
}: GlobalStylesSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Global Styles</CardTitle>
        <CardDescription>
          Customize the colors and fonts for your wedding website
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <Controller
            name="primaryColor"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Primary Color
                </label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    {...field}
                    className="w-16 h-10 p-1"
                  />
                  <Input type="text" {...field} className="flex-1" />
                </div>
                {errors.primaryColor && (
                  <p className="text-sm text-red-500">
                    {errors.primaryColor.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="secondaryColor"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Secondary Color
                </label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    {...field}
                    className="w-16 h-10 p-1"
                  />
                  <Input type="text" {...field} className="flex-1" />
                </div>
                {errors.secondaryColor && (
                  <p className="text-sm text-red-500">
                    {errors.secondaryColor.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="accentColor"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Accent Color
                </label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    {...field}
                    className="w-16 h-10 p-1"
                  />
                  <Input type="text" {...field} className="flex-1" />
                </div>
                {errors.accentColor && (
                  <p className="text-sm text-red-500">
                    {errors.accentColor.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Heading Font"
            name="headingFont"
            placeholder="e.g., Playfair Display"
            register={register}
            errors={errors}
            required
          />

          <FormField
            label="Body Font"
            name="bodyFont"
            placeholder="e.g., Lato"
            register={register}
            errors={errors}
            required
          />
        </div>
      </CardContent>
    </Card>
  );
}
