import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Logged from './Logged';

function App() {
  return (
    <Router>
    <div className="app">
      <Routes>
        <Route exact path= "/" element= {<Login/>}></Route>
        <Route exact path= "/register" element= {<Register/>}></Route>
        <Route exact path= "/logged" element= {<Logged/>}></Route>
        <Route path= "*" element= {<Login/>}></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
