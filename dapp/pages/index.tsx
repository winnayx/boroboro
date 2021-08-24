import Head from "next/head";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
const useStyles = makeStyles({
  banner: {
    padding: "100px 30px",
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    display: "flex",
    height: "250px",
  },
  button: {
    background: "white",
    color: "black",
    borderRadius: 3,
    border: 0,
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    margin: "40px 0 0",
  },
  hero: {
    padding: "70px 0",
  },
  gradient: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    color: "white",
  },
  motivation: {
    color: "white",
    textDecoration: "none",
    "&:hover": {
      color: "#6495ED",
    },
  },
});

export default function Home() {
  const classes = useStyles();
  return (
    <div>
      <Box className={classes.hero + " " + classes.gradient}>
        <Container maxWidth="sm" className={classes.banner}>
          <Typography variant="h1" align="center">
            BOROBORO
          </Typography>

          <Typography variant="h4" align="center">
            Secure Provence & Authenticity of Artwork via Blockchain
          </Typography>
          <Button className={classes.button} variant="contained" href="/mint">
            Mint an Artwork
          </Button>
        </Container>
      </Box>
      <Box className={classes.hero}>
        <Container maxWidth="md" className={classes.container}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <Typography variant="h2">Explore</Typography>
              <Typography variant="h5">
                Check out existing artworks secured on Ethereum using BOROBORO
              </Typography>
              <Button
                className={classes.button}
                variant="contained"
                href="/explore"
              >
                Explore
              </Button>
            </Grid>
            <Grid item xs={6}>
              <img
                src="https://i.pinimg.com/originals/90/90/75/9090750112ab9e2bfeb9ea2872abd02e.jpg"
                style={{ height: "250px", width: "100%" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className={classes.hero + " " + classes.gradient}>
        <Container maxWidth="md" className={classes.container}>
          <Grid container spacing={6}>
            <Grid item xs={5}>
              <img
                src="https://ago.ca/sites/default/files/styles/image_large/public/2017-06/049A0858.jpg?itok=w-gFzozN"
                style={{ height: "250px", width: "100%" }}
              />
            </Grid>

            <Grid item xs={7}>
              <Typography variant="h2">Update Provenance</Typography>
              <Typography variant="h5">
                When a minted artwork changes hands, update its provenance by
                recording it on the blockchain
              </Typography>
              <Button
                className={classes.button}
                variant="contained"
                href="/update"
              >
                Update Provenance
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className={classes.hero}>
        <Container maxWidth="md" className={classes.container}>
          <Grid container spacing={6}>
            <Grid item xs={7}>
              <Typography variant="h2">Mint an Artwork</Typography>
              <Typography variant="h5">
                Establish the authenticity and ownership of artwork on Ethereum
                using BOROBORO.
              </Typography>
              <Button
                className={classes.button}
                variant="contained"
                href="/mint"
              >
                Mint an Artwork
              </Button>
            </Grid>
            <Grid item xs={5}>
              <img
                src="https://cdnb.artstation.com/p/assets/images/images/035/570/141/large/george-brx-03-15-ethereum-planet.jpg?1615310626"
                style={{ height: "250px", width: "100%" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className={classes.hero + " " + classes.gradient}>
        <Container maxWidth="md" className={classes.container}>
          <Link href="/about" passHref>
            <Typography
              variant="h1"
              component="a"
              className={classes.motivation}
            >
              Read about Motivation
            </Typography>
          </Link>
        </Container>
      </Box>
    </div>
  );
}
