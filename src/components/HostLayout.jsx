import { NavLink, Outlet } from "react-router-dom"

export default function HostLayout() {

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <>
            <nav className="host-nav">
                {/* . means the same route to="/host" = "." because its relative route */}
                <NavLink to="." end style={({isActive}) =>  isActive ? activeStyles : null }>Dashboard</NavLink>
                {/* end the matching here "dont count / then host then index or income or review"
                the purpose of end its to remove the 2 active class we have */}

                {/* removing /host/ from Navlinks below
                /host/ income or vans or reviews */}
                <NavLink to="income" style={({isActive}) =>  isActive ? activeStyles : null }>Income</NavLink>
                <NavLink to="vans" style={({isActive}) =>  isActive ? activeStyles : null }>Vans</NavLink>
                <NavLink to="reviews" style={({isActive}) =>  isActive ? activeStyles : null }>Reviews</NavLink>
            </nav>
            <Outlet />
        </>
    )
}