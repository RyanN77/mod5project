import { createStore } from 'redux'
import rootReducer from "./reducer"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['showCreateForm', 'username', 'password', 'editUser']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
// const store = createStore(reducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)
