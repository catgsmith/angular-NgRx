import { createReducer, on } from '@ngrx/store';
import { Product } from '../product';

import * as ProductAction from './product.actions';

// 
// State for this feature (Product)
// 
export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
}

const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: ''
}

//
// State transformation
// 
export const productReducer = createReducer<ProductState>(
    initialState,
    on(ProductAction.toggleProductCode, (state): ProductState => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        };
    }),
    on(ProductAction.setCurrentProduct, (state, action): ProductState => {
        return {
            ...state,
            currentProductId: action.currentProductId
        };
    }),
    on(ProductAction.clearCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: null
        };
    }),
    on(ProductAction.initializeCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: 0
        };
    }),
    on(ProductAction.loadProductsSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: action.products,
            error: ''
        };
    }),
    on(ProductAction.loadProductsFailure, (state, action): ProductState => {
        return {
            ...state,
            products: [],
            error: action.error
        };
    }),
    on(ProductAction.updateProductSuccess, (state, action): ProductState => {
        const updatedProducts = state.products.map(
            item => action.product.id === item.id ? action.product : item);
        return {
            ...state,
            products: updatedProducts,
            currentProductId: action.product.id,
            error: ''
        };
    }),
    on(ProductAction.updateProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(ProductAction.createProductSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: [...state.products, action.product],
            currentProductId: action.product.id,
            error: ''
        };
    }),
    on(ProductAction.createProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        };
    }),

    on(ProductAction.deleteProductSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: state.products.filter(product => product.id !== action.productId),
            currentProductId: null,
            error: ''
        };
    }),
    on(ProductAction.deleteProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        };
    })
);