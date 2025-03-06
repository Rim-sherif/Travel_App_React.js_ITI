import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./componants/Navbar/Navbar";
import Wishlist from "./componants/Wishlist/Wishlist";
import Profile from "./componants/Profile/Profile";
import Search from "./componants/Search/Search";
import Notfound from "./componants/Notfound/Notfound";
import Home from "./componants/Home/Home";
import Support from "./componants/Support/Support";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import Account from "./componants/Profile/Account";
import ChangePassword from "./componants/Profile/ChangePassword";
import { Toaster } from "react-hot-toast";
import Register from "./componants/Register/Register";
import Login from "./componants/Login/Login";
import ProtectedRoute from "./componants/ProtectedRoute/ProtectedRoute";

function App() {
  const location = window.location;
  const navbar = location.pathname == "/login" || location.pathname == "/register";
  return (
    <>

      <Provider store={store}>
        <BrowserRouter>
          {!navbar && <Navbar />}
          <Routes>
            <Route index path="/" element={<Home />}/>
            <Route path="/search" element={<Search />}/>
            <Route path="/wishlist" element={<Wishlist/>}/>
            <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}>
              <Route path="account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
              <Route path="changePassword" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
            </Route>
            <Route path="/support" element={<Support/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<Notfound/>}/>
          </Routes>
        </BrowserRouter>
        <Toaster />
      </Provider>
    </>
  );
}

export default App;
