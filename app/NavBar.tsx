import React from 'react'
import Link from 'next/link'
import { AiOutlineIssuesClose } from "react-icons/ai";
const NavBar = () => {
  const links = [
    { label:"Dashboard",href:"/dashboard"},
    { label:"issues",href:"/issues"},

  ]
  return (
    
   <nav className='flex space-x-6 border-b-3   mb-4 px-4 h-14 items-center'>
    <Link href='/'>
   <AiOutlineIssuesClose />
    </Link>
    <ul className='flex space-x-6'>
      {links.map((link)=>(
        <li key={link.href}>
          <Link href={link.href}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
   </nav>
  
  )
}

export default NavBar
