import { Routes, Route, useLocation, HashRouter } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import SelectPage from './pages/SelectPage/SelectPage'
import Order from './pages/Order/Order'
import Cart from './pages/Cart/Cart'
import Payment from './pages/Payment/Payment'
import Confirmation from './pages/Confirmation/Confirmation'
import AnimatedPageWrapper from './components/AnimatedPageWrapper/AnimatedPageWrapper'
import { AnimatePresence } from 'framer-motion'
import { ShopProvider } from './ShopContext'
import Footer from './components/Footer/Footer'

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <AnimatedPageWrapper><Homepage /></AnimatedPageWrapper>
        } />

        <Route path="/select-base" element={<>
          <AnimatedPageWrapper>
            <SelectPage step="base" />
          </AnimatedPageWrapper>
          <Footer className="select-page__footer" activePage="SelectPage" />
        </>} />

        <Route path="/select-topping" element={<>
          <AnimatedPageWrapper>
            <SelectPage step="topping" />
          </AnimatedPageWrapper>
          <Footer className="select-page__footer" activePage="SelectPage" />
        </>} />

        <Route path="/select-extra" element={<>
          <AnimatedPageWrapper>
            <SelectPage step="extra" />
          </AnimatedPageWrapper>
          <Footer className="select-page__footer" activePage="SelectPage" />
        </>} />

        <Route path="/order" element={<AnimatedPageWrapper><Order /></AnimatedPageWrapper>} />

        <Route path="/cart" element={<>
          <AnimatedPageWrapper><Cart /></AnimatedPageWrapper>
          <Footer className="select-page__footer" activePage="Cart" />
        </>} />

        <Route path="/payment" element={<AnimatedPageWrapper><Payment /></AnimatedPageWrapper>} />

        <Route path="/confirmation" element={<AnimatedPageWrapper><Confirmation /></AnimatedPageWrapper>} />
      </Routes>
    </AnimatePresence>
  )
}


function App() {
  return (
    <div className="App">
      <ShopProvider>
        <HashRouter>
          <AnimatedRoutes />
        </HashRouter>
      </ShopProvider>
    </div>
  )
}

export default App
