import{BrowserRouter as Router, Routes,Route} from"react-router-dom";
import Registerpage from"./pages/Registerpage";
import LoginPage from "./pages/Loginpage";



function App() {
 
  return (
<Router>
  <Routes>
    <Route path="/Register" element={<Registerpage/>} />``
   
        <Route path="/Login" element={<LoginPage/>} />``
  </Routes>
</Router>

  )

}
 
export default App;

 