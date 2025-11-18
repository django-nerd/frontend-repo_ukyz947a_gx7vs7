import { useEffect, useState } from 'react'
import Header from '../components/Header'

export default function ProUnlockedScreen() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem('clarity_pro', 'true')
      localStorage.removeItem('freeScansUsed')
      setDone(true)
    } catch (e) {
      // ignore
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main className="px-4 py-16">
        <div className="max-w-lg mx-auto text-center bg-white border rounded-2xl p-8">
          <div className="text-4xl">🎉</div>
          <h1 className="text-2xl font-semibold mt-2">Welcome to Pro!</h1>
          <p className="text-gray-600 mt-2">Your access is now unlimited. Go back and scan anything!</p>
          <a href="/" className="inline-block mt-6 px-4 py-2 rounded-md bg-green-500 text-white font-medium hover:bg-green-600">Start Using Pro</a>
          {done && <p className="text-xs text-gray-500 mt-3">Pro activated on this device.</p>}
        </div>
      </main>
    </div>
  )
}
