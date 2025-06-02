import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Créer le dossier dist-standalone s'il n'existe pas
const distStandalonePath = path.join(__dirname, '..', 'dist-standalone');
if (!fs.existsSync(distStandalonePath)) {
  fs.mkdirSync(distStandalonePath);
}

// Copier le contenu du dossier dist
const distPath = path.join(__dirname, '..', 'dist');
fs.cpSync(distPath, distStandalonePath, { recursive: true });

// Créer le fichier serveur.js
const serverContent = `
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(\`Serveur démarré sur http://localhost:\${port}\`);
});
`;

fs.writeFileSync(path.join(distStandalonePath, 'serveur.js'), serverContent);

// Créer le fichier package.json pour la version standalone
const packageJson = {
  "name": "facturation-form-standalone",
  "version": "1.0.0",
  "description": "Version standalone de l'application de facturation",
  "main": "serveur.js",
  "scripts": {
    "start": "node serveur.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
};

fs.writeFileSync(
  path.join(distStandalonePath, 'package.json'),
  JSON.stringify(packageJson, null, 2)
);

// Créer un fichier README
const readmeContent = `
# Application de Facturation - Version Standalone

## Installation

1. Assurez-vous d'avoir Node.js installé sur votre ordinateur (téléchargeable sur https://nodejs.org/)
2. Ouvrez un terminal dans ce dossier
3. Exécutez la commande : npm install

## Démarrage

Pour démarrer l'application, exécutez la commande :
npm start

L'application sera accessible à l'adresse : http://localhost:3000

## Utilisation

1. Ouvrez votre navigateur web
2. Accédez à http://localhost:3000
3. Utilisez l'application normalement
`;

fs.writeFileSync(path.join(distStandalonePath, 'README.txt'), readmeContent);

console.log('Version standalone créée avec succès dans le dossier dist-standalone'); 