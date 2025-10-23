import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Calendar } from './ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { CalendarIcon, Plus, Trash2, Save } from 'lucide-react';
import { format } from 'date-fns';

interface Event {
  id?: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  address: string;
}

interface BuilderFormProps {
  initialData?: any;
  onSave?: (data: any) => void;
}

export default function BuilderForm({
  initialData,
  onSave,
}: BuilderFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Global Styles
  const [primaryColor, setPrimaryColor] = useState(
    initialData?.primaryColor || '#e4b6c6',
  );
  const [secondaryColor, setSecondaryColor] = useState(
    initialData?.secondaryColor || '#d4a5a5',
  );
  const [accentColor, setAccentColor] = useState(
    initialData?.accentColor || '#9b7e7e',
  );
  const [headingFont, setHeadingFont] = useState(
    initialData?.headingFont || 'Playfair Display',
  );
  const [bodyFont, setBodyFont] = useState(
    initialData?.bodyFont || 'Lato',
  );

  // Hero Section
  const [heroEnabled, setHeroEnabled] = useState(
    initialData?.heroEnabled ?? true,
  );
  const [brideName, setBrideName] = useState(
    initialData?.brideName || '',
  );
  const [groomName, setGroomName] = useState(
    initialData?.groomName || '',
  );
  const [weddingDate, setWeddingDate] = useState<Date | undefined>(
    initialData?.weddingDate
      ? new Date(initialData.weddingDate)
      : undefined,
  );
  const [heroImageUrl, setHeroImageUrl] = useState(
    initialData?.heroImageUrl || '',
  );

  // Our Story
  const [storyEnabled, setStoryEnabled] = useState(
    initialData?.storyEnabled ?? true,
  );
  const [storyTitle, setStoryTitle] = useState(
    initialData?.storyTitle || 'Our Story',
  );
  const [storyText, setStoryText] = useState(
    initialData?.storyText || '',
  );
  const [storyImage1Url, setStoryImage1Url] = useState(
    initialData?.storyImage1Url || '',
  );
  const [storyImage2Url, setStoryImage2Url] = useState(
    initialData?.storyImage2Url || '',
  );

  // Photo Gallery
  const [galleryEnabled, setGalleryEnabled] = useState(
    initialData?.galleryEnabled ?? false,
  );
  const [galleryTitle, setGalleryTitle] = useState(
    initialData?.galleryTitle || 'Our Gallery',
  );
  const [galleryImages, setGalleryImages] = useState<string[]>(
    initialData?.galleryImages || [],
  );
  const [newGalleryImage, setNewGalleryImage] = useState('');

  // Gift Registry
  const [registryEnabled, setRegistryEnabled] = useState(
    initialData?.registryEnabled ?? true,
  );
  const [registryTitle, setRegistryTitle] = useState(
    initialData?.registryTitle || 'Gift Registry',
  );
  const [registryText, setRegistryText] = useState(
    initialData?.registryText || '',
  );

  // Events
  const [events, setEvents] = useState<Event[]>(
    initialData?.events?.map((e: any) => ({
      ...e,
      date: new Date(e.date),
    })) || [],
  );

  // Publishing
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [password, setPassword] = useState(
    initialData?.password || '',
  );
  const [isPublished, setIsPublished] = useState(
    initialData?.isPublished ?? false,
  );

  const addEvent = () => {
    setEvents([
      ...events,
      {
        title: '',
        date: new Date(),
        time: '',
        location: '',
        address: '',
      },
    ]);
  };

  const removeEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const updateEvent = (
    index: number,
    field: keyof Event,
    value: any,
  ) => {
    const newEvents = [...events];
    newEvents[index] = { ...newEvents[index], [field]: value };
    setEvents(newEvents);
  };

  const addGalleryImage = () => {
    if (newGalleryImage && galleryImages.length < 10) {
      setGalleryImages([...galleryImages, newGalleryImage]);
      setNewGalleryImage('');
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');

    try {
      const data = {
        // Global Styles
        primaryColor,
        secondaryColor,
        accentColor,
        headingFont,
        bodyFont,

        // Hero
        heroEnabled,
        brideName,
        groomName,
        weddingDate: weddingDate?.toISOString(),
        heroImageUrl,

        // Story
        storyEnabled,
        storyTitle,
        storyText,
        storyImage1Url,
        storyImage2Url,

        // Gallery
        galleryEnabled,
        galleryTitle,
        galleryImages,

        // Registry
        registryEnabled,
        registryTitle,
        registryText,

        // Publishing
        slug:
          slug ||
          `${brideName}-and-${groomName}`
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-'),
        password,

        // Events
        events: events.map((e) => ({
          ...e,
          date: e.date.toISOString(),
        })),
      };

      const response = await fetch('/api/wedding/site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save');
      }

      setMessage('Saved successfully!');
      if (onSave) {
        const result = await response.json();
        onSave(result.weddingSite);
      }
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    await handleSave();
    setIsPublished(true);
  };

  return (
    <div className="space-y-6 pb-10">
      {message && (
        <div
          className={`p-4 rounded-md ${
            message.includes('Error')
              ? 'bg-red-50 text-red-900'
              : 'bg-green-50 text-green-900'
          }`}
        >
          {message}
        </div>
      )}

      {/* Global Style Editor */}
      <Card>
        <CardHeader>
          <CardTitle>Global Styles</CardTitle>
          <CardDescription>
            Customize the colors and fonts for your wedding website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Primary Color
              </label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-16 h-10 p-1"
                />
                <Input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Secondary Color
              </label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-16 h-10 p-1"
                />
                <Input
                  type="text"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Accent Color
              </label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-16 h-10 p-1"
                />
                <Input
                  type="text"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Heading Font
              </label>
              <Input
                value={headingFont}
                onChange={(e) => setHeadingFont(e.target.value)}
                placeholder="e.g., Playfair Display"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Body Font</label>
              <Input
                value={bodyFont}
                onChange={(e) => setBodyFont(e.target.value)}
                placeholder="e.g., Lato"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hero Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>
                Main banner with couple names and wedding date
              </CardDescription>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={heroEnabled}
                onChange={(e) => setHeroEnabled(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Enabled</span>
            </label>
          </div>
        </CardHeader>
        {heroEnabled && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Bride's Name
                </label>
                <Input
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                  placeholder="Enter bride's name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Groom's Name
                </label>
                <Input
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                  placeholder="Enter groom's name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Wedding Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {weddingDate
                      ? format(weddingDate, 'PPP')
                      : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={weddingDate}
                    onSelect={setWeddingDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Hero Image URL
              </label>
              <Input
                value={heroImageUrl}
                onChange={(e) => setHeroImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              {heroImageUrl && (
                <img
                  src={heroImageUrl}
                  alt="Hero preview"
                  className="mt-2 w-full h-48 object-cover rounded-md"
                />
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Event Details */}
      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
          <CardDescription>
            Add ceremony, reception, and other events
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {events.map((event, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium">Event {index + 1}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEvent(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Event Title
                  </label>
                  <Input
                    value={event.title}
                    onChange={(e) =>
                      updateEvent(index, 'title', e.target.value)
                    }
                    placeholder="e.g., Ceremony"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Location Name
                  </label>
                  <Input
                    value={event.location}
                    onChange={(e) =>
                      updateEvent(index, 'location', e.target.value)
                    }
                    placeholder="e.g., St. Mary's Church"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(event.date, 'PPP')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={event.date}
                        onSelect={(date) =>
                          date && updateEvent(index, 'date', date)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Input
                    type="time"
                    value={event.time}
                    onChange={(e) =>
                      updateEvent(index, 'time', e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Address</label>
                <Input
                  value={event.address}
                  onChange={(e) =>
                    updateEvent(index, 'address', e.target.value)
                  }
                  placeholder="Full address for Google Maps"
                />
              </div>
            </div>
          ))}

          <Button
            onClick={addEvent}
            variant="outline"
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </CardContent>
      </Card>

      {/* Our Story */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Our Story</CardTitle>
              <CardDescription>
                Share your love story with your guests
              </CardDescription>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={storyEnabled}
                onChange={(e) => setStoryEnabled(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Enabled</span>
            </label>
          </div>
        </CardHeader>
        {storyEnabled && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Section Title
              </label>
              <Input
                value={storyTitle}
                onChange={(e) => setStoryTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Your Story
              </label>
              <Textarea
                value={storyText}
                onChange={(e) => setStoryText(e.target.value)}
                placeholder="Tell your story..."
                rows={6}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Story Image 1 URL
                </label>
                <Input
                  value={storyImage1Url}
                  onChange={(e) => setStoryImage1Url(e.target.value)}
                  placeholder="https://example.com/image1.jpg"
                />
                {storyImage1Url && (
                  <img
                    src={storyImage1Url}
                    alt="Story 1"
                    className="w-full h-32 object-cover rounded-md"
                  />
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Story Image 2 URL (Optional)
                </label>
                <Input
                  value={storyImage2Url}
                  onChange={(e) => setStoryImage2Url(e.target.value)}
                  placeholder="https://example.com/image2.jpg"
                />
                {storyImage2Url && (
                  <img
                    src={storyImage2Url}
                    alt="Story 2"
                    className="w-full h-32 object-cover rounded-md"
                  />
                )}
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Photo Gallery */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Photo Gallery</CardTitle>
              <CardDescription>
                Upload up to 10 photos (image URLs)
              </CardDescription>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={galleryEnabled}
                onChange={(e) => setGalleryEnabled(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Enabled</span>
            </label>
          </div>
        </CardHeader>
        {galleryEnabled && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Section Title
              </label>
              <Input
                value={galleryTitle}
                onChange={(e) => setGalleryTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Add Image URL
              </label>
              <div className="flex gap-2">
                <Input
                  value={newGalleryImage}
                  onChange={(e) => setNewGalleryImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  disabled={galleryImages.length >= 10}
                />
                <Button
                  onClick={addGalleryImage}
                  disabled={
                    galleryImages.length >= 10 || !newGalleryImage
                  }
                >
                  Add
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {galleryImages.length}/10 images added
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {galleryImages.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeGalleryImage(index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Gift Registry */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gift Registry</CardTitle>
              <CardDescription>
                Add registry links or bank details
              </CardDescription>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={registryEnabled}
                onChange={(e) => setRegistryEnabled(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Enabled</span>
            </label>
          </div>
        </CardHeader>
        {registryEnabled && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Section Title
              </label>
              <Input
                value={registryTitle}
                onChange={(e) => setRegistryTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Registry Information
              </label>
              <Textarea
                value={registryText}
                onChange={(e) => setRegistryText(e.target.value)}
                placeholder="Add registry links or bank transfer details..."
                rows={4}
              />
            </div>
          </CardContent>
        )}
      </Card>

      {/* Publishing */}
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
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="jane-and-john"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Leave empty to auto-generate from couple names
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Password Protection (Optional)
            </label>
            <Input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave empty for no password"
            />
            <p className="text-xs text-muted-foreground">
              Guests will need this password to view your website
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 sticky bottom-0 bg-background py-4 border-t">
        <Button
          onClick={handleSave}
          disabled={loading}
          className="flex-1"
        >
          <Save className="mr-2 h-4 w-4" />
          {loading ? 'Saving...' : 'Save Draft'}
        </Button>
        <Button
          onClick={handlePublish}
          disabled={loading}
          className="flex-1"
          variant="default"
        >
          {loading
            ? 'Publishing...'
            : isPublished
            ? 'Update & Publish'
            : 'Publish Website'}
        </Button>
      </div>
    </div>
  );
}
