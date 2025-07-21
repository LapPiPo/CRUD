import {useEffect, useState} from "react";
import axios from "axios";
import './student.css'

export default function QuanLiHocSinh (){
    const [hocSinh, setHocSinh] = useState([]);
    const [danhSachLop, setDanhSachLop] = useState([]);
    const [lopDuocChon, setLopDuocChon] = useState('');
    const [tangGiamGpa, setTangGiamGpa] = useState('');
    const [detail, setDetail] = useState(null);
    const [edit,setEdit] = useState(null);
    const [newHS, setNewHS] = useState({name:'' ,class:'',gpa:0});
    useEffect(()=>{loadData()},[])
    function loadData(){
        axios.get('http://localhost:3456/students').then(response => {
            let list = response.data;
            console.log(response.data);
            let filterList = [...new Set(list.map(item => item.class))];
            setDanhSachLop(filterList)
            setHocSinh(list)
        })
    }
    function filterHS(hocSinh){
       let fitered = [...hocSinh];
        if(lopDuocChon)
        {fitered = fitered.filter(student => student.class === lopDuocChon)}

        if(tangGiamGpa === 'tang'){
            fitered.sort((a,b) => a.gpa - b.gpa);
        }
        if(tangGiamGpa === 'giam'){
            fitered.sort((a,b) => b.gpa - a.gpa);
        }
        return fitered
}

    function handleEdit(e){
        setEdit({...edit, [e.target.name]: e.target.value});
    }

    function saveEdit(){
        axios.put('http://localhost:3456/students/' + edit.id, edit).then(x => loadData())
    }

    function handleAddNew(e){
        setNewHS({...newHS, [e.target.name]: e.target.value});
    }

    function saveAddNew(){
        axios.post('http://localhost:3456/students', newHS).then(x=>  {loadData()
        setNewHS({name: '',class: '',gpa: 0})})
    }

    function deleteHS(id){
        axios.delete('http://localhost:3456/students/' + id ).then(x => {loadData()})
    }

    // json-server --watch duLieu.json --port 3456
    return(
        <>
            <div className={'container1'}>
                <div className={'main'}>
                    <input type="text" value={newHS.name} name={'name'} onChange={handleAddNew} placeholder={'nhập tên'}/>
                    <input type="text" value={newHS.class} name={'class'} onChange={handleAddNew} placeholder={'nhập lớp'}/>
                    <input type="text" value={newHS.gpa} name={'gpa'} onChange={handleAddNew} placeholder={'nhập điểm'}/>
                    <button onClick={() => {saveAddNew()}}>thêm</button>

                    <div className={'head'}>
                    <h4>Tên</h4>
                    <select value={lopDuocChon} onChange={(e) =>{setLopDuocChon(e.target.value)}}>
                        <option value='' >---Danh sách lớp---</option>
                        {danhSachLop.map((item,index) =>(
                        <option value={item} key={index}>{item}</option>))}
                    </select>
                        <select value={tangGiamGpa} onChange={(e) => setTangGiamGpa(e.target.value)}>
                            <option value="">---Danh sách điểm---</option>
                            <option value='tang'>---Tăng---</option>
                            <option value='giam'>---Giảm---</option>
                        </select>
                    </div>
                    <div className={'body'}>
                     <div>
                    {filterHS(hocSinh).map((student) => (

                        <div className={'list'}>

                        <div className={'name'}>{student.name}</div>
                        <div className={'class'}>{student.class}</div>
                        <div className={'gpa'}>Điểm Trung Bình: {student.gpa}</div>
                        <button onClick={() => {setDetail(student)
                                                    setEdit(null)}}>Chi tiết</button>
                        <button onClick={() => {setDetail(null)
                                                    setEdit(student)}}>sửa</button>
                        <button onClick={() =>{setEdit(null)
                            setDetail(null) }}>ẩn</button>
                         <button onClick={() => deleteHS(student.id)}>xóa</button>
                        </div>
                    ))}
                    </div>
                    <div className={'grades-score'}>
                        {detail &&(
                            <div>
                                <h4>Tên: {detail.name}</h4>
                                {detail.grades && detail.grades.map((grade) =>
                                    <span>giáo viên: {grade.teacher}, môn: {grade.subject}, điểm: {grade.score}</span>
                                )}
                            </div>
                        )}
                    </div>
                        <div className={'grades-score'}>
                            {edit &&(
                                <div>
                                    <h4>Tên: {edit.name}</h4>
                                    <input type="text" value={edit.name} name={'name'} onChange={handleEdit}/>
                                    <input type="text" value={edit.class} name={'class'} onChange={handleEdit}/>
                                    <input type="text" value={edit.gpa} name={'gpa'} onChange={handleEdit}/>
                                    <button onClick={saveEdit}>Edit</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}