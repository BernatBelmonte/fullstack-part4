import { useState } from 'react'
import { useEffect } from 'react'
import blogService from './services/blogs'

const Blogs = ({ handleDelete, blogs }) => {
  return (
    <ul>
    {blogs.map(blog => <Blog blog={blog} handleDelete={handleDelete}></Blog>)}
    </ul>
  )
}

const Blog = ({ blog, handleDelete}) => {
  return (
    <li key={blog.id}>
      <h3>{blog.title}</h3>
      <p>{blog.author}</p>
      <p>Likes: {blog.likes}</p>  
      <a href={blog.url}>Click here to visit this blog.</a>
      <br />
      <button onClick={() => handleDelete(blog.id)}>Delete</button>
    </li>
  )
}

const Form = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        Title: <input value={props.newTitle} onChange={props.handleChangeTitle} />
      </div>
      <div>
        Author: <input value={props.newAuthor} onChange={props.handleChangeAuthor}/>
      </div>
      <div>
        Url: <input value={props.newUrl} onChange={props.handleChangeUrl}/>
      </div>
      <div>
        Likes: <input value={props.newVotes} onChange={props.handleChangeVotes}/>
      </div>
      <div>
        <button type="submit" >add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newVotes, setNewVotes] = useState('')
  
  useEffect(() => {
    blogService.getAll().then( initialBlogs => {
      if (initialBlogs.data) {
        setBlogs(initialBlogs.data)
      }
    })  
  }, [])

  const handleDelete = (id) => {
    const blogToRemove = blogs.find(blog=>blog.id === id)
    if(window.confirm(`Delete ${blogToRemove.title}?`)) { 
      blogService
        .deleteBlog(id)
        .then(initialValue => {
          setBlogs(blogs.filter(blog=>blog.id !== id))
        })
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    if (newTitle != '' && newAuthor != '') {
      const aux_blog = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
        likes: newVotes
      }
      console.log(aux_blog)
      blogService.create(aux_blog)
      .then(response => {
        setBlogs(blogs.concat(response.data))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setNewVotes('')
      })
    }
  }
  const handleChangeTitle = (event) => {
    setNewTitle(event.target.value)
  }
  const handleChangeAuthor = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleChangeUrl = (event) => {
    setNewUrl(event.target.value)
  }
  const handleChangeVotes = (event) => {
    setNewVotes(event.target.value)
  }
  return (
    <div>
      <h2>Blogs</h2>
      <Form newTitle={newTitle} newAuthor={newAuthor} newUrl={newUrl} newVotes={newVotes} handleSubmit={handleSubmit} handleChangeTitle={handleChangeTitle} handleChangeAuthor={handleChangeAuthor} handleChangeUrl={handleChangeUrl} handleChangeVotes={handleChangeVotes}></Form>
      <Blogs handleDelete={handleDelete} blogs={blogs}></Blogs>
    </div>
  )
}

export default App
