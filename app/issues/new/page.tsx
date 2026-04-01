'use client';
import React from 'react'
import { TextField } from '@radix-ui/themes'
import { TextArea } from '@radix-ui/themes'
import { Button } from '@radix-ui/themes'
const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-5'>
       <TextField.Root placeholder="Title" />
       <TextArea placeholder ="Description" />
       <Button>Submit New Issues</Button>
    </div>
  )
}

export default NewIssuePage
