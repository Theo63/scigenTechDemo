import { useState, useRef, useEffect } from "react";
import "../styles/floatingButton.css";
import searchIcon from "../assets/search.png";

export default function FloatingSearch({searchResults}) {
    const [isPressed, setIsPressed] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    

    const handleSearch = async (event) => {
        if (event.key === 'Enter') {
            try {
                const response = await fetch(`http://localhost:4000/api/speakers/search?name=${searchTerm}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error(`Search failed (${response.status})`);
                }
                const data = await response.json();
                searchResults(data);             // this ref will be lifted to the parent component
                // console.log('Search results:', data);
                setIsPressed(false);
            } catch (error) {
                console.error('Search error:', error);
            }
        }
    };

    const handleButtonClick = () => {
        setIsPressed(true);
        // Focus input after render
        
    };

    const lostFocus =() =>{
        setIsPressed(false);
        setSearchTerm('');
    }
    //contitionally rendering    the input field based on the isPressed 
    return (
        <div className="floating-search-container">
                    {isPressed && (
                        <input 
                            id="name" 
                            name="name" 
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearch}
                            onBlur={lostFocus}
                            placeholder="Type Speaker Search..."
                            className="floating-search-input"
                            autoFocus
                        />
                    )}
                    <button 
                        className="floating-search-button" 
                        onClick={handleButtonClick}
                        
                    >
                        <img src={searchIcon} alt="search"/>
                    </button>
                </div>
    );


}