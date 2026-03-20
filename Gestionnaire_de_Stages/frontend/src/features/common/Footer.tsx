import type { JSX } from "react";

function Footer(): JSX.Element {
  return (
    <footer className="bg-gray-100 border-t mt-10">
      <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} - Mon Gestionnaire de Stages
      </div>
    </footer>
  );
}

export default Footer;