import type { Metadata } from 'next'
import './globals.css'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'

export const metadata: Metadata = {
  title: 'PsyAI - Mental Health Check',
  description: 'Your AI-powered mental health companion',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <LoadingScreen />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
