import * as S from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons/faAddressBook'

const Header = () => {
  return (
    <S.Header>
      <FontAwesomeIcon icon={faAddressBook} className="fa-icon" />
      <S.Title>Contact List</S.Title>
    </S.Header>
  )
}

export default Header
