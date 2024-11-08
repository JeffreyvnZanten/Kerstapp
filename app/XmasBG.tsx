// components/XmasBackground.tsx
'use client'
import Snowfall from 'react-snowfall'
import BottomNav from './BottomNav'

export default function XmasBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <div className="bg-[url('/xmas3.webp')] z-index-0 bg-cover bg-center bg-no-repeat absolute inset-0" />
      <Snowfall 
        snowflakeCount={100}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
      />
      <div className="flex flex-col items-center justify-top min-h-screen space-y-4 p-4 z-index-1">
          {children}          
      </div>
    </div>
  )
}