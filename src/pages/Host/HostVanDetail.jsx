import { useEffect, useState } from "react"
import { Link, NavLink, Outlet, useParams } from "react-router-dom"

const HostVanDetail = () => {
  const {id} = useParams()
  const [currentVan, setCurrentVan] = useState(null)

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchVan = async () => { 
      try {
        let res = await fetch(`/api/host/vans/${id}`, {signal})
        let data = await res.json()
        // Changed on server.js
        console.log(data) // console.log(data.vans[0])
        setCurrentVan(data.vans) // setCurrentVan(data.vans[0])
      } catch (err) {
        if(err.name === 'AbortError'){
          console.warn('Fetch Aborted');
        } else {
          console.error('Fetch err: ', err)
        }
      }
     }
  
    fetchVan();

    return () => {
      controller.abort()
    }
  }, [id])
  
if (!currentVan) {
  return <h1>Loading...</h1>
}

return (
    <section>

      <Link to='..' relative="path" className="back-button">&larr; <span>Back to all vans</span></Link>

      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img src={currentVan.imageUrl} />
          <div className="host-van-detail-info-text">
              <i className={`van-type van-type-${currentVan.type}`}>
                  {currentVan.type}
              </i>
              <h3>{currentVan.name}</h3>
              <h4>${currentVan.price}/day</h4>
          </div>
        </div>

        <nav className="host-van-detail-nav">
                    <NavLink
                        to="."
                        end
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >
                        Details
                    </NavLink>
                    <NavLink
                        to="pricing"
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >
                        Pricing
                    </NavLink>
                    <NavLink
                        to="photos"
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >
                        Photos
                    </NavLink>
                </nav>

        <Outlet context={{ currentVan }}/>

      </div>
    </section>
  )
}

export default HostVanDetail