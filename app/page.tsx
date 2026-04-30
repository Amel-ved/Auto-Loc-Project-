import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-20 py-16">
      {/* Hero Section avec Gradient et Animation subtile */}
      <section className="text-center space-y-8">
        <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 leading-tight inline-block">
          Louez votre liberté <br /> avec Auto-Loc
        </h2>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Découvrez une expérience de location de voitures simplifiée, 
          propulsée par une architecture Cloud moderne et sécurisée.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link 
            href="/auth/login" 
            className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 hover:shadow-xl transition-all transform hover:-translate-y-1 text-center"
          >
            Se connecter
          </Link>
          <Link 
            href="/auth/register" 
            className="bg-white text-blue-600 border-2 border-blue-600 px-10 py-4 rounded-full font-bold hover:bg-blue-50 transition-all transform hover:-translate-y-1 text-center"
          >
            S&apos;inscrire
          </Link>
        </div>
      </section>

      {/* Features Grid - Architecture Cloud */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">🔍</div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Trouvez une voiture</h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            Filtrez parmi notre large sélection de véhicules premium adaptés à tous vos besoins de mobilité.
          </p>
        </div>

        <div className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">📅</div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Réservez en 1 clic</h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            Une interface fluide et intuitive pour confirmer votre réservation en quelques secondes.
          </p>
        </div>

        <div className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">🛡️</div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Sécurité Cloud</h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            Vos données sont protégées par l&apos;authentification Supabase et une architecture hautement sécurisée.
          </p>
        </div>
      </section>
    </div>
  )
}
