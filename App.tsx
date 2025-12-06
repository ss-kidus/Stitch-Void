import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import BootScreen from './components/BootScreen';
import AuthScreen from './components/AuthScreen';
import Dashboard from './components/Dashboard';
import Loom from './components/Loom';
import GlobalMap from './components/GlobalMap';
import Profile from './components/Profile';
import Library from './components/Library';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<BootScreen />} />
          <Route path="/auth" element={<AuthScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/loom" element={<Loom />} />
          <Route path="/map" element={<GlobalMap />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
