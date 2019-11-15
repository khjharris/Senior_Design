// import {createStore, combineReducers, applyMiddleware} from 'redux'
// import thunkMiddleware from 'redux-thunk'
// import { createLogger } from 'redux-logger'

// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
// import { persistStore, persistReducer } from 'redux-persist'

// const loggerMiddleware = createLogger()

// const persistConfig = {
//   key: 'root',
//   storage,
// }

// const allCombined = combineReducers({
//   Auth,
//   Cart
// })

// const persistedReducer = persistReducer(persistConfig, allCombined)

// export const Store = createStore(
//   persistedReducer,   
//   applyMiddleware(
//     thunkMiddleware, // lets us dispatch() functions
//     loggerMiddleware // neat middleware that logs actions
// ))

// export const persistor = persistStore(Store);