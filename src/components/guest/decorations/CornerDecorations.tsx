interface CornerDecorationsProps {
  primaryColor: string;
  secondaryColor: string;
}

export function CornerDecorations({
  primaryColor,
  secondaryColor,
}: CornerDecorationsProps) {
  return (
    <>
      {/* Top Left Corner */}
      <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none opacity-30">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M0,0 Q50,50 0,100 L0,0 Z"
            fill={primaryColor}
            opacity="0.3"
          />
          <circle
            cx="20"
            cy="20"
            r="3"
            fill={secondaryColor}
            opacity="0.6"
          />
          <circle
            cx="40"
            cy="10"
            r="2"
            fill={secondaryColor}
            opacity="0.4"
          />
          <circle
            cx="10"
            cy="40"
            r="2"
            fill={secondaryColor}
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Top Right Corner */}
      <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-30">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M100,0 Q50,50 100,100 L100,0 Z"
            fill={primaryColor}
            opacity="0.3"
          />
          <circle
            cx="80"
            cy="20"
            r="3"
            fill={secondaryColor}
            opacity="0.6"
          />
          <circle
            cx="60"
            cy="10"
            r="2"
            fill={secondaryColor}
            opacity="0.4"
          />
          <circle
            cx="90"
            cy="40"
            r="2"
            fill={secondaryColor}
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Bottom Left Corner */}
      <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none opacity-30">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M0,100 Q50,50 0,0 L0,100 Z"
            fill={secondaryColor}
            opacity="0.3"
          />
          <circle
            cx="20"
            cy="80"
            r="3"
            fill={primaryColor}
            opacity="0.6"
          />
          <circle
            cx="40"
            cy="90"
            r="2"
            fill={primaryColor}
            opacity="0.4"
          />
          <circle
            cx="10"
            cy="60"
            r="2"
            fill={primaryColor}
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Bottom Right Corner */}
      <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none opacity-30">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M100,100 Q50,50 100,0 L100,100 Z"
            fill={secondaryColor}
            opacity="0.3"
          />
          <circle
            cx="80"
            cy="80"
            r="3"
            fill={primaryColor}
            opacity="0.6"
          />
          <circle
            cx="60"
            cy="90"
            r="2"
            fill={primaryColor}
            opacity="0.4"
          />
          <circle
            cx="90"
            cy="60"
            r="2"
            fill={primaryColor}
            opacity="0.4"
          />
        </svg>
      </div>
    </>
  );
}
