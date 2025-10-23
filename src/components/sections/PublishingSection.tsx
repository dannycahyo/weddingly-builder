import type {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
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
  const [guestNameInput, setGuestNameInput] = useState('');
  const [copied, setCopied] = useState(false);

  const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return 'https://theevermore.com';
  };

  const generatePersonalizedUrl = (guestName: string) => {
    if (!slug || !guestName.trim()) return '';
    const encodedName = encodeURIComponent(guestName.trim());
    return `${getBaseUrl()}/${slug}?to=${encodedName}`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

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

        {/* Personalized URL Generator */}
        {slug && (
          <div className="border-t pt-4 mt-6">
            <h3 className="text-sm font-medium mb-3">
              Generate Personalized Invitations
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Create unique URLs for each guest to personalize their
              invitation
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-700">
                  Guest Name
                </label>
                <Input
                  value={guestNameInput}
                  onChange={(e) => setGuestNameInput(e.target.value)}
                  placeholder="e.g., John Smith"
                  className="mt-1"
                />
              </div>

              {guestNameInput.trim() && (
                <div className="bg-gray-50 p-3 rounded-md">
                  <label className="text-xs font-medium text-gray-700 mb-1 block">
                    Personalized URL
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      value={generatePersonalizedUrl(guestNameInput)}
                      readOnly
                      className="text-xs bg-white"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(
                          generatePersonalizedUrl(guestNameInput),
                        )
                      }
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    This URL will show "Dear {guestNameInput}," on the
                    invitation
                  </p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                <p className="text-xs text-blue-900">
                  <strong>💡 Tip:</strong> Copy the personalized URL
                  for each guest and send it to them via WhatsApp,
                  email, or your preferred method.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
