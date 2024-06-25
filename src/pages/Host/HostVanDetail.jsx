import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const HostVanDetail = () => {
  const {id} = useParams()
  const [currentVan, setCurrentVan] = useState(null)

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
      </div>
    </section>
  )
}

export default HostVanDetail