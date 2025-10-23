import { useState, useEffect } from 'react';
import { PasswordPrompt } from './PasswordPrompt';
import { GuestHeroSection } from './GuestHeroSection';
import { GuestEventsSection } from './GuestEventsSection';
import { GuestStorySection } from './GuestStorySection';
import { GuestGallerySection } from './GuestGallerySection';
import { GuestRegistrySection } from './GuestRegistrySection';
import { RSVPForm } from './RSVPForm';

interface WeddingSite {
  id: string;
  slug: string;
  isPublished: boolean;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  headingFont: string;
  bodyFont: string;
  heroEnabled: boolean;
  brideName?: string;
  groomName?: string;
  weddingDate?: string;
  heroImageUrl?: string;
  storyEnabled: boolean;
  storyTitle: string;
  storyText?: string;
  storyImage1Url?: string;
  storyImage2Url?: string;
  galleryEnabled: boolean;
  galleryTitle: string;
  galleryImages: string[];
  registryEnabled: boolean;
  registryTitle: string;
  registryText?: string;
  events: Array<{
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    address: string;
  }>;
}

interface GuestPageProps {
  slug: string;
}

export default function GuestPage({ slug }: GuestPageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requiresPassword, setRequiresPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(
    null,
  );
  const [weddingSite, setWeddingSite] = useState<WeddingSite | null>(
    null,
  );
  const [guestName, setGuestName] = useState<string | null>(null);

  useEffect(() => {
    // Get guest name from URL parameter
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to');
    if (toParam) {
      setGuestName(decodeURIComponent(toParam));
    }

    fetchWeddingSite();
  }, [slug]);

  const fetchWeddingSite = async () => {
    try {
      const response = await fetch(`/api/wedding/${slug}`);
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          setError('Wedding site not found');
        } else if (response.status === 403) {
          setError('This wedding site is not published yet');
        } else {
          setError(data.error || 'Failed to load wedding site');
        }
        setLoading(false);
        return;
      }

      if (data.hasPassword) {
        setRequiresPassword(true);
        setLoading(false);
      } else {
        setWeddingSite(data.weddingSite);
        setLoading(false);
      }
    } catch (err) {
      setError('Failed to load wedding site');
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (password: string) => {
    try {
      const response = await fetch(`/api/wedding/${slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setPasswordError(data.error || 'Incorrect password');
        return;
      }

      setWeddingSite(data.weddingSite);
      setRequiresPassword(false);
      setPasswordError(null);
    } catch (err) {
      setPasswordError('Failed to verify password');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">💒</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😔</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Oops!
          </h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (requiresPassword) {
    return (
      <PasswordPrompt
        onSubmit={handlePasswordSubmit}
        error={passwordError || undefined}
        primaryColor={weddingSite?.primaryColor}
        headingFont={weddingSite?.headingFont}
      />
    );
  }

  if (!weddingSite) {
    return null;
  }

  return (
    <div
      style={{
        fontFamily: weddingSite.bodyFont,
      }}
    >
      {/* Hero Section */}
      {weddingSite.heroEnabled && (
        <GuestHeroSection
          brideName={weddingSite.brideName}
          groomName={weddingSite.groomName}
          weddingDate={weddingSite.weddingDate}
          heroImageUrl={weddingSite.heroImageUrl}
          primaryColor={weddingSite.primaryColor}
          headingFont={weddingSite.headingFont}
          guestName={guestName || undefined}
        />
      )}

      {/* Events Section */}
      {weddingSite.events && weddingSite.events.length > 0 && (
        <GuestEventsSection
          events={weddingSite.events}
          primaryColor={weddingSite.primaryColor}
          secondaryColor={weddingSite.secondaryColor}
          headingFont={weddingSite.headingFont}
          bodyFont={weddingSite.bodyFont}
        />
      )}

      {/* Story Section */}
      {weddingSite.storyEnabled && (
        <GuestStorySection
          storyTitle={weddingSite.storyTitle}
          storyText={weddingSite.storyText}
          storyImage1Url={weddingSite.storyImage1Url}
          storyImage2Url={weddingSite.storyImage2Url}
          primaryColor={weddingSite.primaryColor}
          headingFont={weddingSite.headingFont}
          bodyFont={weddingSite.bodyFont}
        />
      )}

      {/* Gallery Section */}
      {weddingSite.galleryEnabled && (
        <GuestGallerySection
          galleryTitle={weddingSite.galleryTitle}
          galleryImages={weddingSite.galleryImages}
          primaryColor={weddingSite.primaryColor}
          headingFont={weddingSite.headingFont}
        />
      )}

      {/* Registry Section */}
      {weddingSite.registryEnabled && (
        <GuestRegistrySection
          registryTitle={weddingSite.registryTitle}
          registryText={weddingSite.registryText}
          primaryColor={weddingSite.primaryColor}
          secondaryColor={weddingSite.secondaryColor}
          headingFont={weddingSite.headingFont}
          bodyFont={weddingSite.bodyFont}
        />
      )}

      {/* RSVP Section */}
      <section
        className="py-16 px-4 sm:py-16"
        style={{
          backgroundColor: `${weddingSite.accentColor}15`,
        }}
      >
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12"
            style={{
              fontFamily: weddingSite.headingFont,
              color: '#333',
            }}
          >
            RSVP
          </h2>

          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <RSVPForm
              siteSlug={weddingSite.slug}
              primaryColor={weddingSite.primaryColor}
              accentColor={weddingSite.accentColor}
              guestName={guestName || undefined}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 text-center text-sm text-gray-600"
        style={{
          backgroundColor: `${weddingSite.primaryColor}08`,
        }}
      >
        <p>
          Created with ❤️ by{' '}
          <span className="font-semibold">The Evermore</span>
        </p>
      </footer>
    </div>
  );
}
