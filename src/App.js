import 'bootstrap/dist/css/bootstrap.min.css';
import Dssp from "./components/Dssp";
import {Link, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import QuanLiHocSinh from "./components/QuanLiHocSinh";
import ThemMoiHocSinh from "./components/ThemMoiHocSinh";


function App() {
    return (
        <>
           <button><Link  to={'/:'}>litsProduct</Link></button>
            <button><Link to={'/Login'}>login</Link></button>
            <button><Link to={'/Register'}>Register</Link></button>
            <button><Link to={'/student'}>student</Link></button>
            <button><Link to={'/addNew'}>thêm mới</Link></button>
            <Routes>
                <Route path="/:" element={<Dssp/>}/>
                <Route path="/student" element={<QuanLiHocSinh/>}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/Register" element={<Register/>}/>
                <Route path="/addNew" element={<ThemMoiHocSinh/>}/>
            </Routes>
        </>
    );
}

export default App;
///: List product
// /register: hiện file register, trong file có 1 nút để chuyển sang trang Login
// 7:43
// 3. /login: hiện Login.js, trong này thì có 2 input để nhập username, password. Nếu username và password = "ADMIN" thì chuyển về trong /