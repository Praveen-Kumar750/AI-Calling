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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pricing" element={<Pricingpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/incoming-calls" element={<IncomingCalls />} />
        <Route path="/outgoing-calls" element={<OutgoingCalls />} />
        <Route path="/billing-calls" element={<BillingTableCalls />} />
        <Route path="/incoming-messages" element={<IncomingMessages />} />
        <Route path="/outgoing-messages" element={<OutgoingMessages />} />
        <Route path="/billing-messages" element={<BillingTableMessages />} />
      </Routes>
    </Router>
  );
}

export default App;
