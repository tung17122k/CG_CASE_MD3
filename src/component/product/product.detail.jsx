import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://localhost:3000/products/${id}`);
            setProduct(res.data)
        }

        fetchData()
    }, [])
    console.log(product);



    return (
        <div style={{ border: "1px solid #ccc", width: "500px", height: "auto", marginTop: "20px", padding: "30px" }}>
            <h1>Product Detail</h1>
            <h2>Tên sản phẩm: <span style={{ color: "red" }}>{product?.title}</span></h2>
            <p>Product ID: {id}</p>
            <p>Price: {product?.price}</p>
            <p>Description: {product?.description}</p>
        </div>


    );
};

export default ProductDetailPage;