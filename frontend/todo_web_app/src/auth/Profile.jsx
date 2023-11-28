import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import   axios from 'axios'
import { useDispatch} from 'react-redux'
import {  logout } from '../Slices/authSlice'





const StyledCard = styled.div`

   display : flex ; 
   position : absolute;
   flex-direction : column;
   gap :20px;
   padding :20px;
   button {
    padding: 2px ;
   }   

  `


const Profile = () => {
const dispatch = useDispatch()


const logOutUser = async () => {
  const resp= await axios.get("/api/v1/user/logout")
  console.log(resp);
  dispatch(logout())
  
}

  const navigate = useNavigate()
  return (
    <StyledCard>
    <button onClick={() => { navigate('/new')  }} >Profile</button>
    <button onClick={logOutUser} > Logout </button>
    </StyledCard>
  )
}

export default Profile