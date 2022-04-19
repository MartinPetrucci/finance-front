import { Route, Routes } from "react-router-dom";
import Fetch from "../Routes/Fetch";
import Login from "../Routes/Login";
import ProtectedRoute from "../Routes/ProtectedRoute";

const MyRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute user={localStorage.getItem('user')} >
            <Fetch />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />}  />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default MyRoutes;
