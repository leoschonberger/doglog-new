// main.jsx:

/*
 * This file represents the main entry point for the web app. It renders the App component to the root element in the HTML file.
 * 
 * Group Name: Doo Doo Data
 * 
 * Authors:
 * - Leo Schonberger
 * 
 * Description: This file allows us to render the App component to the root element in the HTML file. It also imports the CSS file for styling.
 * Created by: Leo Schonberger
 * Last updated by: Leo Schonberger
 * Last updated on: 2024-12-6
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

// Render the App component to the root element in the HTML file
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
