// app/layout.tsx
import "./globals.css";
import Providers from "./Providers"
import XmasBackground from "./XmasBG";
import BottomNav from "./BottomNav";

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
            <BottomNav />
          </XmasBackground>
        </Providers>
      </body>
    </html>
  )
}