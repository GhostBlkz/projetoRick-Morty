import React from "react";
import {Routes, Route} from 'react-router-dom'

import LoginPage from "../Pages/LoginPage";
import CharacterPage from "../Pages/CharacterPage";

import AuthGuard from './AuthGuard'

export default function AppRoutes() {

    return (
      <Routes>
        <Route path="/" element={ <LoginPage /> } />
        <Route path="/character" element={  <AuthGuard> <CharacterPage /> </AuthGuard>  } />

      </Routes>
    )
  }