import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Forgot from "./pages/Forgot.jsx";
import Option from "./pages/Option.jsx";
import Home from "./pages/Home.jsx";
import Periodtrack from "./pages/Periodtrack.jsx";
import Water from "./pages/Water.jsx";
import Nav from "./pages/Nav.jsx";
import Diet from "./pages/Diet.jsx";
import Cart from "./pages/Cart.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Tracker from "./pages/Tracker.jsx";
import Delay from "./pages/Delay.jsx";
import Home2 from "./pages/Home2.jsx";
import Nav2 from "./pages/Nav2.jsx";
import PregnancyTracker from "./pages/PregnancyTracker.jsx";
import Medica from "./pages/Medica.jsx";
import Upload from "./pages/Upload.jsx";
import Prdiet from "./pages/Prdiet.jsx";
import Checklist from "./pages/Checklist.jsx";
import Cart2 from "./pages/Cart2.jsx";
import Addcart from "./pages/Addcart.jsx";
import Sidebar from "./admin/Sidebar.jsx";
import Orderpage from "./admin/Orderpage.jsx";
import ProductPage from "./admin/ProductPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/option" element={<Option />} />
        <Route path="/home" element={<Home />} />
        <Route path="/period" element={<Periodtrack />} />
                <Route path="/water" element={<Water />} />
                <Route path="/nav" element={<Nav />} />
                <Route path="/diet" element={<Diet />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/tracker" element={<Tracker />} />
                <Route path="/delay" element={<Delay />} />
///////////////////////////////////////////////////////////
                <Route path="/home2" element={<Home2/>} />
                <Route path="/nav2" element={<Nav2/>} />
                <Route path="/pregnancy" element={<PregnancyTracker/>} />
                <Route path="/medical" element={<Medica/>} />
                <Route path="/upload" element={<Upload/>} />
                <Route path="/prdiet" element={<Prdiet/>} />
                <Route path="/checklist" element={<Checklist/>} />
                <Route path="/cart2" element={<Cart2/>} />
                <Route path="/addcart" element={<Addcart/>} />
//////////////////////////////////////////////////////////////////////////////
                <Route path="/sidebar" element={<Sidebar/>} />
                <Route path="/orderpage" element={<Orderpage/>} />
                <Route path="/product" element={<ProductPage/>} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
