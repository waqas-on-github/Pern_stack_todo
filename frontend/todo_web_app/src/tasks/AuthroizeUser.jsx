import  {Outlet} from "react-router-dom"
import {useSelector} from "react-redux"


const AuthroizeUser = () => {
const user = useSelector((state) => state?.auth?.userInfo)
  return (
       <>  
       {user?<Outlet/> : <h1>Login or Signup</h1>}

       
       </>
  )
}

export default AuthroizeUser