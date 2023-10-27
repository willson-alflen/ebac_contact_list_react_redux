import styled from 'styled-components'

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 48px;
  text-align: center;

  .fa-icon {
    font-size: 56px;
  }

  @media (max-width: 600px) {
    .fa-icon {
      font-size: 40px;
    }
  }
`

export const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;

  @media (max-width: 600px) {
    font-size: 32px;
  }
`
