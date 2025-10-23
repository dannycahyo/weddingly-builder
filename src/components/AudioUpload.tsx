import { useState, useRef } from 'react';
import { Upload, Music, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';

interface AudioUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
}

export function AudioUpload({
  value,
  onChange,
  onRemove,
}: AudioUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = [
      'audio/mpeg',
      'audio/mp3',
      'audio/wav',
      'audio/m4a',
      'audio/ogg',
    ];
    if (
      !validTypes.includes(file.type) &&
      !file.name.match(/\.(mp3|wav|m4a|ogg)$/i)
    ) {
      toast.error(
        'Please upload a valid audio file (MP3, WAV, M4A, or OGG)',
      );
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      onChange(data.url);
      toast.success('Audio uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload audio. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    } else {
      onChange('');
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*,.mp3,.wav,.m4a,.ogg"
        onChange={handleFileChange}
        className="hidden"
      />

      {!value ? (
        <button
          type="button"
          onClick={handleClick}
          disabled={isUploading}
          className="relative w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 flex flex-col items-center justify-center gap-2 text-gray-600 hover:text-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
              <span className="text-sm font-medium">
                Uploading audio...
              </span>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8" />
              <div className="text-center">
                <p className="text-sm font-medium">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  MP3, WAV, M4A or OGG (max 10MB)
                </p>
              </div>
            </>
          )}
        </button>
      ) : (
        <div className="relative w-full border-2 border-purple-200 rounded-lg p-4 bg-purple-50">
          <audio
            ref={audioRef}
            src={value}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />

          <div className="flex items-center gap-3">
            {/* Play Button */}
            <button
              type="button"
              onClick={togglePlay}
              className="shrink-0 w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors flex items-center justify-center text-white"
            >
              {isPlaying ? (
                <div className="flex gap-1">
                  <div className="w-1 h-4 bg-white rounded animate-pulse" />
                  <div className="w-1 h-4 bg-white rounded animate-pulse delay-75" />
                  <div className="w-1 h-4 bg-white rounded animate-pulse delay-150" />
                </div>
              ) : (
                <Music className="w-5 h-5" />
              )}
            </button>

            {/* Audio Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Audio uploaded
              </p>
              <p className="text-xs text-gray-500">
                Click play button to preview
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleClick}
                disabled={isUploading}
                className="px-3 py-1.5 text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-100 rounded-md transition-colors"
              >
                Change
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
