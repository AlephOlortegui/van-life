import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const HostVans = () => {
  const [vans, setVans] = useState([]);

  useEffect(() => {
    const control = new AbortController()
    const signal = control.signal;

    const fetchVans = async () => { 
        try {
          let res = await fetch('/api/host/vans', {signal})
          let data = await res.json()
          console.log(data)
          setVans(data.vans)
        } catch (err) {
          if(err.name = "AbortError"){
            console.warn('Fetch Aborted')
          } else {
            console.error('Fetch err: ', err)
          }
        }
    }
    fetchVans()
  
    return () => {
      // cancel fetch with no errors
      control.abort()
    }
  }, [])

  const hostVansEls = vans.map(van => (
    <Link
        to={`/host/vans/${van.id}`}
        key={van.id}
        className="host-van-link-wrapper"
    >
        <div className="host-van-single" key={van.id}>
            <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
            <div className="host-van-info">
                <h3>{van.name}</h3>
                <p>${van.price}/day</p>
            </div>
        </div>
    </Link>
))

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
          {
            vans.length > 0 ? (
                <section>
                    {hostVansEls}
                </section>
            ) : ( <h2>Loading...</h2> )
          }
      </div>
    </section>
  )
}

export default HostVans