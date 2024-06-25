import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function VanDetail() {
  const {id} = useParams()
  const [van, setVan] = useState(null)
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchVan = async () => { 
      try {
        let res = await fetch(`/api/vans/${id}`, {signal})
        let data = await res.json()
        console.log(data)
        setVan(data.vans)
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
  
  return (
    <div className="van-detail-container">
    {van ? (
            <div className="van-detail">
                <img alt={van.name} src={van.imageUrl} />
                <i className={`van-type ${van.type} selected`}>
                    {van.type}
                </i>
                <h2>{van.name}</h2>
                <p className="van-price"><span>${van.price}</span>/day</p>
                <p>{van.description}</p>
                <button className="link-button">Rent this van</button>
            </div>
        ) : <h2>Loading...</h2>}
    </div>
  )
}