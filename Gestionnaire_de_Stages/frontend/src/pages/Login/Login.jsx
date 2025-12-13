import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Si déjà connecté → redirect
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/stages");
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/stages");
    } catch {
      setError("Email ou mot de passe incorrect.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 via-white to-orange-50">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">

        {/* Branding */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Stage<span className="text-orange-500">Manager</span>
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            UPEC – Gestion des stages
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adresse email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="prenom.nom@u-pec.fr"
              className="
                w-full px-4 py-3 rounded-xl
                bg-gray-50 text-gray-900
                border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-orange-500
                focus:border-orange-500
                transition
              "
            />
          </div>

          {/* Mot de passe */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="
                w-full px-4 py-3 rounded-xl
                bg-gray-50 text-gray-900
                border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-orange-500
                focus:border-orange-500
                transition
              "
            />
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="
              w-full py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-red-600 to-orange-500
              hover:from-red-700 hover:to-orange-600
              shadow-md hover:shadow-lg
              transition-all duration-300
            "
          >
            Se connecter
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-6">
          © {new Date().getFullYear()} StageManager – UPEC
        </p>
      </div>
    </div>
  );
}
