const listeners = new Set();
const state = {
  toasts: [],
};

let toastId = 0;

function emit() {
  const snapshot = [...state.toasts];
  listeners.forEach((listener) => listener(snapshot));
}

export function subscribeToToasts(listener) {
  listeners.add(listener);
  listener([...state.toasts]);

  return () => {
    listeners.delete(listener);
  };
}

export function dismissToast(id) {
  state.toasts = state.toasts.filter((toast) => toast.id !== id);
  emit();
}

export function showToast({ type = 'info', message = '' }) {
  const id = ++toastId;

  state.toasts = [...state.toasts, { id, type, message }];
  emit();

  window.setTimeout(() => {
    dismissToast(id);
  }, 3600);

  return id;
}
