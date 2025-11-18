export default function ImagePreview({ src }) {
  if (!src) return null
  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-xl overflow-hidden border border-gray-200">
      <img src={src} alt="Uploaded" className="w-full object-contain max-h-80" />
    </div>
  )
}
