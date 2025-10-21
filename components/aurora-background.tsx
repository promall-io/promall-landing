"use client"

export function AuroraBackground() {
  return (
    <div className="aurora-container">
      {/* Stars - Balanced */}
      <div className="stars-field">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`,
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
            }}
          />
        ))}
      </div>

      {/* Aurora Waves - Balanced */}
      <div className="aurora-wave aurora-wave-1" />
      <div className="aurora-wave aurora-wave-2" />
      <div className="aurora-wave aurora-wave-3" />

      {/* Dark overlay to blend with content */}
      <div className="aurora-overlay" />
    </div>
  )
}
