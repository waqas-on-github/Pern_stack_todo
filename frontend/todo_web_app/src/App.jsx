import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateAccount from "./auth/CreateAccount";
import Nav from "./menus/Nav";
import Login from "./auth/Login";
import UpdateAccount from "./auth/UpdateAccount";
import AuthroizeUser from "./tasks/AuthroizeUser";
import { CreateTask }from './tasks/CreateTask'
import Showtask from './tasks/Showtask'
import OneTask from "./tasks/OneTask";
import Trash from "./trash/Trash";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route path="auth/signup" element={<CreateAccount />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/update" element={<UpdateAccount />} />
           <Route path="task" element={<AuthroizeUser />}> 
             <Route path="new" element={<CreateTask/>} /> 
             <Route path="show" element={<Showtask/>} > 
                <Route path="tasks" element= {<OneTask/>}/>
                 <Route path="trash" element= {<Trash/>}/>
             
             </Route> 

           </Route>

    
           
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
