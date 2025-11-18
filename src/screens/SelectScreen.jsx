import { useEffect, useState } from 'react'
import Header from '../components/Header'
import ImagePreview from '../components/ImagePreview'
import LoadingSpinner from '../components/LoadingSpinner'
import TextBlockList from '../components/TextBlockList'
import ExplanationModal from '../components/ExplanationModal'
import PaywallModal from '../components/PaywallModal'

function fakeOcr(imageUrl) {
  // Demo OCR: split into example blocks
  const sample = [
    'Pursuant to the agreement herein, the lessee shall utilize the premises in a manner commensurate with standard practices.',
    'Notwithstanding the aforementioned, the lessor reserves the right to terminate upon notice.',
    'Our methodology aims to facilitate outcomes and mitigate risks.'
  ]
  return new Promise((resolve) => setTimeout(() => resolve(sample), 1000))
}

export default function SelectScreen({ image }) {
  const [blocks, setBlocks] = useState([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(null)
  const [showExplain, setShowExplain] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)

  // Usage state
  const [isPro, setIsPro] = useState(false)
  const [freeScans, setFreeScans] = useState(0)

  // On mount: load pro + free counts
  useEffect(() => {
    const pro = localStorage.getItem('clarity_pro') === 'true'
    setIsPro(pro)
    if (!pro) {
      const used = Number(localStorage.getItem('freeScansUsed') || '0')
      setFreeScans(Number.isNaN(used) ? 0 : used)
    }
  }, [])

  // Fetch OCR on image change
  useEffect(() => {
    if (!image?.url) return
    setLoading(true)
    fakeOcr(image.url).then((res) => {
      setBlocks(res)
      setLoading(false)
    })
  }, [image])

  const onTextBlockClick = (text) => {
    setSelected(text)
    if (isPro) {
      setShowExplain(true)
      return
    }
    if (freeScans < 5) {
      // Increment immediately before opening explanation
      const next = freeScans + 1
      localStorage.setItem('freeScansUsed', String(next))
      setFreeScans(next)
      setShowExplain(true)
    } else {
      setShowPaywall(true)
    }
  }

  // For safety: ensure count increments when modal actually opens for non-pro
  const handleShownForFreeUser = () => {}

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main className="px-4 py-4 space-y-6">
        <ImagePreview src={image?.url} />

        <div className="max-w-2xl mx-auto w-full">
          {loading ? (
            <div className="flex justify-center py-10">
              <LoadingSpinner label="Running OCR…" />
            </div>
          ) : (
            <TextBlockList blocks={blocks} onSelect={onTextBlockClick} />
          )}
        </div>
      </main>

      <ExplanationModal
        open={showExplain}
        onClose={() => setShowExplain(false)}
        text={selected || ''}
        onShownForFreeUser={!isPro ? handleShownForFreeUser : undefined}
      />

      <PaywallModal
        open={showPaywall}
        onClose={() => setShowPaywall(false)}
      />
    </div>
  )
}
