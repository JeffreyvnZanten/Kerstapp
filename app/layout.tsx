// app/layout.tsx
import "./globals.css";
import Providers from "./Providers"
import XmasBackground from "./XmasBG";
import LayoutSwitcher from "./LayoutSwitcher";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <XmasBackground>
            <main className="min-h-screen pb-24 md:pb-8">
              {children}
            </main>
            <LayoutSwitcher />
          </XmasBackground>
        </Providers>
      </body>
    </html>
  )
}