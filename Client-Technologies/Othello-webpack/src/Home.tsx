import { Button, Checkbox, Container, Divider, FormControlLabel, Grid, Paper, TextField, Typography, useTheme } from '@mui/material';
import { PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { FC, useRef } from 'react';
import * as THREE from 'three';
import Globe from './Globe';
import Register from './Register';

const Home: FC = () => {
  const theme = useTheme();

  return (
    <>
      <div 
        style={{
          position: 'relative',
          paddingTop: '0px', 
          height: '800px' 
        }}
      >
        <Canvas 
          style={{
            position: "absolute",
            inset: 0,
            top: 100,
            bottom: 100
          }}
        >
          <PerspectiveCamera 
            makeDefault
            position={[-1, 0, 2.5]}/>
          {/* <ambientLight 
            color={new THREE.Color('0x010101')}/> */}
          <directionalLight 
            args={['white', 2]}
            position={[-10, 0, 6]}
            rotation={new THREE.Euler(0, -45 * (Math.PI / 180), 0)}
            castShadow/>
          {/* <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} /> */}
          <Globe/>
        </Canvas>
        <div
          style={{
            position: 'absolute',
            top: 100,
            left: 0,
            width: '50%'
          }}
        >
          <Typography
            variant="h1"
            color="white"
            sx={{
              padding: '100px 200px 0 0',
              fontWeight: 700,
              textAlign: 'right'
            }}
          >
            OTHELLO
          </Typography>
          <Typography
            variant="body2"
            color="white"
            sx={{
              padding: '100px 0 0 0',
              textAlign: 'right'
            }}
          >
            Reversi or Othello is a strategy board game for two players, played on an 8×8 uncheckered board. There are sixty-four identical game pieces called disks (often spelled "discs"), which are light on one side and dark on the other. Players take turns placing disks on the board with their assigned color facing up. During a play, any disks of the opponent's color that are in a straight line and bounded by the disk just placed and another disk of the current player's color are turned over to the current player's color. The object of the game is to have the majority of disks turned to display your color when the last playable empty square is filled. 
          </Typography>
        </div>
      </div>
      <Container>
        <Paper sx={{ 
          mt: 10, 
          overflow: 'hidden'
        }}>
          <Register/>
        </Paper>
      </Container>
    </>
  )
}

export default Home;