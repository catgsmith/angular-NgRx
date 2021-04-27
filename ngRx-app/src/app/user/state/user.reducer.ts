import { createAction, createReducer, on } from '@ngrx/store';

export const userReducer = createReducer(
    { maskUserName: false },
    on(createAction('[User] Toggle mask user name'), state => {
        console.log('original state: ', JSON.stringify(state));

        return {
            ...state,
            maskUserName: !state.maskUserName
        };
    })
);  