import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import MyPage from "./components/mypage_components/MyPage";
import Profile from "./components/mypage_components/Profile";

function App(){

    return (
        <Router>
            <Routes>
                <Route path="/"  element={<Home />} />
                <Route path="/signup"  element={<Signup />} />
                <Route path="/login"  element={<Login />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/mypageProfile" element={<Profile />} />
            </Routes>
        </Router>
    )
}



export default App;
