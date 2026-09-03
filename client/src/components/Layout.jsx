import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <header className="border-b border-gray-100 px-6 py-3.5 bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="font-bold text-lg text-gray-900 no-underline tracking-tight hover:opacity-80 transition"
          >
            EMI Store
          </Link>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
