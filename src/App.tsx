import "./App.css"; 

import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Dashboard from "./pages/dashboardPage";
import EncryptPage from "./pages/encryptPage";
import DecryptPage from "./pages/decryptPage";
import DocumentDirectory from "./pages/documentsPage";

function App() {

  return (
 
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/main" element={<Dashboard />} />
      <Route path="/decrypt" element={<DecryptPage />} />
      <Route path="/encrypt" element={<EncryptPage />} />
      <Route path="/docs" element={<DocumentDirectory />} />
    </Routes>
    
  );
}

export default App;

