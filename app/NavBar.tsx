'use client'
import React from 'react'
import Link from 'next/link'
import {usePathname}  from 'next/navigation'
import classnames from 'classnames'
import { AiOutlineIssuesClose } from "react-icons/ai";
const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label:"Dashboard",href:"/dashboard"},
    { label:"issues",href:"/issues"},

  ]
  return (
    
   <nav className='flex space-x-6 border-b-3   mb-4 px-4 h-14 items-center bg-background'>
    <Link  href='/'>
   <AiOutlineIssuesClose  className='text-3xl'/>
    </Link>
    <ul className='flex space-x-6'>
      {links.map((link)=>(
        <li key={link.href} className={classnames({'text-zinc-900':link.href===currentPath,
          'text-zinc-500':link.href !== currentPath,
          'hover:text-zinc-800 transition-colors':true
})}>
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
