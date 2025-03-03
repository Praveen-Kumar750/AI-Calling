import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Pricingpage from "./pages/Pricingpage";
import Loginpage from "./pages/Loginpage";
import Dashboard from "./client/Dashboard";
import IncomingCalls from "./client/IncomingCalls";
import IncomingMessages from "./client/IncomingMessages";
import OutgoingCalls from "./client/OutgoingCalls";
import OutgoingMessages from "./client/OutgoingMessages";
import BillingTableCalls from "./client/BillingTableCalls";
import BillingTableMessages from "./client/BillingTableMessages";
import FileUpload from "./client/FileUpload";
import PreviousData from "./client/PreviousData";
import Dashboardincoming from "./client/Dashboardincoming";
import Dashboardoutgoing from "./client/Dashboardoutgoing";
import Register from "./pages/Register";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pricing" element={<Pricingpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}

        <Route path="/dashboard" element={<Dashboard key="dashboard" />} />
        <Route path="/dashboard-incoming" element={<Dashboardincoming key="dashboard-incoming" />} />
        <Route path="/dashboard-outgoing" element={<Dashboardoutgoing key="dashboard-outgoing" />} />
        
        <Route path="/incoming-calls" element={<IncomingCalls />} />
        <Route path="/outgoing-calls" element={<OutgoingCalls />} />
        <Route path="/billing-calls" element={<BillingTableCalls />} />
        <Route path="/incoming-messages" element={<IncomingMessages />} />
        <Route path="/outgoing-messages" element={<OutgoingMessages />} />
        <Route path="/billing-messages" element={<BillingTableMessages />} />
        <Route path="/file-upload" element={<FileUpload />} />
        <Route path="/previous-data" element={<PreviousData />} />
        {/* <Route path="/dashboard-incoming" element={<Dashboardincoming/>} />
        <Route path="/dashboard-outgoing" element={<Dashboardoutgoing/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;





