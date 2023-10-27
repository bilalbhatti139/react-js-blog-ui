import { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useUsers from "../../hooks/useUsers";
import { UserContext } from "../../contexts/UserContext";
import Loading from "../FetchStateUI/Loading";
import Error from "../FetchStateUI/Error";
import { Typography, Container, Grid, Paper, Avatar } from "@mui/material";
import line from "../../assets/images/Line.png";
import img from "../../assets/images/post2.png";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CallMadeIcon from "@mui/icons-material/CallMade";

const User = () => {
  const [state400, setState400] = useState(false);
  const [state800, setState800] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 400) {
        setState400(true);
        setState800(false);
      } else if (screenWidth < 800) {
        setState400(false);
        setState800(true);
      } else {
        setState400(false);
        setState800(false);
      }
    };

    // Initial call to set the initial state
    handleResize();

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { id } = useParams();

  const [loggedInUser] = useContext(UserContext);
  const { oneUser, isLoadingOneUser, isOneUserError } = useUsers(id);

  if (!loggedInUser) {
    return <div>Log in to view this page</div>;
  }

  if (isLoadingOneUser) {
    return <Loading />;
  }

  if (isOneUserError) {
    return <Error />;
  }

  // const user = users.find(user => user.id === id)
  const user = oneUser;
  console.log("state", state400, state800);
  return (
    <>
      {/* <section>
        <Typography variant='h2'>{user.name}</Typography>
        <List>
          {user.blogs.map((blog) => (
            <ListItem key={blog.id}>
              <ListItemText
                primary={<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>}
              />
            </ListItem>
          ))}
        </List>
      </section> */}

      <Container
        maxWidth="2400px"
        style={{
          backgroundImage: `url(${line})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#f8f9fb",
          height: "250px",
        }}
      >
        <Container maxWidth="md">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              maxWidth: "100%",
              paddingTop:`${state400 ? "10px" : state800 ? "15px" : "30px"}`  ,
              paddingBottom:`${state400 ? "10px" : state800 ? "15px" : "30px"}`  
            }}
          >
            <div
              style={{
                maxWidth: `${state400 ? "" : state800 ? "100%" : "50%"}`,
              }}
            >
              <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{ textAlign: "left", display: "flex", gap: "15px",  flexDirection:`${state400 ? "column":"row"}`}}
                >
                  <Avatar
                    src={img}
                    alt="post"
                    sx={{ width: 120, height: 120 }}
                  />
                  <div>
                    <Typography
                      variant="h6"
                      style={{
                        fontWeight: "700",
                        fontSize: `${
                          state400 ? "16px" : state800 ? "16px" : "24px"
                        }`,
                        marginTop: "10px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div> {user?.name} </div>
                      {state400 ? (
                        <div
                          style={{
                            backgroundColor: "#427ef8",
                            marginLeft: "5px",
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          <span>Total Blogs</span>
                          <span> {user?.blogs?.length}</span>
                        </div>
                      ) : state800 ? (
                        <div
                          style={{
                            backgroundColor: "#427ef8",
                            marginLeft: "5px",
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          <span>Total Blogs</span>
                          <span> {user?.blogs?.length}</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </Typography>
                    <Typography variant="body1" sx={{ margin: "0px" }}>
                      Lorem Ipsum has been the industrys standard dummy text
                      ever since
                    </Typography>
                    <Typography
                      component={Link}
                      to="/users"
                      variant="body2"
                      color="#4478F9"
                      sx={{
                        fontWeight: "700",
                        "& a": {
                          textDecoration: "none",
                          color: "inherit",
                          transition: "text-decoration 0.3s", // Add a transition for smooth effect
                          "&": {
                            textDecoration: "underline",
                          },
                        },
                      }}
                    >
                      <div style={{ display: "flex", gap: "5px" }}>
                        <KeyboardBackspaceIcon />{" "}
                        <p style={{ margin: "0px" }}>Back To Users</p>
                      </div>
                    </Typography>
                  </div>
                </div>
              </Grid>
            </div>
            <div
              style={{
                display: `${state400 ? "none" : state800 ? "none" : ""}`,
              }}
            >
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Paper
                  sx={{
                    textAlign: "right",
                    padding: "20px 20px",
                    borderRadius: "5px",
                    backgroundColor: "#4478F9",
                  }}
                >
                  <Typography
                    variant="body1"
                    align="center"
                    sx={{ fontWeight: 700, fontSize: "20px", color: "white" }}
                  >
                    Total Blog
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    sx={{
                      fontWeight: 700,
                      fontSize: "30px",
                      color: "white",
                    }}
                  >
                    {user?.blogs?.length}
                  </Typography>
                </Paper>
              </Grid>
            </div>
          </div>
        </Container>
      </Container>
    

      <Container>
        <section id="blog-list-container">
          <Grid container spacing={4} sx={{ marginTop: "40px" }}>
            {user.blogs.map((blog) => (
              <Grid item xs={12} sm={6} md={6} key={blog.id}>
                <img src={img} style={{ width: "100%" }} />

                <Typography variant="h3">{blog.title}</Typography>
                <Typography variant="body1" className="caption">
                  Efficiently unleash cross-media information without
                  cross-media value. Quickly maximize. Efficiently unleash
                  cross-media information without cross-media value. Quickly
                  maximize. Efficiently unleash cross-media.
                </Typography>

                <Typography
                  variant="body2"
                  color="#2B63D9"
                  sx={{
                    marginBottom: "5px",
                    fontWeight: "500",
                    "& a": {
                      textDecoration: "none",
                      color: "inherit",
                      transition: "text-decoration 0.3s", // Add a transition for smooth effect
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    },
                  }}
                >
                  <Link to={`/blogs/${blog.id}`}>Read More</Link>
                  <CallMadeIcon sx={{ fontSize: "16px" }} />
                </Typography>
              </Grid>
            ))}
          </Grid>
        </section>
      </Container>
    </>
  );
};

export default User;
