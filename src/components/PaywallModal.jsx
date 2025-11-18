export default function PaywallModal({ open, onClose, priceLabel = "Unlock Unlimited Access: ₦2,000", payUrl = "https://selar.co/your-product" }) {
  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <div className={`absolute inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-2xl p-4 shadow-xl transition-transform ${open ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Upgrade</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-900">Close</button>
          </div>
          <div className="space-y-3">
            <div className="rounded p-3 bg-purple-50 border border-purple-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-1">You're out of free scans!</h4>
              <p className="text-sm text-gray-700">Clarity is powered by advanced AI, which is expensive to run. Please support this project to unlock unlimited explanations.</p>
            </div>
            <div className="flex justify-center">
              <a href={payUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700">
                {priceLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
