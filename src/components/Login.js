import App from "../App"
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export default function Login(){
    let naviget = useNavigate();
    let [user, setUser] = useState('');
    let [pass, setPass] = useState('');
    let [error, setError] = useState('');
    function nhap(){
        if(user === 'ADMIN' || pass ==='ADMIN'){naviget('/:')}
        else {
            setError( "nhập không đúng")
        }
    }

    return (
        <>
            <input type="text" onChange={(e) => {setUser(e.target.value)}} />
            <input type="text" onChange={(e) => {setPass(e.target.value)}} />
            <button onClick={() => nhap()}>đi</button>
            {error && <p>{error}</p>}
        </>
    );
}