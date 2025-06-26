# Carnet d'Adresses - Évaluation MongoDB

Application de carnet d'adresses pour l'évaluation pratique sur MongoDB.

## ⚠️ FICHIERS À COMPLÉTER

Cette application est **presque** complète. Il manque deux éléments essentiels que vous devez implémenter :

### 1. Configuration de la base de données
**Fichier :** `config/database.js`
- Connexion à MongoDB Atlas
- Gestion des erreurs

### 2. Modèle de données
**Fichier :** `models/Contact.js`
- Schéma Mongoose pour les contacts
- Validations des champs

## ��� Installation et lancement

```bash
# 1. Installer les dépendances
npm install

# 2. Copier le fichier d'environnement
cp .env.example .env

# 3. Modifier .env avec votre URI MongoDB Atlas
# MONGODB_URI=mongodb+srv://...

# 4. Compléter les fichiers manquants (config/database.js et models/Contact.js)

# 5. Lancer l'application
npm start
# ou en mode développement
npm run dev
```

## ��� Structure du projet

```
carnet-adresses/
├── package.json              # Dépendances et scripts
├── .env.example              # Modèle de variables d'environnement
├── app.js                    # Point d'entrée de l'application
├── config/
│   └── database.js          # ⚠️ À COMPLÉTER - Connexion MongoDB
├── models/
│   └── Contact.js           # ⚠️ À COMPLÉTER - Modèle Contact
├── routes/
│   └── contacts.js          # Routes API (CRUD complet)
├── public/
│   ├── index.html           # Interface utilisateur
│   ├── style.css           # Styles CSS
│   └── script.js           # JavaScript frontend
└── README.md               # Ce fichier
```

## ��� Objectifs

1. **Configurer MongoDB Atlas** avec les variables d'environnement
2. **Créer le modèle Contact** avec les validations appropriées
3. **Tester l'application** via l'interface web

## ��� Champs du contact

Le modèle Contact doit contenir :
- `nom` (String, requis)
- `prenom` (String, requis) 
- `telephone` (String, requis)
- `email` (String, requis)
- `adresse` (String, optionnel)

## ��� Accès à l'application

Une fois lancée, l'application est accessible sur : http://localhost:3000

## ��� Aide

- Consultez la documentation Mongoose : https://mongoosejs.com/docs/guide.html
- Vérifiez les logs dans la console pour déboguer
- Redémarrez le serveur après chaque modification des fichiers à compléter
