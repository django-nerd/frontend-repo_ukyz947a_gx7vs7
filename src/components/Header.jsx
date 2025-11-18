import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between py-4 px-4 sm:px-6 border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-md bg-blue-600 text-white grid place-items-center font-bold">C</div>
        <div className="leading-tight">
          <p className="font-semibold text-gray-900">Clarity</p>
          <p className="text-xs text-gray-500">From Complex to Clear</p>
        </div>
      </Link>
      <nav className="flex items-center gap-3 text-sm">
        <Link to="/pro-unlocked" className="text-gray-600 hover:text-gray-900">Pro</Link>
        <a href="/" className="hidden sm:inline-block text-gray-600 hover:text-gray-900">Start Over</a>
      </nav>
    </header>
  )
}
