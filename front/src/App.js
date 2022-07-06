import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Connection from './pages/Connection';
import Home from './pages/Home';
import Portal from './pages/Portal'
import Profil from './pages/Profil'
import Inscription from './pages/Inscription'
import CreatePage from './pages/CreatePage';
import Bio from './pages/Bio'

const App = () => {
  return (
    < BrowserRouter >
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/createpage" element={<CreatePage />} />
        <Route path="/bio" element={<Bio />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/profil/:id" element={<Profil />} />
        <Route path="/inscription" element={<Inscription />} /> {/* Ici si il y a rien après le / dans l'url, ont renvoie vers la page Home */}
        <Route path="/connection" element={<Connection />} />  {/*Ici on renvoie sur la page About*/}
        <Route path="*" element={<Portal />} /> {/* path="*" fonctionne si jamais l'url ne correspond a rien */}
      </Routes>
    </BrowserRouter >
  );
};

export default App;