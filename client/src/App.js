import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Hello from './components/Hello';
import Bye from './components/Bye';
import Benefits from './pages/Benefits';
import Workspace from './pages/WorkSpace';
import Rate from './pages/Rate';
//import Financial from './pages/Financial';
import Proposal from './pages/Proposal';
import Landing from './pages/Landing';
import PaymentDashboard from './pages/PaymentDashboard';


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

  return (
      <>
      {/* {loading && <Loader />} */}
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/bye" element={<Bye />} />
        <Route path="/benefits" element={<Benefits/>} />
        <Route path="/workspace" element={<Workspace/>} />
        <Route path="/proposal" element={<Proposal/>} />
        <Route path="/rate" element={<Rate/>} />
        <Route path="/landing" element={<Landing/>} />
        <Route path="/payment" element={<PaymentDashboard/>} />
      

      </Routes>
      {/* {!isAdminRoute && <Footer />}       Conditionally render Footer */}
      </>
  );
};

export default App;
