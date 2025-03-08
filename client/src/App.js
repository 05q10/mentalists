import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Hello from "./components/Hello";
import Bye from "./components/Bye";
import Benefits from "./pages/Benefits";
import Workspace from "./pages/WorkSpace";
import Rate from "./pages/Rate";
//import Financial from './pages/Financial';
import Proposal from "./pages/Proposal";
import Landing from "./pages/Landing";
import PaymentDashboard from "./pages/PaymentDashboard";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Money from "./pages/Money";
import User from "./pages/User";
import Community from "./pages/Community";
import Info from "./pages/Info";
import HomePage from "./pages/Home";
import ScrollToTop from "./pages/ScrollToTop";
function App() {
  return (
    <>
      <BrowserRouter>
        <RoutesWeb />
      </BrowserRouter>
    </>
  );
}

const RoutesWeb = () => {
  const location = useLocation(); // Get the current route
  const hideLayout = location.pathname === "/landing";

  return (
    <>
      {/* {loading && <Loader />} */}
      {!hideLayout && <Money />}
      {!hideLayout && <Header />}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/bye" element={<Bye />} />
        <Route path="/benefits" element={<Benefits />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/proposal" element={<Proposal />} />
        <Route path="/rate" element={<Rate />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/payment" element={<PaymentDashboard />} />
        <Route path="/comm" element={<Community />} />
        <Route path="/info" element={<Info />} />
        <Route path="/money" element={<Money />} />
        <Route path="/user" element={<User />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/mentalists" element={<Landing />} />
      </Routes>
      {/* {!isAdminRoute && <Footer />}       Conditionally render Footer */}
      {!hideLayout && <Footer />}
    </>
  );
};

export default App;
