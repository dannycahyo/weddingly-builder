import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface PasswordPromptProps {
  onSubmit: (password: string) => void;
  error?: string;
  primaryColor?: string;
  headingFont?: string;
}

export function PasswordPrompt({
  onSubmit,
  error,
  primaryColor = '#e4b6c6',
  headingFont = 'Playfair Display',
}: PasswordPromptProps) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-gray-50 to-gray-100">
      <div className="max-w-md w-full">
        <div
          className="text-center mb-8"
          style={{
            fontFamily: headingFont,
          }}
        >
          <div
            className="text-5xl mb-4"
            style={{ color: primaryColor }}
          >
            🔒
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Password Protected
          </h1>
          <p className="text-gray-600">
            Please enter the password to view this wedding website
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full text-center text-lg"
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {error}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            style={{
              backgroundColor: primaryColor,
            }}
          >
            Enter
          </Button>
        </form>
      </div>
    </div>
  );
}
