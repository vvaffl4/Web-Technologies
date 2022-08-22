import { ThreeEvent, useThree, Vector3 } from '@react-three/fiber';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState, } from 'react';
import * as THREE from 'three';
import Stone from './Stone';

const Board: FC<{position: Vector3 }> = (props) => {
  const boardSpaces = 8;
  const boardSize = 5;
  const spaceSize = boardSize / boardSpaces;    

  const ref = useRef<THREE.PlaneGeometry>(null!);
  const [turn, setTurn] = useState<number>(1);
  const [board, setBoard] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 2, 0, 0, 0,
    0, 0, 0, 2, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0
  ]);

  useEffect(() => {
    for (let i = 0; i < boardSpaces * boardSpaces; i++) {
        ref.current!.addGroup(
          i * 6,
          6, 
          ((i + Math.floor(i / boardSpaces)) % 2));
    }
  }, [ref]);

  const checkIfValid = useCallback((index: number) => {
    const directions = [
      -9, -8, -7,
      -1,      1,
       7,  8,  9
    ];
    
    console.log(`Index: ${index}`);
    
    return directions.reduce((result, direction) => {
      let hasOpponent = false;
      const path = [];

      for(
        let checkIndex = index + direction, boardLength = board.length; 
        checkIndex > -1 && checkIndex < boardLength; 
        checkIndex += direction
      ) {
        if (board[checkIndex] === turn + 1 && hasOpponent) {
          return {
            valid: true,
            paths: [
              ...result.paths,
              path
            ]
          };
        } else if (board[checkIndex] === 1 - turn + 1) {
          hasOpponent = true;
          path.push(checkIndex);
        } else {
          break;
        }
      }
      
      return result;
    }, {
      valid: false,
      paths: [[ index ]]
    });

    // return directions.some((direction) => {
    //   let hasOpponent = false;

    //   for(
    //     let checkIndex = index + direction, boardLength = board.length; 
    //     checkIndex > -1 && checkIndex < boardLength; 
    //     checkIndex += direction
    //   ) {
    //     console.log(direction, checkIndex, turn);
        
    //     if (board[checkIndex] === turn + 1 && hasOpponent) {
    //       return true;
    //     } else if (board[checkIndex] === 1 - turn + 1) {
    //       hasOpponent = true;
    //     } else {
    //       break;
    //     }
    //   }
      
    //   return false;
    // });
  }, [turn, board]);

  const handleClick = useCallback((event: ThreeEvent<MouseEvent>) => {
    if (event.eventObject.name === 'board' && event.faceIndex !== undefined) {
      const index = Math.floor(event.faceIndex * 0.5);
      const result = checkIfValid(index);

      if(result.valid) {
        const newBoard = Array.from(board);
        
        result.paths.forEach(path => {
          path.forEach(pathIndex => {
            newBoard[pathIndex] = turn + 1;
          });
        });

        setBoard(newBoard);
        setTurn(1 - turn);
      } else {
        console.log('invalid');
      }
    }
  }, [board]);

  return (
    <React.Fragment>
      <mesh
        name='board'
        material={[
          new THREE.MeshBasicMaterial({ color: new THREE.Color('green') }),
          new THREE.MeshBasicMaterial({ color: new THREE.Color('darkgreen') })
        ]}
        rotation={new THREE.Euler(-90 * (Math.PI / 180), 0, 0)}
        onClick={handleClick}
      >
        <planeGeometry 
          ref={ref}
          args={[5, 5, 8, 8]}
        />
      </mesh>
      { board.map((num, index) => {
       
        return num !== 0 && ( 
          <Stone 
            key={index}
            num={num}
            position={[
              -(spaceSize * ((boardSpaces - 1) * 0.5)) + (index % boardSpaces * spaceSize),
              0.1,
              -(spaceSize * ((boardSpaces - 1) * 0.5)) + (Math.floor(index / boardSpaces)) * spaceSize
            ]}/>
        )
      })}
    </React.Fragment>
  )
}

export default Board;