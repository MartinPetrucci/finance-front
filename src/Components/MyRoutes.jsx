import { Route, Routes } from "react-router-dom";
import Fetch from "../Routes/Fetch";


const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/fetch" element={<Fetch />} />
    </Routes>
  );
};

export default MyRoutes;
