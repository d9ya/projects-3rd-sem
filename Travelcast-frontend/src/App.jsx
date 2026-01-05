import{BrowserRouter as Router, Routes,Route} from"react-router-dom";
import Registerpage from"./pages/Registerpage";
import LoginPage from "./pages/Loginpage";
import Securitypage from"./pages/Securitypage";
import Packing from "./pages/Packing";

function App() {
 
  return (
<Router>
  <Routes>
    <Route path="/Register" element={<Registerpage/>} />``
        <Route path="/Login" element={<LoginPage/>} />``
        <Route path="/Security" element={<Securitypage/>} />``
        <Route path="/Packing" element={<Packing/>} />``
  </Routes>
</Router>

  )

}
 
export default App;

 