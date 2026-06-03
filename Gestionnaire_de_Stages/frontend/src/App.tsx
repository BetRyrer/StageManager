import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import type { JSX } from "react";

import Stages from "./features/stages/pages/Stages";
import Etudiant from "./features/etudiant/pages/Etudiant";
import Header from "./features/common/Header";
import Footer from "./features/common/Footer";
import MailSender from "./features/emails/pages/MailSender";
import StageListByStatus from "./features/stages/pages/StageListByStatus";
import ProtectedRoute from "./features/common/ProtectedRoute";
import Login from "./features/login/pages/Login";
import TuteursPage from "./features/tuteurs/pages/TuteursPage";
import SoutenancePage from "./features/soutenances/pages/SoutenancePage";

function AppContent(): JSX.Element {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Header />}

      <main>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/stages" element={<Stages />} />

            <Route
              path="/stages/status/:status"
              element={<StageListByStatus />}
            />

            <Route path="/etudiant" element={<Etudiant />} />

            <Route path="/mailsender" element={<MailSender />} />

            <Route path="/tuteurs" element={<TuteursPage />} />

            <Route
              path="/soutenances"
              element={<SoutenancePage />}
            />
          </Route>
        </Routes>
      </main>

      {!isLoginPage && <Footer />}
    </>
  );
}

function App(): JSX.Element {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;