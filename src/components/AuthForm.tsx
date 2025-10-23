import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { FormField } from './FormField';
import {
  loginSchema,
  registerSchema,
  type LoginFormData,
  type RegisterFormData,
} from '../lib/validations';
import { authService } from '../lib/api';

interface AuthFormProps {
  onSuccess?: () => void;
}

export default function AuthForm({ onSuccess }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const currentForm = isLogin ? loginForm : registerForm;
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = currentForm;

  const onSubmit = async (data: LoginFormData | RegisterFormData) => {
    try {
      if (isLogin) {
        await authService.login(data);
        toast.success('Login successful!');
      } else {
        await authService.register(data);
        toast.success('Registration successful!');
      }

      // Redirect to admin
      window.location.href = '/admin';

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Authentication failed';
      toast.error(message);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    loginForm.reset();
    registerForm.reset();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{isLogin ? 'Login' : 'Create Account'}</CardTitle>
        <CardDescription>
          {isLogin
            ? 'Welcome back! Please login to your account.'
            : 'Create your account to start building your wedding website.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="your@email.com"
            register={register}
            errors={errors}
            required
            disabled={isSubmitting}
          />

          <FormField
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            register={register}
            errors={errors}
            required
            disabled={isSubmitting}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Loading...'
              : isLogin
              ? 'Login'
              : 'Create Account'}
          </Button>

          <div className="text-center text-sm">
            {isLogin
              ? "Don't have an account? "
              : 'Already have an account? '}
            <button
              type="button"
              onClick={toggleMode}
              className="text-primary hover:underline font-medium"
              disabled={isSubmitting}
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
