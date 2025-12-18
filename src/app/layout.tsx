import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Chatbot from '@/components/Chatbot'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GoVibe - Luxury Travel Planning | Experience Ultimate India Tourism',
  description: 'GoVibe: AI-powered luxury travel experiences across India. Personalized itineraries, hidden gems, and seamless journey planning.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Chatbot />
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 text-primary-700">
              <div className="w-10 h-10 bg-primary-600 text-white rounded-md flex items-center justify-center font-bold">GV</div>
              <div>
                <div className="text-lg font-extrabold">GoVibe</div>
                <div className="text-xs text-gray-500">Experience India — curated, easy, beautiful</div>
              </div>
            </a>
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}
