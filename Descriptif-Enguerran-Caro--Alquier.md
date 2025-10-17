
---

## 🟢 **Phase 1 — MVP : Gestion des habitudes et utilisateurs**

### US1. En tant qu’utilisateur, je veux créer un compte et me connecter pour accéder à mes habitudes.
### US2. En tant qu’utilisateur, je veux créer une habitude avec un emoji, un nom, une fréquence (quotidienne/hebdomadaire) et un type (bonne/mauvaise) pour personnaliser mes routines.
### US3. En tant qu’utilisateur, je veux cocher mes habitudes chaque jour/semaine pour suivre ma progression.
### US4. En tant qu’utilisateur, je veux voir mes habitudes sur un calendrier avec des pastilles pour visualiser mes progrès.
### US5. En tant qu’utilisateur, je veux voir mes streaks (séries de jours réussis) pour rester motivé.
### US6. En tant qu’utilisateur, je veux pouvoir rattraper les oublis du jour précédent au démarrage d’un nouveau jour.
### US7. En tant que développeur, je veux un mode debug pour avancer artificiellement le jour et tester le comportement temporel.

---

## 🟡 **Phase 2 — Gamification & immersion**

### US8. En tant qu’utilisateur, je veux gagner de l’XP en accomplissant mes habitudes pour faire progresser mon niveau.
### US9. En tant qu’utilisateur, je veux voir mon hérisson grandir à chaque niveau pour visualiser ma progression.
### US10. En tant qu’utilisateur, je veux nourrir mon hérisson quand je réussis mes tâches pour renforcer la sensation de récompense.
### US11. En tant qu’utilisateur, je veux débloquer des éléments de décor à certains niveaux pour personnaliser l’environnement.
### US12. En tant qu’utilisateur, je veux associer une tâche à un élément du décor pour lier mes habitudes à la croissance du monde virtuel.
### US13. En tant qu’utilisateur, je veux un graphique pour visualiser ma productivité sur une période.
### US14. En tant qu’utilisateur, je veux voir le nombre total de réalisations de mes principales habitudes.

---

## 🟠 **Phase 3 — Compétition & multijoueur**

### US15. En tant qu’utilisateur, je veux me comparer à d’autres joueurs dans un classement pour me motiver.
### US16. En tant qu’utilisateur, je veux voir les meilleurs joueurs et leurs hérissons pour trouver de l’inspiration.
### US17. En tant qu’utilisateur, je veux lancer une phase de focus (style Pomodoro) pour gagner des points en me concentrant.
### US18. En tant qu’utilisateur, je veux gagner des récompenses supplémentaires lors des phases de focus.
### US19. En tant que nouvel utilisateur, je veux pouvoir arriver sur une landing page pour comprendre le principe de l'application.

---

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
- La connexion se fait avec la variable d'environnement `POSTGRES_URL`.
- Les tables principales utilisées :
  - **users** : Utilisateurs (id, name, email, password)

Les types TypeScript des données sont définis dans `app/lib/definitions.ts`.
Les requêtes SQL sont réalisées dans `app/lib/data.ts`.
Les actions serveur (CRUD utilisateurs, authentification) sont dans `app/lib/actions.ts`.

### Tables à ajouter pour le MVP Habit Tracker
- **habits** : Table des habitudes (id, user_id, name, emoji, type, iterations, creation_date)
- **habit_logs** : Historique des réalisations (id, habit_id, date, completed)
- **user_progress** : Progression utilisateur (id, user_id, level, xp, hedgehog_state)
