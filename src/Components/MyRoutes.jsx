import { Route, Routes } from "react-router-dom";
import Overview from '../Routes/Overview'

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<h1>Home</h1>} />
      <Route path="/month" element={<h1>Month</h1>} />
      <Route path="/overview" element={<Overview />}></Route>
    </Routes>
  );
};

export default MyRoutes;
