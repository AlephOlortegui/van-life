import { useEffect, useState } from "react"
import {Link} from "react-router-dom"

const Vans = () => {
  const [vans, setVans] = useState([])
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        let res = await fetch('/api/vans', {signal})
        let data = await res.json()
        console.log(data)
        setVans(data.vans) // Actualizar el estado con los datos obtenidos
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Fetch error:', err);
        }
      }
    }

    fetchData() 
  
    return () => {
      console.log('return statement')
      controller.abort();
    }
  }, [])

  const vanElements = vans.map(van => (
    <div key={van.id} className="van-tile">
        <Link to={`/vans/${van.id}`}>
          <img alt={van.name} src={van.imageUrl} />
          <div className="van-info">
              <h3>{van.name}</h3>
              <p>${van.price}<span>/day</span></p>
          </div>
          <i classN ame={`van-type ${van.type} selected`}>{van.type}</i>
        </Link>
    </div>
  ))
  
  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list">
          {vanElements}
      </div>
    </div>
  )
}

export default Vans