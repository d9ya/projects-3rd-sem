import{BrowserRouter as Router, Routes,Route} from"react-router-dom";
import Registerpage from"./pages/Registerpage";
import LoginPage from "./pages/Loginpage";
import Subscriptionpage from "./pages/Subscriptionpage";

function App() {
 
  return (
<Router>
  <Routes>
    <Route path="/Register" element={<Registerpage/>} />``
        <Route path="/Login" element={<LoginPage/>} />``
         <Route path="/subscription" element={<Subscriptionpage/>} />``
  </Routes>
</Router>

  )

}
 
export default App;

 