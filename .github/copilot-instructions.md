
---

## 🟢 **Phase 1 — MVP : Gestion des habitudes et utilisateurs**

### US1. En tant qu'utilisateur, je veux créer un compte et me connecter pour accéder à mes habitudes.
**Critères d'acceptation :**
- [ ] Un formulaire d'inscription permet de créer un compte avec email/mot de passe
- [ ] Un formulaire de connexion permet de s'authentifier
- [ ] Les mots de passe sont hashés et stockés de manière sécurisée
- [ ] Une session est maintenue après connexion
- [ ] Un message d'erreur s'affiche en cas d'identifiants incorrects
- [ ] L'utilisateur est redirigé vers son dashboard après connexion réussie

### US2. En tant qu'utilisateur, je veux créer une habitude avec un emoji, un nom, une fréquence (quotidienne/hebdomadaire) et un type (bonne/mauvaise) pour personnaliser mes routines.
**Critères d'acceptation :**
- [ ] Un formulaire permet de saisir le nom de l'habitude (max 50 caractères)
- [ ] Un sélecteur d'emoji permet de choisir parmi une liste prédéfinie
- [ ] Un bouton radio permet de choisir entre "quotidienne" et "hebdomadaire"
- [ ] Un bouton radio permet de choisir entre "bonne habitude" et "mauvaise habitude"
- [ ] L'habitude est sauvegardée en base avec tous les champs requis
- [ ] Un message de confirmation s'affiche après création (toast)
- [ ] La validation côté client empêche la soumission de champs vides

### US3. En tant qu'utilisateur, je veux cocher mes habitudes chaque jour/semaine pour suivre ma progression.
**Critères d'acceptation :**
- [ ] Une liste des habitudes du jour/semaine s'affiche sur le dashboard
- [ ] Chaque habitude a une case à cocher cliquable
- [ ] Le clic sur une case marque l'habitude comme accomplie pour la période
- [ ] L'état "coché" est stocké en base de données
- [ ] L'interface se met à jour immédiatement après le clic
- [ ] Les habitudes déjà cochées restent cochées au rechargement de la page
- [ ] Un indicateur visuel distingue les habitudes accomplies des non-accomplies
- [ ] Chaque complétion de l'habitude est stockée en base de données

### US4. En tant qu'utilisateur, je veux voir mes habitudes sur un calendrier avec des pastilles pour visualiser mes progrès.
**Critères d'acceptation :**
- [ ] Un calendrier mensuel affiche tous les jours du mois
- [ ] Chaque jour contient des pastilles colorées représentant les habitudes
- [ ] Couleur verte pour les habitudes accomplies
- [ ] Couleur rouge pour les habitudes manquées
- [ ] Couleur grise pour les habitudes du jour
- [ ] Au clic sur un jour, détail des habitudes de ce jour
- [ ] Navigation entre les mois précédent/suivant

### US5. En tant qu'utilisateur, je veux voir mes streaks (séries de jours réussis) pour rester motivé.
**Critères d'acceptation :**
- [ ] Affichage du streak actuel pour chaque habitude
- [ ] Affichage du meilleur streak historique
- [ ] Le streak se remet à zéro si l'habitude est manquée
- [ ] La couleur de l'habitude change en fonction du nombre de complétions
- [ ] Un graphique montre l'évolution du streak dans le temps

### US6. En tant qu'utilisateur, je veux pouvoir rattraper les oublis du jour précédent au démarrage d'un nouveau jour.
**Critères d'acceptation :**
- [ ] À la première connexion du jour, popup de rattrapage si habitudes manquées
- [ ] Liste des habitudes non cochées de la veille
- [ ] Possibilité de cocher rétroactivement (jusqu'à 24h)
- [ ] Option "Ignorer" pour accepter l'échec
- [ ] Le rattrapage maintient le streak en cours

### US7. En tant que développeur, je veux un mode debug pour avancer artificiellement le jour et tester le comportement temporel.
**Critères d'acceptation :**
- [ ] Variable d'environnement DEBUG_MODE active le mode développeur
- [ ] Interface admin permet de modifier la date système
- [ ] Boutons "+1 jour", "+1 semaine" pour avancer le temps
- [ ] Toute la logique temporelle utilise cette date simulée
- [ ] Possibilité de reset à la date réelle
- [ ] Mode visible uniquement en développement (pas en production)


---

## 🟡 **Phase 2 — Gamification & immersion**

### US8. En tant qu'utilisateur, je veux gagner de l'XP en accomplissant mes habitudes pour faire progresser mon niveau.
**Critères d'acceptation :**
- [ ] Chaque habitude accomplie rapporte des points d'XP 
- [ ] Barre de progression XP visible sur le profil utilisateur
- [ ] Passage au niveau suivant avec notification visuelle
- [ ] Formule de progression exponentielle (niveau n = n² × 100 XP)
- [ ] Bonus XP pour les streaks (×1.5 à partir de 7 jours)
- [ ] Historique des gains d'XP consultable

### US9. En tant qu'utilisateur, je veux voir mon hérisson grandir à chaque niveau pour visualiser ma progression.
**Critères d'acceptation :**
- [ ] 5 stades de croissance du hérisson (bébé → adulte)
- [ ] Changement visuel automatique à chaque passage de niveau
- [ ] Animation de transition entre les stades
- [ ] Sauvegarde de l'état actuel du hérisson
- [ ] Possibility de voir l'évolution passée dans une galerie

### US10. En tant qu'utilisateur, je veux nourrir mon hérisson quand je réussis mes tâches pour renforcer la sensation de récompense.
**Critères d'acceptation :**
- [ ] Bouton "Nourrir" apparaît après chaque habitude accomplie
- [ ] Animation de nourriture tombant vers le hérisson
- [ ] Jauge de bonheur/satiété du hérisson
- [ ] Différents types de nourriture selon le type d'habitude
- [ ] Le hérisson réagit visuellement (expressions, mouvements)
- [ ] Système de "faim" qui décroît avec le temps

### US11. En tant qu'utilisateur, je veux débloquer des éléments de décor à certains niveaux pour personnaliser l'environnement.
**Critères d'acceptation :**
- [ ] Catalogue d'éléments débloqués par niveau (arbres, fleurs, rochers)
- [ ] Interface de placement pour positionner les éléments
- [ ] Sauvegarde de la configuration du décor
- [ ] Preview avant placement définitif
- [ ] Limite d'éléments par type pour éviter le chaos visuel
- [ ] Possibilité de supprimer/déplacer les éléments placés

### US12. En tant qu'utilisateur, je veux associer une tâche à un élément du décor pour lier mes habitudes à la croissance du monde virtuel.
**Critères d'acceptation :**
- [ ] Lors de la création d'habitude, sélection d'un élément de décor associé
- [ ] L'élément grandit/fleurit quand l'habitude est accomplie
- [ ] États visuels dégradés si l'habitude est négligée
- [ ] Lien visible entre habitude et élément (tooltip/highlight)
- [ ] Possibilité de changer l'association après création
- [ ] Animation spéciale lors de l'accomplissement de l'habitude liée

### US13. En tant qu'utilisateur, je veux un graphique pour visualiser ma productivité sur une période.
**Critères d'acceptation :**
- [ ] Graphique en barres par semaine/mois montrant le % de réussite
- [ ] Courbe d'évolution de l'XP dans le temps
- [ ] Filtrage par habitude spécifique ou vue globale
- [ ] Légende claire et tooltips informatifs
- [ ] Export des données en CSV
- [ ] Comparaison entre périodes (mois actuel vs précédent)

### US14. En tant qu'utilisateur, je veux voir le nombre total de réalisations de mes principales habitudes.
**Critères d'acceptation :**
- [ ] Compteurs affichés sur chaque habitude (ex: "127 fois accomplie")
- [ ] Podium des 3 habitudes les plus accomplies
- [ ] Statistiques détaillées : total, moyenne par semaine, taux de réussite
- [ ] Badge "Centurion" à 100 accomplissements
- [ ] Historique mensuel des accomplissements
- [ ] Partage des statistiques (capture d'écran générée)

---

## 🟠 **Phase 3 — Compétition & multijoueur**

### US15. En tant qu'utilisateur, je veux me comparer à d'autres joueurs dans un classement pour me motiver.
**Critères d'acceptation :**
- [ ] Classement mondial basé sur l'XP total ou le niveau
- [ ] Position de l'utilisateur affiché dans le classement
- [ ] Top 10 visible avec pseudonymes et niveaux
- [ ] Filtre par période (semaine, mois, all-time)
- [ ] Anonymisation des données sensibles (seuls pseudos et XP)
- [ ] Mise à jour temps réel du classement
- [ ] Badge spécial pour le top 3

### US16. En tant qu'utilisateur, je veux voir les meilleurs joueurs et leurs hérissons pour trouver de l'inspiration.
**Critères d'acceptation :**
- [ ] Galerie des hérissons du top 10 avec leur environnement
- [ ] Informations publiques : niveau, nombre d'habitudes, streaks record
- [ ] Possibilité de "suivre" un joueur inspirant
- [ ] Tags des habitudes populaires chez les top players
- [ ] Profils publics consultables (si opt-in du joueur)
- [ ] Système de "likes" sur les environnements créatifs

### US17. En tant qu'utilisateur, je veux lancer une phase de focus (style Pomodoro) pour gagner des points en me concentrant.
**Critères d'acceptation :**
- [ ] Timer configurable (15, 25, 45 minutes)
- [ ] Interface minimaliste de focus avec chrono
- [ ] Blocage des notifications pendant la session
- [ ] Association optionnelle à une habitude spécifique
- [ ] Gain d'XP bonus proportionnel à la durée (25min = 50 XP)
- [ ] Historique des sessions de focus accomplies
- [ ] Pause/reprise avec pénalité d'XP si interruption

### US18. En tant qu'utilisateur, je veux gagner des récompenses supplémentaires lors des phases de focus.
**Critères d'acceptation :**
- [ ] Nourriture spéciale débloquée après sessions de focus
- [ ] Multiplicateur d'XP temporaire (×2 pendant 1h après focus)
- [ ] Éléments de décor exclusifs aux sessions de focus (cristaux, etc.)
- [ ] Badge "Concentration" après 10 sessions réussies
- [ ] Streaks de focus avec récompenses escaladées
- [ ] Animation spéciale du hérisson pendant les sessions

### US19. En tant que nouvel utilisateur, je veux pouvoir arriver sur une landing page pour comprendre le principe de l'application.
**Critères d'acceptation :**
- [ ] Hero section expliquant le concept en une phrase claire
- [ ] Démonstration visuelle avec captures d'écran de l'app
- [ ] Section des 3 phases de développement (MVP → Gamification → Compétition)
- [ ] Témoignages d'utilisateurs fictifs mais crédibles
- [ ] Call-to-action clair vers l'inscription
- [ ] Version responsive adaptée mobile/desktop
- [ ] Temps de chargement < 3 secondes
- [ ] SEO optimisé avec meta tags appropriés

---

---

## Dépendances du projet

### Dépendances principales (package.json)

- **next 15.6.0-canary.6** : Framework React pour le rendu côté serveur et la génération statique
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
