# Auto-Loc - Architecture Cloud 🚗💨

![Auto-Loc Banner](https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80)

## 📌 Présentation du Projet
**Auto-Loc** est une plateforme moderne de location de véhicules développée dans le cadre du module **Architecture Cloud (SI 2CP)** à l'**ESTIN** (Promotion 2026). 

L'objectif est de concevoir une architecture **Cloud-Native**, scalable et sécurisée, en utilisant les principes du **"Build & Ship"** et du **Vibe Programming**.

---

## 🛠️ Stack Technique (Validée SQL)
Pour respecter les exigences du module, le projet repose sur une pile technologique SQL robuste :

- **Frontend :** [Next.js 14](https://nextjs.org/) (App Router + TypeScript)
- **Styling :** Tailwind CSS (Design Premium)
- **Base de Données :** **PostgreSQL** (Système SQL Relationnel)
- **Infrastructure Cloud :** [Supabase](https://supabase.com/) (Auth, Database, Storage)
- **Déploiement :** [Vercel](https://vercel.com/) (CI/CD automatique)

---

## 🏗️ Architecture des Données (SQL Relationnel)
Le projet utilise trois tables principales liées par des clés étrangères :

1.  **Table `profiles`** : Gestion des utilisateurs (via Supabase Auth).
2.  **Table `cars`** : Inventaire des véhicules (Marque, Modèle, Prix, Disponibilité).
3.  **Table `reservations`** : Table de liaison (Interaction) entre les clients et les voitures.

---

## 🚀 Fonctionnalités Clés
- ✅ **Authentification Cloud** : Inscription et connexion sécurisée.
- ✅ **Gestion de Flotte** : Consultation des véhicules en temps réel.
- ✅ **Système de Réservation** : Réservation dynamique avec gestion des statuts.
- ✅ **Storage Cloud** : Upload sécurisé des documents (permis de conduire).
- ✅ **RLS (Row Level Security)** : Protection des données au niveau de la base de données.

---

## 💻 Installation & Développement

```bash
# Installation des dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir le résultat.

---

## 👥 Équipe
- **Amel ved**
- [Binôme]

---
*Projet réalisé sous l'approche **Vibe Programming** : focus sur l'intention, l'agilité et l'assistance IA pour une livraison rapide et de haute qualité.*
