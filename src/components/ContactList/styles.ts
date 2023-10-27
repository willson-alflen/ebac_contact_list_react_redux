import styled from 'styled-components'

export const ContactListWrapper = styled.div`
  max-width: 860px;
  margin: 0 auto;
`

export const Form = styled.form`
  margin-bottom: 56px;

  .form-inputs {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;

    input {
      font-family: 'Roboto', sans-serif;
      font-size: 20px;
      background-color: #fff;
      width: 270px;
      border: none;
      border-radius: 5px;
      border-bottom: 2px solid #000;
      padding: 8px;
    }

    .error-message {
      display: block;
      color: red;
      font-size: 0.75rem;
      margin: 8px 0 0 16px;
    }
  }

  .add-button {
    background-color: #009432;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 8px 10px;
    display: block;
    margin: 0 auto;
  }

  @media (max-width: 860px) {
    padding: 0 1.5rem;

    .form-inputs {
      display: block;

      input {
        width: 100%;
      }

      .error-message {
        margin: 8px 0 16px 8px;
      }
    }
  }

  @media (max-width: 600px) {
    .form-inputs {
      input {
        font-size: 16px;
        margin-bottom: 0;
      }

      .error-message {
        margin: 8px 0 16px 8px;
      }
    }

    .add-button {
      font-size: 16px;
    }
  }
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    font-size: 24px;
    font-weight: bold;
    padding: 16px;
    border-bottom: 2px solid #000;
  }

  td {
    text-align: center;
    font-size: 20px;
    padding: 16px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 32px;
    align-items: center;
    width: 80%;
    margin: 0 auto;

    .fa-icon {
      font-size: 28px;
      cursor: pointer;
    }
  }

  .update-input {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    background-color: #fff;
    border: none;
    border-radius: 5px;
    border-bottom: 2px solid #000;
    padding: 6px;
    width: 90%;
  }

  @media (max-width: 860px) {
    width: 90%;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    max-width: 75%;

    thead {
      th {
        display: none;
        visibility: hidden;
      }
    }

    tbody {
      tr {
        display: block;
        margin-bottom: 48px;
        border: 1px solid hsl(0, 0%, 80%);
        border-radius: 15px;
      }

      td {
        display: block;
      }

      td:last-child {
        border-bottom: none;
      }

      td:not(:last-child)::before {
        content: attr(data-cell) ': ';
        font-weight: bold;
        text-transform: capitalize;
      }
    }
  }

  @media (max-width: 600px) {
    tbody {
      td {
        font-size: 16px;
      }
    }

    .actions {
      .fa-icon {
        font-size: 20px;
      }
    }
  }
`
