import type {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
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

interface PublishingSectionProps {
  register: UseFormRegister<WeddingSiteFormData>;
  errors: FieldErrors<WeddingSiteFormData>;
  watch: UseFormWatch<WeddingSiteFormData>;
}

export function PublishingSection({
  register,
  errors,
  watch,
}: PublishingSectionProps) {
  const slug = watch('slug');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Publishing Settings</CardTitle>
        <CardDescription>
          Configure your wedding website URL and security
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Website URL Slug
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              theevermore.com/
            </span>
            <Input
              {...register('slug')}
              placeholder="jane-and-john"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Leave empty to auto-generate from couple names
          </p>
          {errors.slug && (
            <p className="text-sm text-red-500">
              {errors.slug.message}
            </p>
          )}
        </div>

        <FormField
          label="Password Protection (Optional)"
          name="password"
          type="text"
          placeholder="Leave empty for no password"
          register={register}
          errors={errors}
        />
        <p className="text-xs text-muted-foreground -mt-2">
          Guests will need this password to view your website
        </p>
      </CardContent>
    </Card>
  );
}
