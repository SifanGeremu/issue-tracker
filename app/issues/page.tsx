'use client';
import React from 'react'
import { Button } from '@radix-ui/themes'
import { TextArea } from '@radix-ui/themes'
import Link from 'next/link'
const issuesPage = () => {
  return (
    <div>
      <Button ><Link href="/issues/new">New Issue</Link></Button>
      <TextArea></TextArea>
    </div>
  )
}

export default issuesPage
