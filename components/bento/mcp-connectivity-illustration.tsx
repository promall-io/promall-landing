import type React from "react"
import { Search } from "lucide-react"

interface McpConnectivityIllustrationProps {
  className?: string
}

const McpConnectivityIllustration: React.FC<McpConnectivityIllustrationProps> = ({ className = "" }) => {
  // Integration data - using text initials instead of images for simplicity
  const integrations = [
    { id: "integration-figma", name: "Figma", initials: "F", installed: true },
    { id: "integration-shadcn", name: "Shadcn UI", initials: "S" },
    { id: "integration-nextjs", name: "Next.js", initials: "N", installed: true },
    { id: "integration-tailwind", name: "Tailwind CSS", initials: "T" },
    { id: "integration-resend", name: "Resend", initials: "R", installed: true },
    { id: "integration-react", name: "React", initials: "⚛" },
  ]

  return (
    <div
      className={`w-full h-full flex items-center justify-center p-4 relative ${className}`}
      role="img"
      aria-label="MCP Connectivity component showcasing installed integrations list"
    >
      {/* Main Message Box */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, calc(-50% + 24px))",
          width: "345px",
          height: "277px",
          background: "linear-gradient(180deg, hsl(var(--background)) 0%, transparent 100%)",
          backdropFilter: "blur(16px)",
          borderRadius: "var(--radius-lg)",
          border: "0.802px solid hsl(var(--border))",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
          }}
        >
          {/* Search Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12.837px",
              padding: "8.826px 12.837px",
              borderBottom: "0.802px solid hsl(var(--border))",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: "14.442px",
                height: "14.442px",
                position: "relative",
                flexShrink: 0,
              }}
            >
              <Search className="w-full h-full text-muted-foreground" />
            </div>
            <span
              style={{
                fontFamily: "var(--font-family-sans)",
                fontSize: "12.837px",
                lineHeight: "19.256px",
                color: "hsl(var(--muted-foreground))",
                fontWeight: 400,
                whiteSpace: "nowrap",
              }}
            >
              Search for servers
            </span>
          </div>
          {/* Integration List */}
          {integrations.map((integration, index) => (
            <div
              key={integration.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8.826px 12.837px",
                borderBottom: index < integrations.length - 1 ? "0.479px solid hsl(var(--border))" : "none",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12.837px",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    background: "hsl(var(--primary) / 0.1)",
                    borderRadius: "var(--radius-lg)",
                    fontWeight: "600",
                    fontSize: "12px",
                    color: "hsl(var(--primary))",
                  }}
                >
                  {integration.initials}
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-family-sans)",
                    fontSize: "12.837px",
                    lineHeight: "19.256px",
                    color: "hsl(var(--muted-foreground))",
                    fontWeight: 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  {integration.name}
                </span>
              </div>
              {integration.installed && (
                <div
                  style={{
                    background: "hsl(var(--primary) / 0.08)",
                    padding: "1.318px 5.272px",
                    borderRadius: "var(--radius-lg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-family-sans)",
                      fontSize: "9.583px",
                      lineHeight: "15.333px",
                      color: "hsl(var(--primary))",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Installed
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default McpConnectivityIllustration
