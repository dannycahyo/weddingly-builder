import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Save } from 'lucide-react';
import {
  weddingSiteSchema,
  type WeddingSiteFormData,
  type WeddingSite,
} from '../lib/validations';
import { weddingSiteService } from '../lib/api';
import { GlobalStylesSection } from './sections/GlobalStylesSection';
import { HeroSection } from './sections/HeroSection';
import { EventsSection } from './sections/EventsSection';
import { PublishingSection } from './sections/PublishingSection';
import { StorySection } from './sections/StorySection';
import { GallerySection } from './sections/GallerySection';
import { RegistrySection } from './sections/RegistrySection';
import { MusicSection } from './sections/MusicSection';

interface BuilderFormProps {
  initialData?: WeddingSite;
  onSave?: (data: WeddingSite) => void;
}

export default function BuilderForm({
  initialData,
  onSave,
}: BuilderFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const form = useForm<WeddingSiteFormData>({
    resolver: zodResolver(weddingSiteSchema),
    defaultValues: {
      // Global Styles
      primaryColor: initialData?.primaryColor || '#e4b6c6',
      secondaryColor: initialData?.secondaryColor || '#d4a5a5',
      accentColor: initialData?.accentColor || '#9b7e7e',
      headingFont: initialData?.headingFont || 'Playfair Display',
      bodyFont: initialData?.bodyFont || 'Lato',

      // Hero Section
      heroEnabled: initialData?.heroEnabled ?? true,
      brideName: initialData?.brideName || '',
      groomName: initialData?.groomName || '',
      weddingDate: initialData?.weddingDate
        ? new Date(initialData.weddingDate)
        : null,
      heroImageUrl: initialData?.heroImageUrl || '',

      // Story Section
      storyEnabled: initialData?.storyEnabled ?? true,
      storyTitle: initialData?.storyTitle || 'Our Story',
      storyText: initialData?.storyText || '',
      storyImage1Url: initialData?.storyImage1Url || '',
      storyImage2Url: initialData?.storyImage2Url || '',

      // Gallery Section
      galleryEnabled: initialData?.galleryEnabled ?? false,
      galleryTitle: initialData?.galleryTitle || 'Our Gallery',
      galleryImages: initialData?.galleryImages || [],

      // Registry Section
      registryEnabled: initialData?.registryEnabled ?? true,
      registryTitle: initialData?.registryTitle || 'Gift Registry',
      registryText: initialData?.registryText || '',

      // Music Section
      musicEnabled: initialData?.musicEnabled ?? true,
      musicUrl: initialData?.musicUrl || '',
      musicTitle: initialData?.musicTitle || '',
      musicArtist: initialData?.musicArtist || '',

      // Publishing
      slug: initialData?.slug || '',
      password: initialData?.password || '',

      // Events
      events:
        initialData?.events?.map((e) => ({
          ...e,
          date: new Date(e.date),
        })) || [],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  const eventsArray = useFieldArray({
    control,
    name: 'events',
  });

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset({
        primaryColor: initialData.primaryColor || '#e4b6c6',
        secondaryColor: initialData.secondaryColor || '#d4a5a5',
        accentColor: initialData.accentColor || '#9b7e7e',
        headingFont: initialData.headingFont || 'Playfair Display',
        bodyFont: initialData.bodyFont || 'Lato',
        heroEnabled: initialData.heroEnabled ?? true,
        brideName: initialData.brideName || '',
        groomName: initialData.groomName || '',
        weddingDate: initialData.weddingDate
          ? new Date(initialData.weddingDate)
          : null,
        heroImageUrl: initialData.heroImageUrl || '',
        storyEnabled: initialData.storyEnabled ?? true,
        storyTitle: initialData.storyTitle || 'Our Story',
        storyText: initialData.storyText || '',
        storyImage1Url: initialData.storyImage1Url || '',
        storyImage2Url: initialData.storyImage2Url || '',
        galleryEnabled: initialData.galleryEnabled ?? false,
        galleryTitle: initialData.galleryTitle || 'Our Gallery',
        galleryImages: initialData.galleryImages || [],
        registryEnabled: initialData.registryEnabled ?? true,
        registryTitle: initialData.registryTitle || 'Gift Registry',
        registryText: initialData.registryText || '',
        musicEnabled: initialData.musicEnabled ?? true,
        musicUrl: initialData.musicUrl || '',
        musicTitle: initialData.musicTitle || '',
        musicArtist: initialData.musicArtist || '',
        slug: initialData.slug || '',
        password: initialData.password || '',
        events:
          initialData.events?.map((e) => ({
            ...e,
            date: new Date(e.date),
          })) || [],
      });
    }
  }, [initialData, form]);

  const onSubmit = async (data: WeddingSiteFormData) => {
    setIsSaving(true);
    try {
      // Auto-generate slug if empty
      if (!data.slug && data.brideName && data.groomName) {
        data.slug = `${data.brideName}-and-${data.groomName}`
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-');
      }

      // Save as draft (isPublished = false)
      const result = await weddingSiteService.save({
        ...data,
        isPublished: false,
      });

      toast.success('Wedding site saved as draft!');

      if (onSave) {
        onSave(result.weddingSite);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to save wedding site';
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = handleSubmit(async (data) => {
    setIsPublishing(true);
    try {
      // Validate required fields for publishing
      if (!data.slug) {
        toast.error('Please provide a URL slug before publishing');
        return;
      }

      // Auto-generate slug if empty
      if (!data.slug && data.brideName && data.groomName) {
        data.slug = `${data.brideName}-and-${data.groomName}`
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-');
      }

      // Publish the site (isPublished = true)
      const result = await weddingSiteService.save({
        ...data,
        isPublished: true,
      });

      toast.success('Wedding site published successfully!');

      if (onSave) {
        onSave(result.weddingSite);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to publish wedding site';
      toast.error(message);
    } finally {
      setIsPublishing(false);
    }
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 pb-10"
    >
      {/* Publishing Status Badge */}
      {initialData && (
        <div className="bg-muted rounded-lg p-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Publishing Status</h3>
            <p className="text-sm text-muted-foreground">
              {initialData.isPublished
                ? 'Your website is live and accessible to guests'
                : 'Your website is saved as draft'}
            </p>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              initialData.isPublished
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {initialData.isPublished ? 'Published' : 'Draft'}
          </div>
        </div>
      )}

      <GlobalStylesSection
        register={register}
        errors={errors}
        control={control}
      />

      <HeroSection
        register={register}
        errors={errors}
        control={control}
        watch={watch}
      />

      <EventsSection
        register={register}
        errors={errors}
        control={control}
        eventsArray={eventsArray}
      />

      <StorySection
        register={register}
        errors={errors}
        control={control}
        watch={watch}
      />

      <GallerySection
        register={register}
        errors={errors}
        control={control}
        watch={watch}
      />

      <RegistrySection
        register={register}
        errors={errors}
        control={control}
        watch={watch}
      />

      <MusicSection
        register={register}
        watch={watch}
        setValue={setValue}
      />

      <PublishingSection
        register={register}
        errors={errors}
        watch={watch}
      />

      {/* Action Buttons */}
      <div className="flex gap-4 sticky bottom-0 bg-background py-4 border-t">
        <Button
          type="submit"
          disabled={isSaving || isPublishing}
          className="flex-1"
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save Draft'}
        </Button>
        <Button
          type="button"
          onClick={handlePublish}
          disabled={isSaving || isPublishing}
          className="flex-1"
          variant="default"
        >
          {isPublishing ? 'Publishing...' : 'Publish Website'}
        </Button>
      </div>
    </form>
  );
}
