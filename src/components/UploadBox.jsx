import { useRef } from 'react'

export default function UploadBox({ onImageSelected }) {
  const inputRef = useRef(null)

  const handleSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    onImageSelected({ file, url })
  }

  return (
    <div className="w-full max-w-md mx-auto border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-white">
      <p className="text-gray-800 font-medium mb-2">Upload a document photo</p>
      <p className="text-gray-500 text-sm mb-6">We’ll extract text and make it easy to understand.</p>
      <div className="flex items-center justify-center gap-3">
        <button
          className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700"
          onClick={() => inputRef.current?.click()}
        >
          Choose Image
        </button>
        <input ref={inputRef} type="file" accept="image/*" onChange={handleSelect} className="hidden" />
      </div>
    </div>
  )
}
