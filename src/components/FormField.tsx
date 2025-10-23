import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import type {
  UseFormRegister,
  FieldErrors,
  Path,
} from 'react-hook-form';

interface FormFieldProps<T extends Record<string, any>> {
  label: string;
  name: Path<T>;
  type?: 'text' | 'email' | 'password' | 'url' | 'color' | 'time';
  placeholder?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
}

export function FormField<T extends Record<string, any>>({
  label,
  name,
  type = 'text',
  placeholder,
  register,
  errors,
  multiline = false,
  rows = 4,
  required = false,
  disabled = false,
}: FormFieldProps<T>) {
  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {multiline ? (
        <Textarea
          id={name}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          {...register(name)}
          className={errorMessage ? 'border-red-500' : ''}
        />
      ) : (
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...register(name)}
          className={errorMessage ? 'border-red-500' : ''}
        />
      )}
      {errorMessage && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}
