const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/api/blogs', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { name: 1, username: 1,  _id : 0 })

  response.json(blogs.map(b => b.toJSON()))
})
  
blogsRouter.post('/api/blogs', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.userId)

  const blog = new Blog({
    title : body.title,
    author : body.author,
    url : body.url,
    likes : body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())
  })

blogsRouter.get('/api/blogs/:id', (request, response) => {
Blog.findById(request.params.id).then(blog => {
    response.json(blog)
  })
})

blogsRouter.delete('/api/blogs/:id', (request, response, next) => {
Blog.findByIdAndRemove(request.params.id)
    .then(result => {
    response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = blogsRouter