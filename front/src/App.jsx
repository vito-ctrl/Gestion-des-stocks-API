import Admin from './Admin'
import StockList from './StockList'
// import Popup from './Popup'
import './App.css'
import { useState } from 'react'

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <Admin/>
      <StockList/>
    </>
  )
}

export default App