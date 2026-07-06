import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './page/HomePage';
import Login from './page/Login';
import Register from './page/Register';

import { isLoggedIn } from './auth/auth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn() ? <HomePage /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

