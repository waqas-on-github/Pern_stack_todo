import {Outlet} from 'react-router-dom'
import Styled from 'styled-components'



const StyledNav =Styled.nav`

border : 1px solid red ;
padding :10px ;
display : flex ;
justify-content:space-between ;




` 

const StyledUl = Styled.ul`
  display: flex;
  justify-content:space-between ;
  
`




function Nav() {


  return (
  <> 
  <StyledNav> 
  <span>logo</span>
  <StyledUl>
    <li>Home </li>
    <li>About</li>

  </StyledUl>
  <div>User info </div>
  </StyledNav>
  
  <div>
  <Outlet/>
  </div>
  </>
 
  )
}

export default Nav