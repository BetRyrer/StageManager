import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Stages from "./pages/Stages/Stages";
import StageDetail from "./pages/Stages/StageDetail";
import Etudiant from "./pages/Etudiants/Etudiant";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MailSender from "./pages/Emails/MailSender";
import StageListByStatus from "./pages/Stages/StageListByStatus";
import { ToastProvider } from "./components/Toasts/ToastProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login/Login";

function App() {
  return (
    <ToastProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            {/* Route publique */}
            <Route path="/login" element={<Login />} />

            {/* Toutes les autres routes sont protégées */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/stages" element={<Stages />} />
                    <Route path="/stages/:id" element={<StageDetail />} />
                    <Route
                      path="/stages/status/:status"
                      element={<StageListByStatus />}
                    />
                    <Route path="/etudiant" element={<Etudiant />} />
                    <Route path="/mailsender" element={<MailSender />} />
                  </Routes>
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ToastProvider>
  );
}

export default App;
