# Auto-Loc - Architecture Cloud 🚗💨

![Auto-Loc Banner](https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80)

## 📌 Présentation du Projet
**Auto-Loc** est une plateforme moderne de location de véhicules développée dans le cadre du module **Architecture Cloud (SI 2CP)** à l'**ESTIN** (Promotion 2026). 

L'objectif est de concevoir une architecture **Cloud-Native**, scalable et sécurisée, en utilisant les principes du **"Build & Ship"** et du **Vibe Programming**.

---

## 🏗️ Mission 4 : Le Mapping et l'Architecture (Rapport Architecte)

### 1. Le Mapping du Thème : "Location Auto"
Conformément à la Roulette des Thèmes (Choix #2), notre base de données Supabase modélise le métier de la location de voitures avec la structure exigée :
- **Table A (Utilisateurs) :** `profiles` (Les Clients, gérés via Supabase Auth).
- **Table B (Ressources) :** `cars` (Les Voitures disponibles à la location).
- **Table C (Interactions) :** `reservations` (La table de jointure avec date/statut qui lie un Client à une Voiture).
- **Le Fichier (Storage) :** Une **Photo du permis de conduire** uploadée lors de la réservation.

### 2. Analyse d'Architecture Cloud

#### CAPEX vs OPEX : La logique financière du Serverless
Le déploiement de ce projet via Vercel (Frontend) et Supabase (Backend) s'appuie sur le Cloud computing et s'avère financièrement bien plus logique que l'achat d'un serveur physique classique. L'achat de serveurs physiques exige un **CAPEX** (Capital Expenditure) massif : un investissement initial lourd pour du matériel qui se déprécie, qu'on l'utilise à pleine capacité ou non. En adoptant une architecture Serverless Cloud, nous basculons sur un modèle **OPEX** (Operational Expenditure). Nous ne payons que ce que nous consommons réellement (Pay-As-You-Go). Cela élimine les barrières à l'entrée financières pour lancer le projet tout en garantissant des coûts proportionnels au succès réel de la plateforme.

#### Scalabilité : Vercel vs Data Center Physique
Dans un Data Center physique local, gérer une hausse imprévue de trafic (scalabilité) est un cauchemar logistique. Il faut commander de nouveaux serveurs rackables, les installer physiquement, configurer le réseau, et surtout surdimensionner la climatisation et l'alimentation électrique pour éviter la surchauffe. À l'inverse, Vercel gère la scalabilité de manière abstraite et automatisée. Le code frontend est déployé sur un réseau Edge mondial (CDN). Lors des pics d'audience, Vercel distribue instantanément la charge sur des milliers de serveurs répartis mondialement. La mise à l'échelle est dynamique, sans aucune intervention humaine, et sans se soucier du refroidissement ou du matériel.

#### Données Structurées vs Non-Structurées
Dans Auto-Loc, la séparation des types de données dicte notre choix d'infrastructure :
- **La Donnée Structurée :** Elle est représentée par les entités textuelles et numériques hautement relationnelles (Les Clients, Les Voitures, et Les Réservations). Ces données obéissent à un schéma strict et sont stockées dans le moteur SQL relationnel de **PostgreSQL (Supabase Database)**.
- **La Donnée Non-Structurée :** Elle est représentée par les photos des permis de conduire des clients. Les fichiers (JPEG, PDF, PNG) n'ont pas de schéma tabulaire régulier et sont souvent volumineux. Ils sont donc stockés indépendamment dans un Object Storage spécialisé (**Supabase Storage Bucket**), tandis que la base SQL ne conserve qu'un simple lien (URL) vers ces fichiers.

---

## 🛠️ Stack Technique
- **Frontend :** [Next.js 14](https://nextjs.org/) (App Router + TypeScript)
- **Styling :** Tailwind CSS + Framer Motion (Design Premium "Vibe")
- **Base de Données :** **PostgreSQL** (Système SQL Relationnel via Supabase)
- **Déploiement :** [Vercel](https://vercel.com/) (CI/CD automatique)

## 💻 Installation & Développement
```bash
# Installation des dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

## 👥 Équipe
- **Amel ved**
- **Ahmed**
- **Ghiles**

*Projet réalisé sous l'approche **Vibe Programming** : focus sur l'intention, l'agilité et l'assistance IA pour une livraison rapide et de haute qualité.*
