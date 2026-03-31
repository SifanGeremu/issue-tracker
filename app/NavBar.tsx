'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import { AiOutlineIssuesClose } from 'react-icons/ai'
const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ]
  return (
    
   <nav className='sticky top-0 z-50 flex h-14 items-center gap-6 border-b border-border bg-background/90 px-4 backdrop-blur'>
    <Link href='/' className='flex items-center gap-2 text-foreground'>
      <AiOutlineIssuesClose className='text-3xl text-primary' />
      
    </Link>
    <ul className='flex space-x-6'>
      {links.map((link)=>(
        <li
          key={link.href}
          className={classnames({
            'text-foreground': link.href === currentPath,
            'text-muted-foreground': link.href !== currentPath,
            'hover:text-foreground transition-colors': true,
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
