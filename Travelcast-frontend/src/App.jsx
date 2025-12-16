import{BrowserRouter as Router, Routes,Route} from"react-router-dom";
import Registerpage from"./pages/Registerpage";



function App() {
 
  return (
<Router>
  <Routes>
    <Route path="/Register" element={<Registerpage/>} />``
   
  </Routes>
</Router>

  )

}
 
export default App;

 