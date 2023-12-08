import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";


const Test = () => {
    const navigate = useNavigate()
  return (
    <div>

        <button onClick={() => {navigate("/outh/new")}} >click</button>

        <div> 
         
      <Outlet/>
        </div>
    </div>
  )
}

export default Test