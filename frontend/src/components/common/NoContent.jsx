import React from 'react'
import { noContent } from '../../utils/staticImagePath'

export default function NoContent({ title }) {
  return (
    <div className='flex flex-col items-center justify-center mt-50 gap-5'>
      <img src={noContent} alt="" className='w-15 aspect-square'/>
      <div className='pretendard-normal text-2xl'>{ title }</div>
    </div>
  )
}
