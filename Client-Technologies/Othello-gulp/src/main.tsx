import React from 'react';
import { createRoot } from 'react-dom/client';

const Hello: React.FC<{ compiler: string }> = ({ compiler }) => {
  console.log(`Hello Happy ${compiler}`);
  return (<div>
    Hello Happy { compiler }!
  </div>);
}

createRoot(document.getElementById('root')!).render(<Hello compiler='World'/>)