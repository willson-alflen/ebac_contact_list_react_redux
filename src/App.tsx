import GlobalStyle from './globalStyles'
import ContactList from './components/ContactList/ContactList'
import Header from './components/Header'

function App() {
  return (
    <>
      <GlobalStyle />
      <main className="app-container">
        <Header />
        <ContactList />
      </main>
    </>
  )
}

export default App
