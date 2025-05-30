import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { RootState, AppDispatch } from '../app/store';
import { fetchProducts, addProduct, deleteProduct  } from '../features/products/productSlice';
import './home.css';
import { text } from 'stream/consumers';


function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, error } = useSelector((state: RootState) => state.products);
  
    const [sortType, setSortType] = useState<'alphabet' | 'count'>('alphabet');
    
    const [showPopup, setShowPopup] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        count: 0,
        weight: '',
        size: { width: 0, height: 0 },
    });


    useEffect(() => {
      dispatch(fetchProducts());
    }, [dispatch]);
  
    const sortedProducts = [...products].sort((a, b) => {
      return sortType === 'alphabet'
        ? a.name.localeCompare(b.name)
        : b.count - a.count;
    });
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return(
        <div className='home_container'>
            <div className='content_container'>
                <div className='btn_container'>
                    <button className='pop_btn' onClick={() => setShowPopup(true)}>Add Product</button>
                    <select className='filter_btn' onChange={(e) => setSortType(e.target.value as 'alphabet' | 'count')}>
                        <option value="alphabet">Sort by Name</option>
                        <option value="count">Sort by Count</option>
                    </select>
                </div>
                <h2 style={{alignSelf:'center', color:'white'}}>Products list</h2>
                {showPopup && (
                <div className="popup">
                    <input placeholder="Name" onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
                    <input type="number" placeholder="Count" onChange={(e) => setNewProduct({...newProduct, count: Number(e.target.value)})} />
                    <input placeholder="Weight" onChange={(e) => setNewProduct({...newProduct, weight: e.target.value})} />
                    <input type="number" placeholder="Width" onChange={(e) => setNewProduct({...newProduct, size: {...newProduct.size, width: Number(e.target.value)}})} />
                    <input type="number" placeholder="Height" onChange={(e) => setNewProduct({...newProduct, size: {...newProduct.size, height: Number(e.target.value)}})} />
                    <button
                    onClick={() => {
                        if (!newProduct.name || !newProduct.count || !newProduct.weight) return alert('Please fill all fields!');
                        dispatch(addProduct(newProduct));
                        setShowPopup(false);
                    }}
                    >
                    Submit
                    </button>
                    <button onClick={() => setShowPopup(false)}>Cancel</button>

                </div>
                )}

                <ul style={{color:'white'}}>
                {sortedProducts.map((prod) => (
                    <li key={prod.id}>
                    <p>{prod.name}</p>
                    <p>Count: {prod.count}</p>
                    <p>Weight: {prod.weight}</p>
                    <button onClick={() => dispatch(deleteProduct(prod.id))}>Видалити</button>
                    </li>
                ))}
                </ul>


            </div>
        </div>
    )
}

export default Home;