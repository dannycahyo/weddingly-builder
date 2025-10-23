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

interface RegistrySectionProps {
  register: UseFormRegister<WeddingSiteFormData>;
  errors: FieldErrors<WeddingSiteFormData>;
  control: Control<WeddingSiteFormData>;
  watch: UseFormWatch<WeddingSiteFormData>;
}

export function RegistrySection({
  register,
  errors,
  control,
  watch,
}: RegistrySectionProps) {
  const registryEnabled = watch('registryEnabled');

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Gift Registry</CardTitle>
            <CardDescription>
              Add registry links or bank details
            </CardDescription>
          </div>
          <Controller
            name="registryEnabled"
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
      {registryEnabled && (
        <CardContent className="space-y-4">
          <FormField
            label="Section Title"
            name="registryTitle"
            register={register}
            errors={errors}
            required
          />

          <FormField
            label="Registry Information"
            name="registryText"
            placeholder="Add registry links or bank transfer details..."
            register={register}
            errors={errors}
            multiline
            rows={4}
          />
        </CardContent>
      )}
    </Card>
  );
}
