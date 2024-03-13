import { Navigate, useNavigate } from "react-router-dom"

export const ShowOnLogin=({children})=>{
    if(sessionStorage.getItem("auth") !=null){
        let obj=JSON.parse(sessionStorage.getItem("auth"))
        if(obj.isLoggedIn) return children
        else return null
    }
}

export const ShowOnLogout=({children})=>{
    if(sessionStorage.getItem("auth") == null) return children
    else null
}

export const ProtectedAdmin=({children})=>{
    if(sessionStorage.getItem("auth") !=null){
        let obj=JSON.parse(sessionStorage.getItem("auth"))
        if(obj.isLoggedIn && obj.role=="admin") return children
        else return <Navigate to='/login' replace={true}/>
    }
    else return <Navigate to='/login' replace={true}/>

}

export const Protected=({children})=>{
    if(sessionStorage.getItem("auth") !=null){
        let obj=JSON.parse(sessionStorage.getItem("auth"))
        if(obj.isLoggedIn && obj.role=="user") return children
        else return <Navigate to='/login' replace={true}/>
    }
    else return <Navigate to='/login' replace={true}/>

}
