import  {Outlet} from "react-router-dom"
import {useSelector} from "react-redux"
import {SideMenu } from "./SideMenu"
import styled from 'styled-components'
const StyledMain = styled.div`
  display : flex ;
.main {
  width : 100%;
}
`

const AuthroizeUser = () => {
const user = useSelector((state) => state?.auth?.userInfo)
  return (
       <StyledMain>  
       
       {user?  <SideMenu/>  : <h1>Login or Signup</h1>}
       <div className="main" >
       <Outlet/>
       </div>
       </StyledMain>
  )
}

export default AuthroizeUser