import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Vans from './pages/Vans/Vans'
import VanDetail from './pages/Vans/VanDetail'
import Layout from './components/Layout'
import Dashboard from './pages/Host/Dashboard'
import Reviews from './pages/Host/Reviews'
import Income from './pages/Host/Income'
import HostLayout from './components/HostLayout'
import HostVans from './pages/Host/HostVans'
import HostVanDetail from './pages/Host/HostVanDetail'


function App() {

  return (
    <>
     <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path="about" element={<About />}/>
        <Route path="vans" element={<Vans />}/>
        <Route path="vans/:id" element={<VanDetail />} />

        <Route path="host" element={<HostLayout />}>
          <Route index element={<Dashboard />} />
          {/* index = (like a default child route). */}
          <Route path="income" element={<Income />}/>
          <Route path="reviews" element={<Reviews />}/>
          <Route path="vans" element={<HostVans />}/>
          <Route path="vans/:id" element={<HostVanDetail />}/>
        </Route>
      </Route>
     </Routes>
    </>
  )
}

export default App
