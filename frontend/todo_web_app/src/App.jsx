import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateAccount from "./auth/CreateAccount";
import Nav from "./menus/Nav";
import Login from "./auth/Login";
import UpdateAccount from "./auth/UpdateAccount";
import { CreateTask } from "./tasks/CreateTask";
import AuthroizeUser from "./tasks/AuthroizeUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav/>}>
        <Route path="auth/signup" element={<CreateAccount />} />
        <Route path="auth/login"  element={<Login/>}/>
        <Route path="auth/update" element ={<UpdateAccount/>} />
      </Route>

        <Route element={<AuthroizeUser/>}>
         <Route path="/task/new" element= {<CreateTask/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
