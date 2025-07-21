import {useEffect, useState} from "react";
import axios from "axios";
import './dssp.css'
export default function Dssp() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectcategories, setSelectCategories] = useState(null);
    const [newProduct, setNewProduct] = useState({title:'',category:'',price:0});
    const [reviewProduct, setReviewProduct] = useState(null);
    const [editorProduct, setEditorProduct] = useState(null);
    function loadProducts(){
        axios.get('http://localhost:9999/products').then((response) => {
            let list = response.data;
            const filterList = [...new Set(list.map(item => item.category))];
            setCategories(filterList)
            setProducts(list);
        })
    }

    function filterCate(products){
        if(selectcategories ===null) return products
        return products.filter(product => product.category === selectcategories)
    }

    function addProduct(){
       axios.post('http://localhost:9999/products',products).
       then(loadProducts);
        setNewProduct({title:'',category:'',price:0});
    }

    function handleAddNewProduct(e){
        setNewProduct({...newProduct,[e.target.name]: e.target.value});
    }

    function handleAddEditProduct(e){
        setEditorProduct({...editorProduct,[e.target.name]: e.target.value});
    }
    
    function saveEditProduct(){
        axios.put('http://localhost:9999/products/' + editorProduct.id, editorProduct).then(x => {loadProducts()})
    }

    function deleteEditProduct(id){
        axios.delete('http://localhost:9999/products/' + id, editorProduct).then(x => {loadProducts()})
    }

    useEffect (() => {loadProducts()}, [])
    return (
        <>
            <div className={'container'}>
                <div className={'button'}>
                    <button onClick={() =>
                        setSelectCategories(null)}>tất cả</button>
                    {categories.map(category => (
                    <div>
                        <button onClick={() =>
                            setSelectCategories(category)}>{category}</button>
                    </div>
                    ))}
                </div>
                <div className={'products'}>
                    {filterCate(products).map((product) => (
                        <div className={'list-product'}>
                            <h4>{product.title}</h4>
                            <div>{product.category}</div>
                            <div>{product.price}</div>
                            <button onClick={()=>{setReviewProduct(product)
                                                 setEditorProduct(null)}}>chi tiết</button>
                            <button onClick={()=>{setEditorProduct(product)
                                                  setReviewProduct(null)}}>edit</button>
                            <button onClick={()=> {setReviewProduct(null)
                                                        setEditorProduct(null)}}>Ẩn</button>
                            <button onClick={()=> {deleteEditProduct(product.id)}}>xóa</button>
                        </div>
                    ))}
                    <div className={'newProduct'}>
                        <input type="text" placeholder={'nhập tên'} value={newProduct.title} name={'title'}
                               onChange={handleAddNewProduct}/>
                        <input type="text" placeholder={'nhập loại'} value={newProduct.category} name={'category'}
                               onChange={handleAddNewProduct}/>
                        <input type="text" placeholder={'nhập giá'} value={newProduct.price} name={'price'}
                               onChange={handleAddNewProduct}/>
                        <button onClick={() => {addProduct()}}>thêm sản phẩm</button>
                    </div>
                </div>

                <div className={'review-edit'}>
                    {reviewProduct &&(
                        <div>
                        <h3>name: {reviewProduct.title}</h3>
                    {reviewProduct.reviews && reviewProduct.reviews.map((review) => (
                        <div>Person: {review.reviewerName}, comment: {review.comment}, rate: {review.rating} </div>
                        ))}
                        </div>
                    )}

                </div>
                <div className={'review-edit'}>
                    {editorProduct &&
                    <div>
                        <h3>name: {editorProduct.title}</h3>
                        <input type="text" value={editorProduct.title} name={'title'} onChange={handleAddEditProduct}/>
                        <input type="text" value={editorProduct.category} name={'category'} onChange={handleAddEditProduct}/>
                        <input type="text" value={editorProduct.price} name={'price'} onChange={handleAddEditProduct}/>
                        <button onClick={saveEditProduct}>edit</button>
                    </div>
                    }
                </div>
        </div>
        </>
    )
}