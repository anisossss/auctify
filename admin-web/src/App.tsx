import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../src/pages/Login";
import UsersList from "../src/pages/UsersList";
import UsersInfos from "../src/pages/UsersInfos";
import CompaniesList from "../src/pages/CompaniesList";
import ProductList from "../src/pages/ProductsList";
import Layout from "./layout/Layout";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AdminPrivateRoute from "./privateRoutes/AdminPrivateRoutes";
import CompanyPrivateRoute from "./privateRoutes/CompanyRoutes";
import CompanyProducts from "./pages/companyProducts";
import CreateProducts from "./pages/CreateProducts";
import CompanyInfos from "./pages/CompanyInfos";
import PrivateRoute from "./privateRoutes/PrivateRoute";
import Auctions from "./pages/Auctions";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Parametres from "./pages/Parametres";
import Live from "./pages/Live";
import LiveCompany from "./pages/LiveCompany";
import Statistics from "./pages/Statistics";
import Dashboard from "./pages/Dashboard";
import ProductInfo from "./pages/ProductInfo";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} index />
          <Route path="/reset-password" element={<ResetPassword />} index />
          <Route path="/forgotPassword" element={<ForgotPassword />} index />

          <Route path="/" element={<Layout />}>
            <Route path="/usersList" element={<UsersList />} index />
            <Route path="/productinfo/:id" element={<ProductInfo />}></Route>
            <Route path="/companiesList" element={<CompaniesList />} index />
            <Route path="/productsList" element={<ProductList />} index />
            <Route path="/displayUserInfos/:id" element={<UsersInfos />} />
            <Route path="/displayCompanyInfos/:id" element={<CompanyInfos />} />
            <Route path="/displayCompanyProducts" element={<ProductList />} />
            <Route path="/parametres/:userId" element={<Parametres />}></Route>

            <Route path="/profile/:id" element={<Profile />} />
            {/* <Route path="*" element={<Navigate to="/login" />} /> */}
            <Route path="test" element={<Auctions />} />
            <Route path="live" element={<Live />} />
            <Route path="liveCompany" element={<Live />} />
            <Route path="Statistiques" element={<Statistics />} />
            <Route path="Dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
