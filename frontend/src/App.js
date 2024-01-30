import Login from "./pages/Login";
import Home from "./pages/Home";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import EquipmentList from "./pages/EquipmentList";
import EditEquipment from "./pages/EditEquipment";
import AddEquipment from "./pages/AddEquipment";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Layout from "./hocs/Layout";
import "./styles/App.css";
import RequireAuth from "./hocs/RequireAuth";

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Routes>
          {/*Below routes are public, it does not require authentication*/}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route
            path="/password/reset/confirm/:uid/:token"
            element={<ResetPasswordConfirm />}
          ></Route>

          {/*Below routes are protected, RequireAuth checks if user is authenticated or not,
          if not authenticated, it will bring user back to login page*/}
          <Route element={<RequireAuth />}> 
            <Route path="/" element={<Home />} />
            <Route path="/equipment-list" element={<EquipmentList />} />
            <Route path="/add-equipment" element={<AddEquipment />} />
            <Route path="/edit-equipment" element={<EditEquipment />} />

          </Route>
        </Routes>
      </Layout>
    </Provider>
  );
}

export default App;
