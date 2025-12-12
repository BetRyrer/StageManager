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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#8b0000] via-[#ff4500] to-[#ff8c00] px-4">

      {/* Carte Glass */}
      <div className="relative w-full max-w-md rounded-2xl p-8 bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20">

        {/* Glow */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 opacity-30 blur-xl"></div>

        <div className="relative">
          {/* Branding */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-white tracking-wide">
              Stage<span className="text-orange-400">Manager</span>
            </h1>
            <p className="text-sm text-gray-200 mt-2">
              UPEC – Gestion des stages
            </p>
          </div>

          {error && (
            <p className="text-red-300 text-sm mb-4 text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-200 mb-1">
                Adresse email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full px-4 py-3 rounded-xl
                  bg-black/40 text-white
                  border border-white/20
                  focus:outline-none focus:ring-2 focus:ring-orange-500
                  transition
                "
                placeholder="prenom.nom@u-pec.fr"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-200 mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full px-4 py-3 rounded-xl
                  bg-black/40 text-white
                  border border-white/20
                  focus:outline-none focus:ring-2 focus:ring-orange-500
                  transition
                "
                placeholder="••••••••"
              />
            </div>

            {/* Bouton */}
            <button
              type="submit"
              className="
                w-full py-3 rounded-xl font-semibold text-white
                bg-gradient-to-r from-red-600 to-orange-500
                hover:from-red-700 hover:to-orange-600
                shadow-lg hover:shadow-orange-500/40
                transition-all duration-300
              "
            >
              Se connecter
            </button>
          </form>

          {/* Footer */}
          <p className="text-xs text-gray-300 text-center mt-6">
            © {new Date().getFullYear()} StageManager – UPEC
          </p>
        </div>
      </div>
    </div>
  );
}
