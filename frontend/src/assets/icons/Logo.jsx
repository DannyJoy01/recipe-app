import React from 'react'
import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <div>
      <h1 className="font-lob text-2xl text-black">
        <Link to="/">DannysKitchen<span className="text-orange-500">.</span></Link>
        </h1>
    </div>
  )
}

export default Logo
