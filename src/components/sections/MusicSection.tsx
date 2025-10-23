import type {
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
} from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Music } from 'lucide-react';
import { AudioUpload } from '@/components/AudioUpload';

interface MusicSectionProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
}

export function MusicSection({
  register,
  watch,
  setValue,
}: MusicSectionProps) {
  const musicEnabled = watch('musicEnabled');
  const musicUrl = watch('musicUrl');

  return (
    <Card className="border-2">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <Music className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Background Music
            </h2>
            <p className="text-sm text-gray-500">
              Add a special song to play on your wedding page
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Enable Music Toggle */}
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
            <div>
              <Label
                htmlFor="musicEnabled"
                className="text-base font-medium"
              >
                Enable Background Music
              </Label>
              <p className="text-sm text-gray-500 mt-1">
                Play music when guests visit your page
              </p>
            </div>
            <input
              type="checkbox"
              id="musicEnabled"
              {...register('musicEnabled')}
              className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
            />
          </div>

          {musicEnabled && (
            <>
              {/* Music File Upload */}
              <div className="space-y-2">
                <Label htmlFor="musicUrl">
                  Music File <span className="text-red-500">*</span>
                </Label>
                <AudioUpload
                  value={musicUrl}
                  onChange={(url) => setValue('musicUrl', url)}
                  onRemove={() => setValue('musicUrl', '')}
                />
                <p className="text-xs text-gray-500">
                  Upload your wedding song (MP3, WAV, M4A, or OGG -
                  max 10MB)
                </p>
              </div>

              {/* Song Title */}
              <div className="space-y-2">
                <Label htmlFor="musicTitle">
                  Song Title (Optional)
                </Label>
                <Input
                  id="musicTitle"
                  {...register('musicTitle')}
                  placeholder="e.g., Perfect by Ed Sheeran"
                />
                <p className="text-xs text-gray-500">
                  Display the song title for your guests
                </p>
              </div>

              {/* Artist Name */}
              <div className="space-y-2">
                <Label htmlFor="musicArtist">
                  Artist Name (Optional)
                </Label>
                <Input
                  id="musicArtist"
                  {...register('musicArtist')}
                  placeholder="e.g., Ed Sheeran"
                />
              </div>

              {/* Tips */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                  <Music className="w-4 h-4" />
                  Music Tips
                </h4>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>
                    Choose a romantic song that's meaningful to you
                    both
                  </li>
                  <li>
                    Keep the file size under 10MB for faster loading
                  </li>
                  <li>
                    Music will autoplay (muted initially, guests can
                    unmute)
                  </li>
                  <li>
                    Popular choices: "A Thousand Years", "Perfect",
                    "All of Me"
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
