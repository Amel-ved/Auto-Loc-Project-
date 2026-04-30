# Auto Loc - Architecture Cloud 🚗💨

![Auto Loc Banner](https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80)

## 📌 Présentation du Projet
**Auto Loc** est une plateforme moderne de gestion et de location de véhicules, développée dans le cadre du module **Architecture Cloud (SI 2CP)** à l'**ESTIN** (Promotion 2026). 

L'objectif principal est de concevoir une architecture robuste, scalable et hautement disponible pour répondre aux besoins d'une flotte de véhicules connectés.

---

## 🛠️ Stack Technique
- **Frontend :** [Next.js](https://nextjs.org/) (React + TypeScript)
- **Styling :** Tailwind CSS
- **Backend :** API Routes Next.js / Node.js
- **Base de Données :** (À préciser selon l'implémentation - ex: MongoDB/PostgreSQL)
- **Infrastructure :** Architecture Cloud Ready (Docker, Kubernetes)

---

## 🚀 Fonctionnalités Clés
- ✅ Gestion du parc automobile en temps réel.
- ✅ Réservation et location simplifiée.
- ✅ Dashboard administrateur pour le suivi de la flotte.
- ✅ Intégration de microservices pour la scalabilité.

---

## 📦 Installation & Déploiement

### Prérequis
- Node.js (v18+)
- npm / yarn
- Docker (optionnel pour le déploiement conteneurisé)

### Lancement Local
1. Clonez le repository :
   ```bash
   git clone https://github.com/Amel-ved/ESTIN-DOGO.git
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Configurez les variables d'environnement (voir `.env.example`).
4. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

### Déploiement Cloud
Le projet est prêt à être déployé sur des plateformes comme **Vercel**, **Render** ou via une infrastructure **Kubernetes**.

#### Déploiement via Docker
```bash
docker build -t auto-loc .
docker run -p 3000:3000 auto-loc
```

---

## 📁 Structure du Projet
```text
.
├── app/            # Pages et composants Next.js (App Router)
├── components/     # Composants réutilisables
├── public/         # Assets statiques
├── styles/         # Fichiers CSS / Tailwind
└── README.md       # Documentation
```

---

## 👥 Auteurs
- **Amel** (@Amel-ved)

---
*Projet réalisé pour l'ESTIN - 2CP 2026*
