export default function LandingFooter() {
  return (
    <footer className="border-t border-border bg-app-bg">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} ChatCommerce</p>
        <div className="flex items-center gap-5">
          <a className="text-brand-accent hover:underline" href="#">Privacy</a>
          <a className="text-brand-accent hover:underline" href="#">Terms</a>
        </div>
      </div>
    </footer>
  );
}
