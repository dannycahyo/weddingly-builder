interface HeroSectionProps {
  brideName?: string;
  groomName?: string;
  weddingDate?: Date | string | null;
  heroImageUrl?: string;
  primaryColor?: string;
  headingFont?: string;
}

export function GuestHeroSection({
  brideName,
  groomName,
  weddingDate,
  heroImageUrl,
  primaryColor = '#e4b6c6',
  headingFont = 'Playfair Display',
}: HeroSectionProps) {
  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
      style={{
        backgroundImage: heroImageUrl
          ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${heroImageUrl})`
          : `linear-gradient(135deg, ${primaryColor} 0%, #ffffff 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative z-10 text-center px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Decorative element */}
          <div
            className="text-4xl sm:text-6xl mb-6"
            style={{ color: primaryColor }}
          >
            ❤
          </div>

          {/* Names */}
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 drop-shadow-lg"
            style={{
              fontFamily: headingFont,
              textShadow: heroImageUrl
                ? '2px 2px 4px rgba(0,0,0,0.5)'
                : 'none',
              color: heroImageUrl ? '#ffffff' : '#333',
            }}
          >
            {brideName} & {groomName}
          </h1>

          {/* Date */}
          {weddingDate && (
            <p
              className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide"
              style={{
                textShadow: heroImageUrl
                  ? '1px 1px 2px rgba(0,0,0,0.5)'
                  : 'none',
                color: heroImageUrl ? '#ffffff' : '#666',
              }}
            >
              {formatDate(weddingDate)}
            </p>
          )}

          {/* Scroll indicator */}
          <div className="mt-12 animate-bounce">
            <svg
              className="w-6 h-6 mx-auto"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{
                color: heroImageUrl ? '#ffffff' : primaryColor,
              }}
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
