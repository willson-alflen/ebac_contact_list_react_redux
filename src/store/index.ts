import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import contactsSlice from './contactsSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, contactsSlice)

const store = configureStore({
  reducer: {
    contacts: persistedReducer,
  },
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export { store, persistor }
