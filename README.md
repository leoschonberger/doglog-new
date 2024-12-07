# DOGLOG - CS 422 Course Project 

Authors: Nathan Cook, Nickolas Johnson, Leo Schonberger, Sterling Miller

README Creation: November 5th, 2024

# About
DOGLOG is a web application that allows users to track their dog's health and wellness. Users can log their dog's bathroom habbits, meals, and exercise. The application provides a map to see where your dog has logged events as well as a list view to see all events. We have a profile page that allows users to see their dog's information and update it. Also on the profile page, users can see their dog's wellness statistics and earn achievements for logging events.

# User Guide:

Access a live version of the site at [DogLog.tech](https://doglog.tech/)

### Login Page:
The login page is the first page you will see when you visit the site. You can login with your Google account. If you don't have an account, you can create one by clicking the "Sign Up" button in the Google popup.

- If you're a new user, you'll be prompted to add a new dog to your account. You can add a dog by clicking the "Add Dog" button and filling out the form.
- If you're an existing user, you'll be taken to the Map Page.

### Map Page:
The map page shows a map of the world with markers for each location event that you've logged. It also allows you to create new pins.
- You can view pins by dragging the map around or zooming in and out. The black paw marker is your current location if you've allowed location access.
- You can click on the markers to see more information about the event. 
- You can also add new events by filling out the form on the left side of the page.

#### Adding Pins:
- You can add a pin by filling out the form on the right side of the map. 
- If you're creating an event with a location, you can click on the map to set the location. You'll see a red marker where you've clicked.

### Activity Page:
The activity page shows a list of all the events that you've logged.
- You can edit or remove an event by clicking on the menu icon in the top right corner of the event card.
- You can filter the events by dog by using the dropdown menu at the top of the page.

### Profile Page:
The profile page shows information about your dog and your wellness statistics. Here you can:

- View your profile information at the top of the page. This is pulled from your Google Account.
- View any achievements you've earned by logging events in the trohpy case. (*Hint: Earn your first achievement by logging a "restroom" event!*)
- View your dog's information and welness statistics. You can update your dog's information by clicking the "Edit" , or "Delete" icons.
- Add a new dog to your account by clicking the "Add Dog" button at the bottom of the page.



# Developer Guide:

## React + Vite + Firebase 10
We realized two backends doesn't make any sense so we scrapped our old project and started fresh with some better choices for our tech stack. Leo took the lead on setting up the new project and getting the Firebase integration working. We are now using Vite as our build tool and Firebase as our backend. We are still using React for the front end but now in combonation with Material UI for the components / styling.


## Software Dependencies:
- Node JS version 22 or higher
- NPM version 10 or higher
- Firebase CLI version 10 or higher

## What are these tools? 
From front to back:
- [material-ui](https://material-ui.com/) - React components that implement Google's Material Design
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - A build tool that aims to provide a faster and leaner development experience for modern web projects
- [Firebase](https://firebase.google.com/) - A platform developed by Google for creating mobile and web applications

## How to Run
1. Clone the repository
2. Add Firebase config to src/config/firebase.jsx (you will need to create this folder and file, see firebase documentation)
3. Run `npm install` to install the dependencies
4. Run `npm run dev` to start the development server
5. Open `http://localhost:5173` in your browser

## How to Deploy
1. Run `npm run build` to build the project
2. Run `firebase deploy` to deploy the project to Firebase hosting *(Careful! This will deploy to the live site)*

## How to Develop

#### Subdirectory Specification
- `src/` contains the source code
    - `components/` contains the React components
    - `config/` contains the Firebase configuration
    - `pages/` contains the pages of the app
    - `services/` contains the abstracted services that interact with Firebase
- `public/` contains image assets and favicons

#### Other Files and Subdirectories
- `dist/` contains the build files (build with `npm run build`)
- `node_modules/` contains the dependencies (installed with `npm install`)
- `App.jsx` is the main component
- `firebase.json` contains the Firebase configuration
- `package.json` contains the dependencies and scripts
- `package-lock.json` contains the dependencies
- `vite.config.js` contains the Vite configuration
