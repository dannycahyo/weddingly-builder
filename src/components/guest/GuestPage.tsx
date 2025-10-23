import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { PasswordPrompt } from './PasswordPrompt';
import { EnvelopeInvitation } from './EnvelopeInvitation';
import { GuestHeroSection } from './GuestHeroSection';
import { GuestEventsSection } from './GuestEventsSection';
import { GuestStorySection } from './GuestStorySection';
import { GuestGallerySection } from './GuestGallerySection';
import { GuestRegistrySection } from './GuestRegistrySection';
import { RSVPForm } from './RSVPForm';
import { FloatingDecorations } from './decorations/FloatingDecorations';
import { CornerDecorations } from './decorations/CornerDecorations';
import { SectionDivider } from './decorations/SectionDivider';

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
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  // Scroll animation component
  const ScrollAnimationWrapper = ({
    children,
    delay = 0,
  }: {
    children: React.ReactNode;
    delay?: number;
  }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
      once: true,
      margin: '-100px',
    });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={
          isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
        }
        transition={{ duration: 0.8, delay }}
      >
        {children}
      </motion.div>
    );
  };

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
    <>
      {/* Envelope Animation */}
      <AnimatePresence>
        {!envelopeOpened && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            <EnvelopeInvitation
              brideName={weddingSite.brideName}
              groomName={weddingSite.groomName}
              guestName={guestName || undefined}
              primaryColor={weddingSite.primaryColor}
              secondaryColor={weddingSite.secondaryColor}
              headingFont={weddingSite.headingFont}
              onOpen={() => setEnvelopeOpened(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {envelopeOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
          style={{
            fontFamily: weddingSite.bodyFont,
          }}
        >
          {/* Floating Decorations */}
          <FloatingDecorations
            primaryColor={weddingSite.primaryColor}
            secondaryColor={weddingSite.secondaryColor}
            accentColor={weddingSite.accentColor}
          />

          {/* Content with higher z-index */}
          <div className="relative z-10">
            {/* Hero Section */}
            {weddingSite.heroEnabled && (
              <ScrollAnimationWrapper delay={0.2}>
                <GuestHeroSection
                  brideName={weddingSite.brideName}
                  groomName={weddingSite.groomName}
                  weddingDate={weddingSite.weddingDate}
                  heroImageUrl={weddingSite.heroImageUrl}
                  primaryColor={weddingSite.primaryColor}
                  headingFont={weddingSite.headingFont}
                  guestName={guestName || undefined}
                />
              </ScrollAnimationWrapper>
            )}
            {/* Divider */}
            {weddingSite.heroEnabled &&
              weddingSite.events &&
              weddingSite.events.length > 0 && (
                <SectionDivider
                  primaryColor={weddingSite.primaryColor}
                  accentColor={weddingSite.accentColor}
                />
              )}
            {/* Events Section */}
            {weddingSite.events && weddingSite.events.length > 0 && (
              <ScrollAnimationWrapper>
                <GuestEventsSection
                  events={weddingSite.events}
                  primaryColor={weddingSite.primaryColor}
                  secondaryColor={weddingSite.secondaryColor}
                  headingFont={weddingSite.headingFont}
                  bodyFont={weddingSite.bodyFont}
                />
              </ScrollAnimationWrapper>
            )}
            {/* Divider */}
            {weddingSite.storyEnabled && (
              <SectionDivider
                primaryColor={weddingSite.primaryColor}
                accentColor={weddingSite.accentColor}
              />
            )}
            {/* Story Section */}
            {weddingSite.storyEnabled && (
              <ScrollAnimationWrapper>
                <GuestStorySection
                  storyTitle={weddingSite.storyTitle}
                  storyText={weddingSite.storyText}
                  storyImage1Url={weddingSite.storyImage1Url}
                  storyImage2Url={weddingSite.storyImage2Url}
                  primaryColor={weddingSite.primaryColor}
                  headingFont={weddingSite.headingFont}
                  bodyFont={weddingSite.bodyFont}
                />
              </ScrollAnimationWrapper>
            )}
            {/* Divider */}
            {weddingSite.galleryEnabled && (
              <SectionDivider
                primaryColor={weddingSite.primaryColor}
                accentColor={weddingSite.accentColor}
              />
            )}
            {/* Gallery Section */}
            {weddingSite.galleryEnabled && (
              <ScrollAnimationWrapper>
                <GuestGallerySection
                  galleryTitle={weddingSite.galleryTitle}
                  galleryImages={weddingSite.galleryImages}
                  primaryColor={weddingSite.primaryColor}
                  headingFont={weddingSite.headingFont}
                />
              </ScrollAnimationWrapper>
            )}
            {/* Divider */}
            {weddingSite.registryEnabled && (
              <SectionDivider
                primaryColor={weddingSite.primaryColor}
                accentColor={weddingSite.accentColor}
              />
            )}{' '}
            {/* Registry Section */}
            {weddingSite.registryEnabled && (
              <ScrollAnimationWrapper>
                <GuestRegistrySection
                  registryTitle={weddingSite.registryTitle}
                  registryText={weddingSite.registryText}
                  primaryColor={weddingSite.primaryColor}
                  secondaryColor={weddingSite.secondaryColor}
                  headingFont={weddingSite.headingFont}
                  bodyFont={weddingSite.bodyFont}
                />
              </ScrollAnimationWrapper>
            )}
            {/* RSVP Section */}
            <ScrollAnimationWrapper>
              <section
                className="relative py-16 px-4 sm:py-16 overflow-hidden"
                style={{
                  backgroundColor: `${weddingSite.accentColor}15`,
                }}
              >
                {/* Corner Decorations */}
                <CornerDecorations
                  primaryColor={weddingSite.primaryColor}
                  secondaryColor={weddingSite.secondaryColor}
                />

                <div className="max-w-2xl mx-auto relative z-10">
                  <h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12"
                    style={{
                      fontFamily: weddingSite.headingFont,
                      color: '#333',
                    }}
                  >
                    RSVP
                  </h2>

                  <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 relative overflow-hidden">
                    {/* Subtle decoration inside form */}
                    <div
                      className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 blur-2xl"
                      style={{
                        backgroundColor: weddingSite.primaryColor,
                      }}
                    />
                    <div
                      className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-5 blur-2xl"
                      style={{
                        backgroundColor: weddingSite.accentColor,
                      }}
                    />

                    <div className="relative z-10">
                      <RSVPForm
                        siteSlug={weddingSite.slug}
                        primaryColor={weddingSite.primaryColor}
                        accentColor={weddingSite.accentColor}
                        guestName={guestName || undefined}
                      />
                    </div>
                  </div>
                </div>
              </section>
            </ScrollAnimationWrapper>
            {/* Footer */}
            <ScrollAnimationWrapper>
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
            </ScrollAnimationWrapper>
          </div>
        </motion.div>
      )}
    </>
  );
}
