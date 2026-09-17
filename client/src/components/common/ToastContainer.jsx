import React from "react";
import { useStore } from "../../context/StoreContext";

export const ToastContainer = () => {
  const { toasts } = useStore();

  if (!toasts.length) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} className={`toast-message ${t.type}`}>
          <i
            className={
              t.type === "success"
                ? "fa-solid fa-circle-check"
                : "fa-solid fa-circle-exclamation"
            }
          ></i>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
};
