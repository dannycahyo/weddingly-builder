import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { Save } from 'lucide-react';
import {
  weddingSiteSchema,
  type WeddingSiteFormData,
  type WeddingSite,
} from '../lib/validations';
import { weddingSiteService } from '../lib/api';
import { useNotification } from '../hooks/useNotification';
import { Notification } from './Notification';
import { GlobalStylesSection } from './sections/GlobalStylesSection';
import { HeroSection } from './sections/HeroSection';
import { EventsSection } from './sections/EventsSection';
import { PublishingSection } from './sections/PublishingSection';
import { StorySection } from './sections/StorySection';
import { GallerySection } from './sections/GallerySection';
import { RegistrySection } from './sections/RegistrySection';

interface BuilderFormProps {
  initialData?: WeddingSite;
  onSave?: (data: WeddingSite) => void;
}

export default function BuilderForm({
  initialData,
  onSave,
}: BuilderFormProps) {
  const { notification, showSuccess, showError, clearNotification } =
    useNotification();

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
    clearNotification();

    try {
      // Auto-generate slug if empty
      if (!data.slug && data.brideName && data.groomName) {
        data.slug = `${data.brideName}-and-${data.groomName}`
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-');
      }

      const result = await weddingSiteService.save(data);

      showSuccess('Wedding site saved successfully!');

      if (onSave) {
        onSave(result.weddingSite);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to save wedding site';
      showError(message);
    }
  };

  const handlePublish = handleSubmit(async (data) => {
    clearNotification();

    try {
      // Auto-generate slug if empty
      if (!data.slug && data.brideName && data.groomName) {
        data.slug = `${data.brideName}-and-${data.groomName}`
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-');
      }

      const result = await weddingSiteService.save(data);

      showSuccess('Wedding site published successfully!');

      if (onSave) {
        onSave(result.weddingSite);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to publish wedding site';
      showError(message);
    }
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 pb-10"
    >
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={clearNotification}
        />
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

      <PublishingSection
        register={register}
        errors={errors}
        watch={watch}
      />

      {/* Action Buttons */}
      <div className="flex gap-4 sticky bottom-0 bg-background py-4 border-t">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1"
        >
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting ? 'Saving...' : 'Save Draft'}
        </Button>
        <Button
          type="button"
          onClick={handlePublish}
          disabled={isSubmitting}
          className="flex-1"
          variant="default"
        >
          {isSubmitting ? 'Publishing...' : 'Publish Website'}
        </Button>
      </div>
    </form>
  );
}
