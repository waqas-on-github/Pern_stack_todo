import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateAccount from "./auth/CreateAccount";
import Nav from "./menus/Nav";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav/>}>
        <Route path="new" element={<CreateAccount />} />
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
