import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
// import Login from "./pages/login" ;  // importing pages here to use them in the
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile"


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
