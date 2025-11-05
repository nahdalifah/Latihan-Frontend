import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // hapus Navigate
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={<h3 className="text-center mt-5">404 Not Found</h3>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;