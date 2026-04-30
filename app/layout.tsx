import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Auto-Loc - Location de Voitures',
  description: 'Plateforme de location de voitures simple et efficace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-gray-50">
        <nav className="bg-blue-600 text-white p-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold">🚗 Auto-Loc</h1>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  )
}
