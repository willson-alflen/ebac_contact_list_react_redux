import React, { useEffect } from 'react'
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
  faUserCircle,
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
  const [profilePic, setProfilePic] = React.useState<File | null>(null)
  const [profilePicPreview, setProfilePicPreview] = React.useState<
    string | null
  >(null)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [sortedContacts, setSortedContacts] =
    React.useState<Contact[]>(contacts)
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>(
    'asc'
  )

  const handleAddContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSubmited(true)

    if (
      nameValid &&
      phoneValid &&
      emailValid &&
      name !== '' &&
      phone !== '' &&
      email !== ''
    ) {
      const addContactAndResetForm = (profilePicUrl: string) => {
        const contact: Contact = {
          id: nanoid(),
          name,
          phone,
          email,
          profilePic: profilePicUrl || '/assets/user.png',
        }

        dispatch(addContact(contact))

        localStorage.setItem('contacts', JSON.stringify([...contacts, contact]))

        setName('')
        setPhone('')
        setEmail('')
        setProfilePic(null)
        setProfilePicPreview(null)
      }

      if (profilePic) {
        const reader = new FileReader()
        reader.onloadend = () => {
          const profilePicUrl = reader.result as string
          addContactAndResetForm(profilePicUrl)
        }
        reader.readAsDataURL(profilePic)
      } else {
        addContactAndResetForm('/assets/user.png')
      }
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

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfilePic(file)

      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setProfilePicPreview(null)
    }
  }

  const handleDeleteContact = (id: string) => {
    dispatch(deleteContact(id))

    const updatedContacts = contacts.filter((contact) => contact.id !== id)
    localStorage.setItem('contacts', JSON.stringify(updatedContacts))
  }

  const handleUpdateContact = (index: number) => {
    if (!name || !phone || !email) {
      return
    }

    const updateContactAndResetForm = (profilePicUrl: string) => {
      const contact: Contact = {
        id: contacts[index].id,
        name,
        phone,
        email,
        profilePic: profilePicUrl || '/assets/user.png',
      }

      dispatch(updateContact({ index, contact }))

      const updatedContacts = [...contacts]
      updatedContacts[index] = contact
      localStorage.setItem('contacts', JSON.stringify(updatedContacts))

      setEditingIndex(-1)
      setName('')
      setPhone('')
      setEmail('')
      setProfilePic(null)
    }

    if (profilePic) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const profilePicUrl = reader.result as string
        updateContactAndResetForm(profilePicUrl)
      }
      reader.readAsDataURL(profilePic)
    } else {
      updateContactAndResetForm(contacts[index].profilePic)
    }
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

  const handleSortContacts = () => {
    const newSortedContacts = [...contacts].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name)
      return sortDirection === 'asc' ? comparison : -comparison
    })
    setSortedContacts(newSortedContacts)
  }

  // const displayedContacts = searchTerm ? filteredContacts : contacts
  const displayedContacts = searchTerm ? filteredContacts : sortedContacts

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  return (
    <S.ContactListWrapper>
      <S.Form onSubmit={handleAddContact}>
        <fieldset className="new-contact">
          <legend>Add a new contact</legend>
          <div className="form-inputs">
            <div className="input-group">
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
            </div>
            <div className="input-group">
              <label
                htmlFor="contact-email"
                aria-label="Contact E-mail Address"
              >
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
              <label
                htmlFor="contact-profilePic"
                id="profilePic-label"
                aria-label="Contact Profile Picture"
              >
                <span>Upload picture</span>
                <FontAwesomeIcon icon={faUserCircle} className="fa-icon" />
                <input
                  type="file"
                  name="profilePic"
                  id="contact-profilePic"
                  onChange={(e) => {
                    handleProfilePicChange(e)
                    setProfilePic(e.target.files ? e.target.files[0] : null)
                  }}
                />
                {profilePicPreview && (
                  <img
                    src={profilePicPreview}
                    alt="Profile preview"
                    style={{ width: '24px', height: 'auto' }}
                  />
                )}
              </label>
            </div>
          </div>

          <button className="add-button" type="submit">
            Add Contact
          </button>
        </fieldset>

        <fieldset className="list-options">
          <legend>List options</legend>
          <label htmlFor="search" aria-label="Search a contact">
            <input
              type="text"
              placeholder="Type to search"
              name="search"
              id="search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </label>

          <button
            type="button"
            id="sort-button"
            onClick={() => {
              setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
              handleSortContacts()
            }}
          >
            Sort Contacts ({sortDirection === 'asc' ? 'A-Z' : 'Z-A'})
          </button>
        </fieldset>
      </S.Form>
      <S.Table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedContacts.map((contact, index) => (
            <tr key={contact.id}>
              <td data-cell="picture">
                <img
                  src={contact.profilePic || '/assets/user.png'}
                  alt={contact.name}
                  style={{ width: '48px', height: 'auto' }}
                />
              </td>
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
