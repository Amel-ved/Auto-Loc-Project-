import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-16 py-12">
      {/* Hero Section avec Gradient */}
      <section className="text-center space-y-6">
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
          Louez votre liberté avec Auto-Loc
        </h2>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Découvrez une expérience de location de voitures simplifiée, 
          propulsée par une architecture Cloud moderne et sécurisée.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link 
            href="/auth/login" 
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 hover:shadow-lg transition-all transform hover:-translate-y-1"
          >
            Se connecter
          </Link>
          <Link 
            href="/auth/register" 
            className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all transform hover:-translate-y-1"
          >
            S&apos;inscrire
          </Link>
        </div>
      </section>

      {/* Features Grid avec Glassmorphism */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">🔍</div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">Trouvez une voiture</h3>
          <p className="text-gray-600 leading-relaxed">
            Filtrez parmi notre large sélection de véhicules premium adaptés à tous vos besoins.
          </p>
        </div>

        <div className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">📅</div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">Réservez en 1 clic</h3>
          <p className="text-gray-600 leading-relaxed">
            Une interface fluide pour choisir vos dates et confirmer votre réservation instantanément.
          </p>
        </div>

        <div className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">🛡️</div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">Service Sécurisé</h3>
          <p className="text-gray-600 leading-relaxed">
            Architecture Cloud robuste avec authentification Supabase et protection des données.
          </p>
        </div>
      </section>
    </div>
  )
}
