import React from 'react'
import "../Components/Styles.css"
 import { FaCloudSunRain } from "react-icons/fa";

export default function Header() {
  return (
    <div className='header-container'>
        <h1> 2024 </h1>
        <h2> Weather </h2>
        <FaCloudSunRain height={500} width={500} />
    </div>
  )
}
