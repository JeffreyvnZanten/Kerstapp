// app/layout.tsx
import "./globals.css";
import Providers from "./Providers"
import XmasBackground from "./XmasBG";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <XmasBackground>
            {children}
          </XmasBackground>
        </Providers>
      </body>
    </html>
  )
}