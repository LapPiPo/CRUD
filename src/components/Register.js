import {Link, useNavigate} from "react-router-dom";

export default function Register() {
    let naviget = useNavigate();
    return (
        <>
        <h2>Register page</h2>
        <button onClick={() => {naviget('/Login')}}>Login</button>
        </>
    )
}