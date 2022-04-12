import { Route, Routes } from "react-router-dom";
import Fetch from "../Routes/Fetch";
import Login from "../Routes/Login";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/fetch" element={<Fetch />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default MyRoutes;
