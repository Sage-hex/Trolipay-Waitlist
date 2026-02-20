import { useEffect, useState } from 'react';
import { dismissToast, subscribeToToasts } from './toastStore.js';

const TYPE_STYLES = {
  info: 'border-border bg-card-bg text-text',
  success: 'border-brand-accent/40 bg-card-bg text-text',
  warning: 'border-yellow-400/40 bg-card-bg text-text',
  error: 'border-red-400/40 bg-card-bg text-text',
};

export default function ToastViewport() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => subscribeToToasts(setToasts), []);

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex w-full max-w-sm flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto rounded-xl border px-4 py-3 shadow-sm ${TYPE_STYLES[toast.type] ?? TYPE_STYLES.info}`}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm leading-relaxed">{toast.message}</p>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="rounded-sm px-1 text-text-muted transition hover:text-text"
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
