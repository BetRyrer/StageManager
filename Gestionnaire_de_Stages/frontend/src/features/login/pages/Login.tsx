import { useLogin } from "../hooks/useLogin";
import AuthInput from "../components/AuthInput";

export default function Login() {
    const {
        email,
        setEmail,
        password,
        setPassword,
        error,
        handleSubmit,
    } = useLogin();

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-orange-50 px-4">
            <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl">

                {/* Branding */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        Stage<span className="text-orange-500">Manager</span>
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        UPEC – Gestion des stages
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <p className="mb-4 text-center text-sm text-red-500">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    <AuthInput
                        label="Adresse email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="prenom.nom@u-pec.fr"
                    />

                    <AuthInput
                        label="Mot de passe"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />

                    <button
                        type="submit"
                        className="
                            w-full rounded-xl bg-gradient-to-r
                            from-red-600 to-orange-500 py-3 font-semibold text-white
                            shadow-md transition-all duration-300
                            hover:from-red-700 hover:to-orange-600 hover:shadow-lg
                        "
                    >
                        Se connecter
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-6 text-center text-xs text-gray-400">
                    © {new Date().getFullYear()} StageManager – UPEC
                </p>
            </div>
        </div>
    );
}