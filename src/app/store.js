import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '../modules/auth/authSlice';
import { authApi } from '../services/auth';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
              getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);


// import { compose, createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';

// export default initialState => {
//   const store = createStore(  
//     rootReducer,
//     initialState,
//     compose( applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f )
//   );

//   store.subscribe(() => {});

//   return store;   
// };
