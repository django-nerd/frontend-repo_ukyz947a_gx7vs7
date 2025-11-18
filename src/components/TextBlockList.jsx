export default function TextBlockList({ blocks, onSelect }) {
  if (!blocks?.length) return null
  return (
    <div className="space-y-3">
      {blocks.map((b, i) => (
        <button
          key={i}
          onClick={() => onSelect(b)}
          className="w-full text-left p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <p className="text-sm text-gray-800 line-clamp-3">{b}</p>
        </button>
      ))}
    </div>
  )
}
