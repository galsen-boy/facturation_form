# Application de Facturation pour Location de Véhicules

Cette application web permet de gérer les contrats de location de véhicules en générant des formulaires et des PDF de contrat.

## Fonctionnalités

- Formulaire complet pour la saisie des informations de location
- Validation des champs obligatoires
- Génération de PDF du contrat
- Interface utilisateur moderne et responsive
- Support multilingue (français)

## Prérequis

- Node.js (version 14 ou supérieure)
- npm (version 6 ou supérieure)

## Installation

1. Clonez le dépôt :
```bash
git clone [URL_DU_REPO]
cd facturation-form
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez l'application en mode développement :
```bash
npm start
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Utilisation

1. Remplissez le formulaire avec les informations du client et du véhicule
2. Vérifiez que tous les champs obligatoires sont remplis
3. Cliquez sur "Générer le contrat PDF" pour créer le document
4. Le PDF sera généré et pourra être téléchargé

## Technologies utilisées

- React
- TypeScript
- Material-UI
- Formik
- Yup
- react-to-pdf
- date-fns

## Structure du projet

```
src/
  ├── components/
  │   ├── FacturationForm.tsx
  │   └── ContratPDF.tsx
  ├── App.tsx
  └── index.tsx
```

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

MIT 