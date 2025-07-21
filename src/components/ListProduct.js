import {useEffect, useState} from "react";
import axios from "axios";
import './dssp.css'

export default function ListProduct() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categorySelected, setCategorySelected] = useState(null);
    const [newProduct, setNewProduct] = useState({title: '', category: '', price: 0});
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedEditProduct, setSelectedEditProduct] = useState(null);
    const [newReview, setNewReview] = useState({
        "rating": 5,
        "comment": "",
        "reviewerName": ""
    });

    function loadProducts() {
        axios.get("http://localhost:9999/products").then(response => {
            let list = response.data;
            let listCategory = [];
            for (let i = 0; i < list.length; i++) {
                if (listCategory.indexOf(list[i].category) === -1) {
                    listCategory.push(list[i].category);
                }
            }
            setCategories(listCategory);
            setProducts(list);
        })
    }

    useEffect(() => {
        loadProducts()
    }, []);

    function filterProduct(products) {
        if (categorySelected === null) return products;
        return products.filter((product) => product.category === categorySelected);
    }

    function addProduct() {
        axios.post("http://localhost:9999/products", newProduct).then(x => {
            loadProducts();
            setNewProduct({title: '', category: '', price: 0})})
    }

    function handleChangeNewProduct(e) {
        setNewProduct({...newProduct, [e.target.name]: e.target.value});
    }

    function handleChangeNewReview(e) {
        setNewReview({...newReview, [e.target.name]: e.target.value});
    }

    function handleChangeEditProduct(e) {
        setSelectedEditProduct({...selectedEditProduct, [e.target.name]: e.target.value});
    }

    function saveEditProduct() {
        axios.put("http://localhost:9999/products/" + selectedEditProduct.id, selectedEditProduct).then(x => {
            loadProducts()
        })
    }

    function deleteProduct(id) {
        axios.delete("http://localhost:9999/products/" + id).then(x => {
            loadProducts()
        })
    }

    function addReview() {
        let editedProduct = {...selectedProduct, reviews: [...selectedProduct.reviews, newReview]}
        setSelectedProduct(editedProduct);
        axios.put("http://localhost:9999/products/" + selectedProduct.id, editedProduct).then(x => {
            loadProducts();
        })
    }

    return (
        <>
            <div className={'container-product'}>
                <div className={'list'}>
                    <h1>List Product</h1>
                    <input type="text" value={newProduct.title} name={'title'} onChange={handleChangeNewProduct}/>
                    <input type="text" value={newProduct.category} name={'category'} onChange={handleChangeNewProduct}/>
                    <input type="text" value={newProduct.price} name={'price'} onChange={handleChangeNewProduct}/>
                    <button onClick={() => {addProduct()}}>Thêm mới</button>
                    {categories.map((category) => (
                        <button
                            onClick={() => {
                                setCategorySelected(category)
                            }}>
                            {category}</button>))
                    }
                    {filterProduct(products).map((product) => (
                        <h5>
                            {product.title}: {product.category}, {product.price}
                            <button onClick={() => {
                                setSelectedProduct(product)
                                setSelectedEditProduct(null)
                            }}>Detail
                            </button>
                            <button onClick={() => {
                                setSelectedEditProduct(product)
                                setSelectedProduct(null)
                            }}>Edit
                            </button>
                            <button onClick={() => {
                                deleteProduct(product.id)
                            }}>Delete
                            </button>
                        </h5>
                    ))}
                </div>
                <div className={'detail'}>
                    {selectedProduct && (
                        <>
                            <h3> Name: {selectedProduct.title}</h3>
                            {selectedProduct.reviews && selectedProduct.reviews.map((review) => (
                                <div>{review.reviewerName}: {review.comment}, rate: {review.rating}</div>
                            ))}
                            <input type="text" value={newReview.rating} name={'rating'}
                                   onChange={handleChangeNewReview}/>
                            <input type="text" value={newReview.reviewerName} name={'reviewerName'}
                                   onChange={handleChangeNewReview}/>
                            <input type="text" value={newReview.comment} name={'comment'}
                                   onChange={handleChangeNewReview}/>
                            <button onClick={() => addReview()}>Add Review</button>
                        </>
                    )}
                    {selectedEditProduct && (
                        <>
                            <input type="text" value={selectedEditProduct.title} name={'title'}
                                   onChange={handleChangeEditProduct}/>
                            <input type="text" value={selectedEditProduct.category} name={'category'}
                                   onChange={handleChangeEditProduct}/>
                            <input type="text" value={selectedEditProduct.price} name={'price'}
                                   onChange={handleChangeEditProduct}/>
                            <button onClick={saveEditProduct}>Luu</button>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}