import React from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import StarIcon from '@material-ui/icons/StarBorder';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import CardMedia from "@material-ui/core/CardMedia";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  postTitle: {
    fontSize: "16px",
    textAlign: "left",
  },
  postText: {
    display: "flex",
    justifyContent: "left",
    alignItems: "baseline",
    fontSize: "12px",
    textAlign: "left",
    marginBottom: theme.spacing(2),
  },
}));


const Course = (props) => {
  const { courses } = props;
  const classes = useStyles();
  
  console.log(courses);
  console.log(courses.length);


  if (!courses || courses.length === 0 || !courses[0].id)
    return <p>Can not find any courses, sorry</p>;
  return (
    <React.Fragment>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {courses.map((Course) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={Course.title}
              xs={12}
              sm={Course.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={Course.title}
                  subheader={Course.subheader}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  action={Course.title === "Pro" ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />

                <NavLink
                  to={"/courses/" + Course.slug}
                  color="textPrimary"
                  
                  className={classes.link}
                >
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                </NavLink>

                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      ${Course.price}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      /mo
                    </Typography>
                  </div>
                  <ul>
                  {/* {Course.description.map((line) => (
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                          key={line}
                        >
                          {line}
                        </Typography>
                      ))} */}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={Course.buttonVariant}
                    color="primary"
                  >
                    {Course.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Course
