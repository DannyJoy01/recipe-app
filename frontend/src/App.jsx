import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Recipes from "./pages/Recipes.jsx";
import About from "./pages/About.jsx";
import Login from './pages/Login.jsx';
import Contact from "./pages/Contact.jsx";
import Register from "./pages/Register.jsx";
import NotFound from "./pages/NotFound.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import DashBoard from "./admin/pages/Dashboard.jsx";
import UsersDashboard from './admin/pages/Users.jsx';
import RecipesDashboard from './admin/pages/Recipes.jsx';
import MessagesDashboard from './admin/pages/Messages.jsx';
import ProtectedRoutes from "./routes/protectedRoutes.jsx";
import UserDetails from './admin/pages/UserDetails.jsx';
import Profile from './userDashboard/pages/Profile.jsx';
import UsersDashBoard from './userDashboard/pages/Dashboard.jsx';
import UserRecipes from "./userDashboard/pages/Recipes.jsx"




function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Admin Routes */}
        <Route element={<ProtectedRoutes allowedRoles={['admin']} />}>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/dashboard/users" element={<UsersDashboard />} />
        <Route path="/dashboard/recipes" element={<RecipesDashboard />} />
        <Route path="/dashboard/messages" element={<MessagesDashboard />} />
        <Route path="/user-details/:id" element={<UserDetails />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

        {/* Users dashboard Routes */}
        <Route element={<ProtectedRoutes allowedRoles={['regular']} />}>
          <Route path="user-dashboard" element={<UsersDashBoard />} />
          <Route path="user-profile" element={<Profile />} />
          <Route path="user-recipes" element={<UserRecipes />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
