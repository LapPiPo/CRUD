// import {useEffect, useState} from "react";
// import axios from "axios";
// import './dssp.css'
// export default function Dssp(){
//     const [products, setProducts] = useState([]);
//     let [categories, setCategories] = useState([]);
//     let [categorySelect, setCategorSelect] = useState(null);
//     function loadProduct (){
//         axios.get("http://localhost:9999/products").then((response) =>
//         {const list = response.data;
//             setProducts(list);
//             const listCategories = [...new Set(list.map(item =>
//                 item.category))];
//             setCategories(listCategories);
//         })
//     }
//
//     function filterPro(products){
//         if(categorySelect === null)return products
//         return products.filter((product) => product.category === categorySelect);
//     }
//
//     useEffect(()=>{loadProduct ()},[])
//     return (
//         <>
//             <div className={'containner'}>
//
//                 <div className={'product'}>
//                     <button onClick={() => setCategorSelect(null) }>tất cả</button>
//                     {categories.map((category) => (<button
//                         onClick={() => {setCategorSelect(category)}}>{category}
//                     </button>))}
//
//                     <div className={'input'}>ô input </div>
//                     <div className={'list-product'}>
//
//                         {filterPro(products).map((product ) => (
//                             <div className={'item'} >
//                                 <span>{product.title}</span>
//                                 <div>{product.category}</div>
//                                 <div>{product.price}</div>
//                             </div>
//                         ))}
//                     </div>
//
//
//                 </div>
//                 <div className={'edit-review'}></div>
//             </div>
//         </>
//     )
// }