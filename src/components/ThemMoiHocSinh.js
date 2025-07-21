import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function ThemMoiHocSinh() {
    let naviget = useNavigate();
    const [newHS, setNewHS] = useState({name:'' ,class:'',gpa:0});

    function saveAddNew(){
        setNewHS({name: '',class: '',gpa: 0})
        axios.post('http://localhost:3456/students', newHS).then(x=>  {naviget('/addNew')
            })
    }

    function handleAddNew(e){
        setNewHS({...newHS, [e.target.name]: e.target.value});
    }
    return(
        <>
            <h3>Add New Page</h3>
            <input type="text" value={newHS.name} name={'name'} onChange={handleAddNew} placeholder={'nhập tên'}/>
            <input type="text" value={newHS.class} name={'class'} onChange={handleAddNew} placeholder={'nhập lớp'}/>
            <input type="text" value={newHS.gpa} name={'gpa'} onChange={handleAddNew} placeholder={'nhập điểm'}/>
            <button onClick={() => {saveAddNew()}}>thêm</button>
        </>
    )
}