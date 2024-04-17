const Blog = require('../models/blog')
const blogsRouter = require('express').Router()

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blog => { response.json(blog) })
  })
  
blogsRouter.get('/:id', (request, response) => {
    const id = request.params.id
    Blog.findById(id).then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    }).catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformated id' })
    })
})
  
blogsRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndDelete(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
})
  
blogsRouter.post('/', (request, response, next) => {
    console.log(request)
    const title = request.body.title
    const author = request.body.author
    const url = request.body.url
    const likes = request.body.likes
    if (title && author) {
      const blog = new Blog({
        title,
        author,
        url,
        likes
      })
      blog.save().then(savedBlog => {
        response.json(savedBlog)
      })
      .catch(error => next(error))
    } else {
      response.status(400).json({
        error: 'name or number missing'
      })
    }
})

module.exports = blogsRouter