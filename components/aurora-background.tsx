"use client"

export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Top Right Dotted Circles */}
      <svg
        className="absolute -top-64 -right-64 w-[1200px] h-[1200px]"
        viewBox="0 0 1200 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="600"
          cy="600"
          r="500"
          stroke="rgba(100, 116, 139, 0.15)"
          strokeWidth="1"
          strokeDasharray="4 8"
          fill="none"
          className="animate-[spin_80s_linear_infinite]"
          style={{ transformOrigin: "600px 600px" }}
        />
        <circle
          cx="600"
          cy="600"
          r="400"
          stroke="rgba(100, 116, 139, 0.12)"
          strokeWidth="1"
          strokeDasharray="4 8"
          fill="none"
          className="animate-[spin_65s_linear_infinite_reverse]"
          style={{ transformOrigin: "600px 600px" }}
        />
        <circle
          cx="600"
          cy="600"
          r="300"
          stroke="rgba(100, 116, 139, 0.1)"
          strokeWidth="1"
          strokeDasharray="4 8"
          fill="none"
          className="animate-[spin_55s_linear_infinite]"
          style={{ transformOrigin: "600px 600px" }}
        />
      </svg>

      {/* Bottom Left Dotted Circles */}
      <svg
        className="absolute -bottom-64 -left-64 w-[1100px] h-[1100px]"
        viewBox="0 0 1100 1100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="550"
          cy="550"
          r="450"
          stroke="rgba(100, 116, 139, 0.14)"
          strokeWidth="1"
          strokeDasharray="4 8"
          fill="none"
          className="animate-[spin_70s_linear_infinite_reverse]"
          style={{ transformOrigin: "550px 550px" }}
        />
        <circle
          cx="550"
          cy="550"
          r="350"
          stroke="rgba(100, 116, 139, 0.11)"
          strokeWidth="1"
          strokeDasharray="4 8"
          fill="none"
          className="animate-[spin_60s_linear_infinite]"
          style={{ transformOrigin: "550px 550px" }}
        />
        <circle
          cx="550"
          cy="550"
          r="250"
          stroke="rgba(100, 116, 139, 0.09)"
          strokeWidth="1"
          strokeDasharray="4 8"
          fill="none"
          className="animate-[spin_50s_linear_infinite_reverse]"
          style={{ transformOrigin: "550px 550px" }}
        />
      </svg>
    </div>
  )
}
