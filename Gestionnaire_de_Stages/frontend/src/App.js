import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Header />}

      <main>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/stages" element={<Stages />} />
                  <Route path="/stages/:id" element={<StageDetail />} />
                  <Route path="/stages/status/:status" element={<StageListByStatus />} />
                  <Route path="/etudiant" element={<Etudiant />} />
                  <Route path="/mailsender" element={<MailSender />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {!isLoginPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <ToastProvider>
      <Router>
        <AppContent />
      </Router>
    </ToastProvider>
  );
}

export default App;
