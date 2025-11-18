import { useState } from 'react'
import UploadScreen from './screens/UploadScreen'
import SelectScreen from './screens/SelectScreen'

function App() {
  const [image, setImage] = useState(null)

  if (!image) {
    return <UploadScreen onImage={setImage} />
  }

  return <SelectScreen image={image} />
}

export default App
