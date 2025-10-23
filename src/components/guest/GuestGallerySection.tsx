import { useState } from 'react';

interface GallerySectionProps {
  galleryTitle?: string;
  galleryImages?: string[];
  primaryColor?: string;
  headingFont?: string;
}

export function GuestGallerySection({
  galleryTitle = 'Our Gallery',
  galleryImages = [],
  primaryColor = '#e4b6c6',
  headingFont = 'Playfair Display',
}: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    null,
  );

  if (!galleryImages || galleryImages.length === 0) return null;

  const getGridLayout = (count: number) => {
    // Smart layout based on image count
    if (count === 0) return 'grid-cols-1';
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-2';
    if (count === 3) return 'grid-cols-2'; // 1 left, 2 right
    if (count === 4) return 'grid-cols-2';
    if (count === 5) return 'grid-cols-3'; // 2 left, 3 right
    if (count >= 6) return 'grid-cols-3';
    return 'grid-cols-3';
  };

  const getImageSpan = (index: number, total: number) => {
    // Special spanning for specific layouts
    if (total === 3 && index === 0) return 'row-span-2'; // First image spans 2 rows
    if (total === 5 && index < 2) return 'row-span-2'; // First 2 images span 2 rows
    return '';
  };

  return (
    <>
      <section
        className="py-16 px-4 sm:py-16"
        style={{ backgroundColor: `${primaryColor}08` }}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16"
            style={{
              fontFamily: headingFont,
              color: '#333',
            }}
          >
            {galleryTitle}
          </h2>

          <div
            className={`grid ${getGridLayout(
              galleryImages.length,
            )} auto-rows-[12rem] sm:auto-rows-[16rem] gap-3 sm:gap-4`}
          >
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer group ${getImageSpan(
                  index,
                  galleryImages.length,
                )}`}
              >
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors"
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
