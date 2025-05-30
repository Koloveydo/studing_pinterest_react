
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from './productTypes';

type ProductState = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await fetch('http://localhost:3000/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    return (await res.json()) as Product[];
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      });
      builder.addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      });
      builder.addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product.id !== action.payload);
      })
  },
});

const BASE_URL = 'http://localhost:3000/products';

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product: Omit<Product, 'id' | 'imageUrl'>) => {
    const response = await axios.post(BASE_URL, {
      ...product,
      imageUrl: 'https://via.placeholder.com/150'
    });
    return response.data;
  }
);

const API_URL = 'http://localhost:3000/products';

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: number, thunkAPI) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    return id;
  }
);

export default productSlice.reducer;

