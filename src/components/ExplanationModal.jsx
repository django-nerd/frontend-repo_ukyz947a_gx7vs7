import { useEffect, useState } from 'react'

export default function ExplanationModal({ open, onClose, text, onShownForFreeUser }) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    if (!open) return
    const fetchExplanation = async () => {
      setLoading(true)
      setData(null)
      try {
        // If provided, notify parent to increment free count when shown for non-pro
        onShownForFreeUser?.()

        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/explain`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text })
        })
        const json = await res.json()
        setData(json)
      } catch (e) {
        setData({ original: text, explanation: 'Failed to fetch explanation. Please try again.' })
      } finally {
        setLoading(false)
      }
    }
    fetchExplanation()
  }, [open, text])

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <div className={`absolute inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-2xl p-4 shadow-xl transition-transform ${open ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Clarity</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-900">Close</button>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded p-3">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Original Text</p>
              <p className="text-gray-800 text-sm whitespace-pre-wrap">{text}</p>
            </div>
            <div className="bg-white rounded p-3 border">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Clarity</p>
              {loading ? (
                <p className="text-sm text-gray-600">Thinking…</p>
              ) : (
                <p className="text-gray-900 text-sm whitespace-pre-wrap">{data?.explanation}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
