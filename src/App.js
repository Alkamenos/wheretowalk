/*
 * Copyright (c) 2021. Written by Leonid Artemev (me@artemev.it)
 */

import { initializeApp } from "firebase/app";
import React from "react";
import "./App.css";
import Paperbase from "./Paperbase";

// Example base just for testing
const firebaseConfig = {
  apiKey: "AIzaSyC6WH1YmjMMJeynlJ3cPWCJ1plcs8SWQ-g",
  authDomain: "fluid-emissary-132723.firebaseapp.com",
  projectId: "fluid-emissary-132723",
  storageBucket: "fluid-emissary-132723.appspot.com",
  messagingSenderId: "681155421321",
  appId: "1:681155421321:web:0e8229f259c692b0aed258",
  databaseURL:
    "fluid-emissary-132723-default-rtdb.europe-west1.firebasedatabase.app",
};

initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <Paperbase />
    </div>
  );
}

export default App;
