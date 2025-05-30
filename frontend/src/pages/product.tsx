import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { RootState, AppDispatch } from '../app/store';
import { fetchProducts } from '../features/products/productSlice';
import './product.css';

function ProductDatails() {
    return(
        <div className='product_details'></div>
    )
}

export default ProductDatails;