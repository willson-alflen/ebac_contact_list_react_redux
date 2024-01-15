import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface Contact {
  id: string
  name: string
  email: string
  phone: string
}

interface ContactsState {
  contacts: Contact[]
}

const initialState: ContactsState = {
  contacts: [
    {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '(55) 55555-5555',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      phone: '(55) 55555-5555',
    },
  ],
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload)
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      )
    },
    updateContact: (
      state,
      action: PayloadAction<{ index: number; contact: Contact }>
    ) => {
      state.contacts[action.payload.index] = action.payload.contact
    },
  },
})

export const { addContact, deleteContact, updateContact } =
  contactsSlice.actions

export default contactsSlice.reducer
