import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import { selectIsLoggedIn, selectUserRole } from "../redux/authSlice"
import Header from "./Header"

export const ShowOnLogin=({children})=>{
        const isLoggedIn=useSelector(selectIsLoggedIn)
        if(isLoggedIn) return children
        else return null
}

export const ShowOnLogout=({children})=>{
    const isLoggedIn=useSelector(selectIsLoggedIn)
        if(isLoggedIn==false) return children
        else return null
}

export const ProtectedAdmin=({children})=>{
    const isLoggedIn=useSelector(selectIsLoggedIn)
    const role=useSelector(selectUserRole)
    if(isLoggedIn && role=="admin") return children
    else return <Navigate to='/login' replace={true}/>
}

export const Protected=({children})=>{
    const isLoggedIn=useSelector(selectIsLoggedIn)
    const role=useSelector(selectUserRole)
    if(isLoggedIn && role=="user") return children
    else return <Navigate to='/login' replace={true}/>
}


export const DefaultDashboard=({children})=>{
        return (
            <>
            <Header/>
                {children}
            </>
        )
}