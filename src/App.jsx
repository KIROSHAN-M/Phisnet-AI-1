import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import BackgroundAnimation from './components/BackgroundAnimation';
import AnimatedRoutes from './components/AnimatedRoutes';

function App() {
  return (
    <BrowserRouter>
      <BackgroundAnimation />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 flex flex-col max-w-6xl w-full mx-auto">
          <AnimatedRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
