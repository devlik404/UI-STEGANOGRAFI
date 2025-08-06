import "./App.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Dashboard from "./pages/dashboardPage";
import EncryptPage from "./pages/encryptPage";
import DecryptPage from "./pages/decryptPage";
import DocumentDirectory from "./pages/documentsPage";
import FoldersPage from "./pages/foldersPage";

function App() {

  return (

    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/main" element={<Dashboard />} />
      <Route path="/decrypt" element={<DecryptPage />} />
      <Route path="/encrypt" element={<EncryptPage />} />
      <Route path="/docs" element={<DocumentDirectory />} />
      <Route path="/folders" element={<FoldersPage />} />
    </Routes>

  );
}

export default App;

