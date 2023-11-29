import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "../genralui/Avatar";
import { useState } from "react";
import Profile from "../auth/Profile";
import { useNavigate } from "react-router-dom";

// ui 
import { StyledNav } from "../ui/StyledNav";


function Nav() {

  const user = useSelector((state) => state?.auth?.userInfo);
  const [clicked, setclicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setclicked(!clicked);
  };

  const register = () => {
    navigate("/auth/signup")
  }
  
 const login = () => {
  navigate("/auth/login")
 }


  return (
    <>
      <StyledNav>
        <h1>Todoist</h1>

        {user ? (
          <div className="userinfo">
            <button onClick={handleClick}>
              <Avatar username={user?.name} />
            </button>
            {clicked && <Profile />}
          </div>
        ) : (

          <div className ="btn-parent" >
            <button className = "login"
            onClick={login}
            >Log in</button>
          
            <button className = "register"
              onClick={register}
            >
              Start for free
            </button>
          </div>
        )}
      </StyledNav>


      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Nav;
