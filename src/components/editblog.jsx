import React from 'react'
import BlogForm from './blogform'

const Editblog = ({post,onClose}) => {
    
  return (
    
    <>
    <BlogForm post={post} onClose={onClose}/>
    </>
  )
}

export default Editblog