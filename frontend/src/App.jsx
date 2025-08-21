import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-slate-900 text-slate-200 font-body">
      <Navbar />
      <main>
        
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;