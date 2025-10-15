# 🦔 Habit Tracker — MVP & Roadmap

## **Sprint 1 — MVP : Base du système et suivi des habitudes (mono-user)**

### **Création et gestion des habitudes**
- **Créer une habitude avec un emoji et un nom** pour personnaliser ses routines.
  - Table Habit, en base :
    - Emoji
    - Note
    - ID
    - Type (**Weekly**, **Daily**, **Bad Habit**)
    - Iterations (nombre de fois à faire sur la période)
    - CreationDate
- **Associer un nombre de fois par jour ou par semaine à une habitude** pour suivre sa fréquence correctement.
- **Suivre des “mauvaises habitudes” à éviter** pour travailler sur ses points faibles.
- **Voir ses habitudes sur un calendrier avec des bulles ou pastilles** pour visualiser ses progrès jour après jour.
- **Voir ses streaks (séries de jours réussis)** pour rester motivé.
- **Mode debug pour avancer artificiellement le jour** et tester le comportement temporel de l’app.
  - Petit menu dans un coin pour avancer les jours

### **Interface & expérience utilisateur**
- **Interface mobile-first** pour une utilisation confortable sur téléphone.
- **Design esthétique pastel sur fond blanc** pour une expérience agréable et cohérente.
- **Dark mode** pour une utilisation la nuit ou dans des environnements sombres.

### **Gestion utilisateur**
- **Profil personnel** pour visualiser ses informations et son historique.
- **Cocher les habitudes de la veille au démarrage d’un nouveau jour** pour rattraper les oublis.

---

## **Sprint 2 — Gamification & immersion (le hérisson)**

### **Système de progression**
- **Gagner de l’XP en accomplissant ses habitudes** pour faire progresser son niveau.
- **Voir son hérisson grandir à chaque niveau** pour visualiser la progression de manière ludique.
- **Nourrir son hérisson quand on réussit ses tâches** pour renforcer la sensation de récompense.

### **Décorations et environnement**
- **Débloquer des jouets et éléments de décor (arbres, tas de feuilles, etc.) à certains niveaux** pour personnaliser l’environnement du hérisson.
- **Associer une tâche à un élément du décor (ex : arroser un arbre)** pour lier ses habitudes à la croissance du monde virtuel.

### **Visualisation & feedback**
- **Graphique pour visualiser la productivité sur une période** pour mieux comprendre ses tendances.
- **Voir le nombre total de réalisations de ses principales habitudes** pour suivre ses succès marquants.

---

## **Sprint 3 — Compétition & multijoueur**

### **Interaction et classement**
- **Se comparer à d’autres joueurs dans un classement** pour se motiver par la compétition.
- **Voir les meilleurs joueurs et leurs hérissons** pour trouver de l’inspiration et du challenge.

### **Modes de jeu et focus (bonus)**
- **Lancer une phase de focus (style Pomodoro)** pour gagner des points en se concentrant sur ses tâches.
- **Gagner des récompenses supplémentaires lors des phases de focus** pour rendre le temps productif plus gratifiant.

---

## Dépendances du projet

### Dépendances principales (package.json)

- **next** : Framework React pour le rendu côté serveur et la génération statique
- **react** / **react-dom** : Bibliothèques de base pour l’UI
- **tailwindcss** / **@tailwindcss/forms** / **postcss** / **autoprefixer** : Pour le design et le style
- **next-auth** : Authentification
- **bcrypt** / **bcryptjs** : Hashage des mots de passe
- **postgres** : Connexion à la base de données PostgreSQL
- **zod** : Validation de schéma
- **clsx** : Gestion conditionnelle des classes CSS
- **use-debounce** : Gestion des délais en UI
- **typescript** : Typage statique

### Dépendances de développement

- **eslint** / **eslint-config-next** : Linting
- **@types/** : Typages pour TypeScript

---

## Base de données

- **PostgreSQL** : Utilisée via la librairie `postgres`.
- La connexion se fait avec la variable d’environnement `POSTGRES_URL`.
- Les tables principales utilisées :
  - **users** : Utilisateurs (id, name, email, password)
  - **customers** : Clients (id, name, email, image_url)
  - **invoices** : Factures (id, customer_id, amount, date, status)
  - **revenue** : Revenus mensuels (month, revenue)

Les types TypeScript des données sont définis dans `app/lib/definitions.ts`.
Les requêtes SQL sont réalisées dans `app/lib/data.ts`.

---

## Configuration

- **Variables d’environnement** :
  - `POSTGRES_URL` : URL de connexion à la base PostgreSQL
- **Fichiers de configuration** :
  - `next.config.ts` : Configuration Next.js
  - `tailwind.config.ts` : Configuration Tailwind
  - `postcss.config.js` : Configuration PostCSS

---

## À prévoir pour l’évolution

- Ajout d’une table **habits** pour la gestion des habitudes (voir MVP)
- Migration possible vers Prisma pour la gestion ORM
- Ajout de tests et de seeders pour la base