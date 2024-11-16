
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/singupcard";
import Login from "./components/logincard";
import Dashboard from "./components/dashboard";
import ProfileEdit from "./components/profileEditpage";




const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile-edit" element={<ProfileEdit/>} />
        <Route path="/" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
};

export default App;
