import styled from 'styled-components'

export const ContactListWrapper = styled.div`
  max-width: 1020px;
  margin: 0 auto;
`

export const Form = styled.form`
  margin-bottom: 56px;

  fieldset {
    padding: 16px;
    margin-bottom: 32px;

    legend {
      font-weight: bold;
      margin-left: 16px;
      padding: 0 8px;
    }
  }

  .new-contact {
    .form-inputs {
      margin-bottom: 16px;

      .input-group {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;

        label {
          width: 49%;

          input[type='file'] {
            display: none;
          }

          input {
            font-family: 'Roboto', sans-serif;
            font-size: 20px;
            background-color: #fff;
            width: 100%;
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

        #profilePic-label {
          width: 27%;
          min-width: 220px;
          font-family: 'Roboto', sans-serif;
          font-size: 20px;
          background-color: #fff;
          border: 2px solid #000;
          border-radius: 5px;
          padding: 8px;
          cursor: pointer;
          display: flex;
          justify-content: space-around;
          margin: 0 auto;
        }
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
  }

  .list-options {
    display: flex;
    justify-content: space-around;
    column-gap: 16px;

    label {
      width: 50%;

      #search {
        width: 100%;
        font-family: 'Roboto', sans-serif;
        font-size: 20px;
        background-color: #fff;
        border: none;
        border-radius: 5px;
        border-bottom: 2px solid #000;
        padding: 8px;
      }
    }

    #sort-button {
      width: 50%;
      font-family: 'Roboto', sans-serif;
      font-size: 20px;
      background-color: #fff;
      border: 2px solid #000;
      border-radius: 5px;
      padding: 8px;
      cursor: pointer;
    }
  }

  @media (max-width: 1020px) {
    padding: 0 1.5rem;
  }

  @media (max-width: 860px) {
    .new-contact {
      .form-inputs {
        .input-group {
          display: block;
          margin-bottom: 0;

          input {
            margin-bottom: 16px;
          }

          #profilePic-label {
            margin: 0;
          }
        }
      }

      .add-button {
        width: 80%;
        margin-top: 32px;
      }
    }
  }

  @media (max-width: 600px) {
    .new-contact {
      .form-inputs {
        .input-group {
          label {
            input {
              font-size: 16px;
            }
          }

          #profilePic-label {
            font-size: 16px;
          }
        }
      }

      .add-button {
        font-size: 16px;
        width: 75%;
      }
    }

    .list-options {
      flex-wrap: wrap;
      column-gap: 0;
      row-gap: 16px;

      label {
        width: 100%;

        #search {
          font-size: 16px;
          width: 100%;
        }
      }

      #sort-button {
        font-size: 16px;
        width: 100%;
      }
    }
  }

  @media (max-width: 500px) {
    .new-contact {
      .form-inputs {
        .input-group {
          #profilePic-label {
            width: 100%;
          }
        }
      }

      .add-button {
        width: 100%;
      }
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

  @media (max-width: 1020px) {
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
