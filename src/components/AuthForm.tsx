import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useNotification } from '../hooks/useNotification';

interface AuthFormProps {
  onSuccess?: () => void;
}

export default function AuthForm({ onSuccess }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const { notification, showError, clearNotification } =
    useNotification();

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
    clearNotification();

    try {
      if (isLogin) {
        await authService.login(data);
      } else {
        await authService.register(data);
      }

      // Redirect to admin
      window.location.href = '/admin';

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Authentication failed';
      showError(message);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    clearNotification();
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
          {notification && notification.type === 'error' && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
              {notification.message}
            </div>
          )}

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
