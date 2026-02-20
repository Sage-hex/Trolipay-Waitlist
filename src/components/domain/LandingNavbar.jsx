import Button from '../ui/Button.jsx';

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function LandingNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-app-bg/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="text-lg font-semibold tracking-tight text-text">
          ChatCommerce
        </a>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => scrollToId('demo')}>
            Request demo
          </Button>
          <a href="/auth/login">
            <Button>Login</Button>
          </a>
        </div>
      </nav>
    </header>
  );
}
