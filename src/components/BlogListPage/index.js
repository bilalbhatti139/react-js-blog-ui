import { Link } from 'react-router-dom'

import useBlogs from '../../hooks/useBlogs'
import Loading from '../FetchStateUI/Loading'
import Error from '../FetchStateUI/Error'

import { Container, Grid, Typography } from '@mui/material'
import img from '../../assets/images/post1.png'
import { useState, useEffect } from 'react'

const BlogList = () => {

  const [state400, setState400] = useState(false);
  const [state600, setState600] = useState(false);

  const { blogs, isLoadingBlogs, isBlogsError } = useBlogs()
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 400) {
        setState400(true);
        setState600(false);
      } else if (screenWidth < 600) {
        setState400(false);
        setState600(true);
      } else {
        setState400(false);
        setState600(false);
      }
    };

    // Initial call to set the initial state
    handleResize();

    // Add event listener to handle window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isLoadingBlogs) {
    return <Loading />
  }

  if (isBlogsError) {
    return <Error />
  }



  return (
    <div>
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
                  fontSize:`${state400 ? "30px" : state600 ? "40px" : "52px"}`  ,
                  lineHeight:`${state400 ? "40px" : state600 ? "50px" : "52px"}`  ,
                
                  fontWeight: 700,
                 
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
                      <Typography
                        sx={{
                          color: '#696969',
                          fontWeight: '500',
                          fontSize: '12px',
                          marginBottom: '0px',
                        }}
                      >
                        25 Apr 2022
                      </Typography>
                      <Typography
                        sx={{
                          color: '#000',
                          fontWeight: '700',
                          fontSize: '12px',
                          marginTop: '0px',
                        }}
                      >
                        {blog?.title}
                      </Typography>

                      <Grid
                        container
                        spacing={2}
                        justifyContent='space-between'
                        alignItems='center'
                      >
                        <Grid>
                          <Typography
                            sx={{
                              marginLeft: '16px',
                              fontWeight: '500',
                              fontSize: '14px',
                            }}
                          >
                            {blog?.author && `by ${blog.author}`}
                          </Typography>
                        </Grid>

                        <Grid>
                          <Typography component={Link} to={`/blogs/${blog.id}`}>
                            Learn More
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
