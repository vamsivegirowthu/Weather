import React from 'react'

import { FaSearch } from 'react-icons/fa'
import "../Components/SearchBar.css"

export const SearchBar = () => {
  return <div className='input-wrapper'>
    <FaSearch id="search-icon" />
    <input placeholder='Type to search' />

    </div>
  
}
