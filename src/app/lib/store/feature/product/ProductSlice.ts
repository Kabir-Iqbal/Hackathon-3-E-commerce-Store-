// checkoutSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  name: string;
  price: number;
  image: string;
  quantity : number;
  id : number
}

interface CheckoutState {
  products: Product[];
}

const initialState: CheckoutState = {
  products: [],
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCheckoutData: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
});

export const { setCheckoutData } = checkoutSlice.actions;
export default checkoutSlice.reducer;
