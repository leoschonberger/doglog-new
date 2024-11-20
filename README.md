# DogLog-New: React + Vite + Firebase 10
We realized two backends doesn't make any sense. Also, create-react-app is slowww.

## What are these tools? 
From front to back:
- [material-ui](https://material-ui.com/) - React components that implement Google's Material Design
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - A build tool that aims to provide a faster and leaner development experience for modern web projects
- [Firebase](https://firebase.google.com/) - A platform developed by Google for creating mobile and web applications

## How to Run
1. Clone the repository
2. Add Firebase config to src/config/firebase.jsx (you will need to create this folder and file)
3. Run `npm install` to install the dependencies
4. Run `npm run dev` to start the development server
5. Open `http://localhost:5173` in your browser

## How to Deploy
1. Run `npm run build` to build the project
2. Run `firebase deploy` to deploy the project to Firebase hosting *(Careful! This will deploy to the live site)*

## How to Develop

#### Files to work on
- `src/` contains the source code
    - `components/` contains the React components
    - `config/` contains the Firebase configuration
    - `pages/` contains the pages of the app
    - `services/` contains the abstracted services that interact with Firebase
- `public/` contains image assets and favicons

#### Files to not touch
- `dist/` contains the build files (build with `npm run build`)
- `node_modules/` contains the dependencies (installed with `npm install`)
- `App.jsx` is the main component
- `firebase.json` contains the Firebase configuration
- `package.json` contains the dependencies and scripts
- `package-lock.json` contains the dependencies
- `vite.config.js` contains the Vite configuration
