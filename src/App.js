import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/pages/Home";
import DriverList from "./components/pages/drivers/DriverList"
import Login from "./components/pages/Login";
import PrivateRoute from "./components/utils/privateRoute";
import ForgetPassword from "./components/pages/ForgetPassword";
import ResetPassword from "./components/pages/ResetPassword";
import NotFound from "./components/pages/Notfound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/forget" exact element={<ForgetPassword />} />
        <Route
          path="/reset/password/:id/:token"
          exact
          element={<ResetPassword />}
        />
        <Route element={<PrivateRoute />}>
          <Route path="/board" exact element={<Dashboard />} />
          <Route path="/boards" exact element={<Home />} />
          <Route path="/drivers" exact element={<DriverList />} />
        </Route>
        <Route path="*" exact element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
