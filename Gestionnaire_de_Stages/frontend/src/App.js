import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Stages from "./pages/Stages/Stages";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Stages" element={<Stages />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
