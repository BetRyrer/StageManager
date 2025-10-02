import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, ...toast }]);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed top-4 right-4 space-y-3 z-50">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

function Toast({ type, title, text, onClose }) {
  const styles = {
    success: "bg-green-100 text-green-700 border-green-400",
    error: "bg-red-100 text-red-700 border-red-400",
    loading: "bg-blue-100 text-blue-700 border-blue-400",
  };

  const icons = {
    success: "✅",
    error: "❌",
  };

  return (
    <div
      className={`flex items-start gap-3 border-l-4 p-4 rounded shadow ${styles[type]}`}
    >
      <span className="text-lg">{icons[type]}</span>
      <div className="flex-1">
        <p className="font-semibold">{title}</p>
        <p className="text-sm">{text}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-2 text-gray-500 hover:text-gray-800"
      >
        ✕
      </button>
    </div>
  );
}
