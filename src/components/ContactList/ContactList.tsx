import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import InputMask from 'react-input-mask'
import {
  Contact,
  addContact,
  deleteContact,
  updateContact,
} from '../../store/contactsSlice'
import * as S from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPenToSquare,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'

const ContactList: React.FC = () => {
  const dispatch = useDispatch()

  const contacts = useSelector((state: RootState) => state.contacts.contacts)
  const [name, setName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [nameValid, setNameValid] = React.useState(false)
  const [phoneValid, setPhoneValid] = React.useState(false)
  const [emailValid, setEmailValid] = React.useState(false)
  const [editingIndex, setEditingIndex] = React.useState(-1)
  const [isSubmited, setIsSubmited] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')

  const handleAddContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSubmited(true)

    if (nameValid && phoneValid && emailValid) {
      const contact: Contact = {
        id: nanoid(),
        name,
        phone,
        email,
      }

      dispatch(addContact(contact))

      setName('')
      setPhone('')
      setEmail('')
    }
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setName(value)
    setNameValid(value !== '')
  }

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setPhone(value)
    setPhoneValid(/^\(\d{2}\) \d{5}-\d{4}$/.test(value))
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setEmail(value)
    setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
  }

  const handleDeleteContact = (id: string) => {
    dispatch(deleteContact(id))
  }

  const handleUpdateContact = (index: number) => {
    if (!name || !phone || !email) {
      return
    }

    const contact: Contact = {
      id: contacts[index].id,
      name,
      phone,
      email,
    }

    dispatch(updateContact({ index, contact }))

    setEditingIndex(-1)
    setName('')
    setPhone('')
    setEmail('')
  }

  const handleEditContact = (index: number) => {
    setEditingIndex(index)
    setName(contacts[index].name)
    setPhone(contacts[index].phone)
    setEmail(contacts[index].email)
  }

  const handleCancelEdit = () => {
    setEditingIndex(-1)
    setName('')
    setPhone('')
    setEmail('')
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const displayedContacts = searchTerm ? filteredContacts : contacts

  return (
    <S.ContactListWrapper>
      <S.Form onSubmit={handleAddContact}>
        <fieldset>
          <legend>Add a new contact</legend>
          <div className="form-inputs">
            <label htmlFor="contact-name" aria-label="Contact Name">
              <input
                type="text"
                name="name"
                id="contact-name"
                value={editingIndex === -1 ? name : ''}
                placeholder="Michael Scott"
                onChange={handleNameChange}
              />
              {isSubmited && !nameValid && (
                <span className="error-message">Please enter a name</span>
              )}
            </label>
            <label htmlFor="contact-number" aria-label="Contact Phone Number">
              <InputMask
                name="phone"
                id="contact-number"
                value={editingIndex === -1 ? phone : ''}
                placeholder="(99) 99999-9999"
                mask="(99) 99999-9999"
                maskChar=" "
                onChange={handlePhoneChange}
              />
              {isSubmited && !phoneValid && (
                <span className="error-message">
                  Please enter a valid phone number
                </span>
              )}
            </label>
            <label htmlFor="contact-email" aria-label="Contact E-mail Address">
              <input
                type="text"
                name="email"
                id="contact-email"
                value={editingIndex === -1 ? email : ''}
                placeholder="michaelscott@example.com"
                onChange={handleEmailChange}
              />
              {isSubmited && !emailValid && (
                <span className="error-message">
                  Please enter a valid email address
                </span>
              )}
            </label>
          </div>

          <button className="add-button" type="submit">
            Add Contact
          </button>
        </fieldset>

        <fieldset>
          <legend>Search a contact</legend>
          <label htmlFor="search" aria-label="Search a contact">
            <input
              type="text"
              placeholder="Find Someone"
              name="search"
              id="search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </label>
        </fieldset>
      </S.Form>
      <S.Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedContacts.map((contact, index) => (
            <tr key={contact.id}>
              <td data-cell="name">
                {editingIndex === index ? (
                  <input
                    type="text"
                    className="update-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  contact.name
                )}
              </td>
              <td data-cell="phone">
                {editingIndex === index ? (
                  <input
                    type="text"
                    className="update-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                ) : (
                  contact.phone
                )}
              </td>
              <td data-cell="email">
                {editingIndex === index ? (
                  <input
                    type="text"
                    className="update-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  contact.email
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <div className="actions">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="fa-icon"
                      onClick={() => handleUpdateContact(index)}
                    />
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="fa-icon"
                      onClick={handleCancelEdit}
                    />
                  </div>
                ) : (
                  <div className="actions">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="fa-icon"
                      onClick={() => handleEditContact(index)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="fa-icon"
                      onClick={() => handleDeleteContact(contact.id)}
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </S.Table>
    </S.ContactListWrapper>
  )
}

export default ContactList

// how can I implement pagination for the list of contacts?
// how can I persist the data in the browser using localStorage?
// how can I implement a dark mode?
// how can I  implement a feature to identify and merge duplicate contacts, preventing redundancy in the list?
// how can I make the app  accessible to a wide range of users by incorporating accessibility features, such as keyboard navigation and screen reader support?
// how can I enable users to add profile pictures to their contacts?
