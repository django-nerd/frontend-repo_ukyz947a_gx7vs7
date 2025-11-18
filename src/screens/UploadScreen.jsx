import Header from '../components/Header'
import UploadBox from '../components/UploadBox'

export default function UploadScreen({ onImage }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main className="px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <UploadBox onImageSelected={onImage} />
        </div>
      </main>
    </div>
  )
}
