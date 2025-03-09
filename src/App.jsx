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
import AdminRoute from "./componants/AdminRoute/AdminRoute";
import TripDetailsPage from "./componants/SingleTrip/Singletrip";
import DashboardLayout from "./componants/Dashboard/DashboardLayout";
import Trips from "./componants/Dashboard/Trips";
import Category from "./componants/Dashboard/Category";
import Orders from "./componants/Dashboard/Orders";
import Footer from "./componants/Footer/Footer";
import ChatIcon from "./componants/Chat/ChatIcon";
import ChatPage from "./componants/chat/chat";
import About from "./componants/About/About";

const AppRoutes = () => {
  const location = useLocation();
  const currentPath = location.pathname;
    const hideNavbarPaths = [
    "/login",
    "/register",
    "/dashboard/trips",
    "/Chat",
    "/dashboard/category",
    "/dashboard/orders",
  ];
  const hideFooterPaths = hideNavbarPaths;
  const hideChatIconPaths = ["/Chat", "/login", "/register"];

  // this return true or false he map on arr and check if current pass in arr if yes he return false
  const showNavbar = !hideNavbarPaths.includes(currentPath);
  const showFooter = !hideFooterPaths.includes(currentPath);
  const showChatIcon = !hideChatIconPaths.includes(currentPath);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/trips/:id" element={<TripDetailsPage />} />
        <Route path="/Chat" element={<ChatPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        >
          <Route
            path="account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="changePassword"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Trips />} />
          <Route path="trips" element={<Trips />} />
          <Route path="category" element={<Category />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      {showChatIcon && <ChatIcon />}
      {showFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Toaster />
    </Provider>
  );
}

export default App;
