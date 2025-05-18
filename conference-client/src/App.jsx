import { useState } from 'react'
import './App.css'
import RegisterForm from './components/registerForm'
import RegisteredSpeakers from './components/RegisteredSpeakers'
import FloatingSearchIcon from './components/floatingSearch'
import logo from './assets/logo.png'

function App() {
 const [registrationFlag, setRegistrationFlag] = useState(0);

const [searchResults, setSearchResults] = useState([]);
const [showSearchResults, setShowSearchResults] = useState(false);

  function handleRegistrationFlag (registrationFlag) {
    setRegistrationFlag(prev => prev + 1);
  }

  const handleSearchResults = (results) => {
    setSearchResults(results);
    // console.log('Search results:', results);
    setShowSearchResults(true);
  };

  return (
    <>  
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Speaker Registration</h1>
      </div>
      <RegisterForm registrationSuccess = {handleRegistrationFlag} />
      <h2>Registered Speakers</h2>
      <RegisteredSpeakers 
        registrationFlag={registrationFlag}
        searchResults={searchResults}
        showSearchResults={showSearchResults}
        onCloseSearch={() => setShowSearchResults(false)}
      />
      <FloatingSearchIcon searchResults={handleSearchResults} />
    </>
  )
}

export default App
