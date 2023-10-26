import { Link } from 'react-router-dom'

import useBlogs from '../../hooks/useBlogs'
import Loading from '../FetchStateUI/Loading'
import Error from '../FetchStateUI/Error'

import { Container, Grid, Typography } from '@mui/material'
import img from '../../assets/images/post1.png'

const BlogList = () => {
  const { blogs, isLoadingBlogs, isBlogsError } = useBlogs()

  if (isLoadingBlogs) {
    return <Loading />
  }

  if (isBlogsError) {
    return <Error />
  }

  return (
    <div>
      {/* <section id='blog-list-container'>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Card
              key={blog.id}
              sx={blogCardStyles}
              className='single-blog-container'
            >
              <CardContent>
                <Typography variant='h6'>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.author
                      ? `${blog.title} by ${blog.author}`
                      : blog.title}
                  </Link>
                </Typography>
              </CardContent>
            </Card>
          ))}
      </section>
      <div>my design</div> */}
      {/* <Box
        sx={{
          padding: '80px 30px 92px 30px',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%', // Full width
          margin: '0 auto', // Center the content
        }}
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <div>
              <Typography variant='subtitle1'>1% OF THE INDUSTRY</Typography>
              <Typography variant='h1'>
                Hype got you here. Stay for the support.
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Box> */}
      <Container maxWidth='xl' sx={{ backgroundColor: '#f8f9fb' }}>
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          sx={{ height: '250px' }}
        >
          <Grid item xs={12} md={6}>
            <div style={{ textAlign: 'center' }}>
              <Typography
                variant='subtitle1'
                sx={{
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: '20px',
                  letterSpacing: '-0.10000000149011612px',
                  textAlign: 'center',

                  color: '#437ef7', // You may need to define this color variable
                }}
              >
                1% OF THE INDUSTRY
              </Typography>

              <Typography
                variant='h1'
                sx={{
                  fontSize: '52px',
                  fontWeight: 700,
                  lineHeight: '60px',
                  letterSpacing: '-0.01em',
                  marginTop: '0px',
                  color: 'black',
                }}
              >
                Hype got you here. Stay for the support.
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <section id='blog-list-container'>
          <Typography
            variant='h4'
            align='center'
            gutterBottom
            style={{ fontSize: '1.3rem', fontWeight: '800', marginTop: '40px' }}
          >
            Latest Blog Post
          </Typography>

          <Grid container spacing={2}>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Grid item xs={12} sm={6} md={4} key={blog.id}>
                  <div style={{ padding: '16px' }}>
                    <img src={img} alt='post' style={{ width: '100%' }} />
                    <div>
                      <Typography variant='body2' color='text.secondary'>
                        25 Apr 2022
                      </Typography>
                      <Typography variant='h5' component='div'>
                        {blog?.title}
                      </Typography>

                      <Grid
                        container
                        spacing={2}
                        justifyContent='space-between'
                        alignItems='center'
                      >
                        <Grid item>
                          <Typography variant='body2' color='text.secondary'>
                            {blog?.author && `by ${blog.author}`}
                          </Typography>
                        </Grid>

                        <Grid item>
                          <Typography variant='body2' color='text.secondary'>
                            <Link to={`/blogs/${blog.id}`}>Learn More</Link>
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </Grid>
              ))}
          </Grid>
        </section>
      </Container>
    </div>
  )
}

export default BlogList
