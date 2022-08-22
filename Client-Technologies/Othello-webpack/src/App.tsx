import { ThemeProvider } from "@emotion/react";
import { Box, Container, Paper, Typography, useMediaQuery } from "@mui/material";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useMemo, useState } from "react";
import * as THREE from "three";
import Globe from "./Globe";
import Home from "./Home";
import Nav from "./Nav";
import Playfield from "./Playfield";
import createTheme from "./Theme";

const App = () => {
  const isDarkModeEnabled = useMediaQuery('(prefers-color-scheme: dark)');
  const [page, setPage] = useState<'home' | 'play'>('home');
  const [auth, setAuth] = useState(false);

  const handleHome = () => setPage('home');
  const handlePlay = () => setPage('play');
  const handleLogin = () => setAuth(!auth);
  
  const theme = useMemo(() =>
    createTheme(isDarkModeEnabled ? 'dark' : 'light')
    , [isDarkModeEnabled])

  return (
    <ThemeProvider theme={theme}>
      <Nav
        auth={auth}
        onPlay={handlePlay}
        onHome={handleHome}
        onLogin={handleLogin}
        onLogout={handleLogin}
      />
      { page === 'home' && (
        <Home/>
      ) ||
        page === 'play' && (
        <Playfield/>
      )}
    </ThemeProvider>
  );
};

export default App; 