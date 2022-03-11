import { Route, Routes } from "react-router-dom";
import Overview from '../Routes/Overview'
import Month from '../Routes/Month'

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<h1>Home</h1>} />
      <Route path="/details/:month" element={<Month />} />
      <Route path="/overview" element={<Overview />}></Route>
    </Routes>
  );
};

export default MyRoutes;
