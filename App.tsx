
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './screens/Login';
import Home from './screens/Home';
import Accesses from './screens/Accesses';
import Community from './screens/Community';
import Payments from './screens/Payments';
import Profile from './screens/Profile';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-gray-100">
        <Routes>
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={() => setIsAuthenticated(true)} />} 
          />
          <Route 
            path="/" 
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/accesses" 
            element={isAuthenticated ? <Accesses /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/community" 
            element={isAuthenticated ? <Community /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/payments" 
            element={isAuthenticated ? <Payments /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/profile" 
            element={isAuthenticated ? <Profile onLogout={() => setIsAuthenticated(false)} /> : <Navigate to="/login" />} 
          />
        </Routes>
        
        {isAuthenticated && <Navbar />}
      </div>
    </HashRouter>
  );
};

export default App;
