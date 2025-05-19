import { useState } from 'react'
import './App.css'
import RegisterForm from './components/RegisterForm'
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
    setShowSearchResults(true); //because we want to render the search 
                                // results overlay on RegisteredSpeakers.jsx
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
        registrationFlag={registrationFlag} // re-fetch speakers after registration
        
        searchResults={searchResults} // pass search results to RegisteredSpeakers 
        showSearchResults={showSearchResults} // pass showSearchResults state to trigger search results overlay
        onCloseSearch={() => setShowSearchResults(false)} // a false preset callback
                                    //  function to close search results when the 
                                    // overlay is clicked anywhere
      />
      <FloatingSearchIcon searchResults={handleSearchResults} //a function to get search results
      />
    </>
  )
}

export default App
