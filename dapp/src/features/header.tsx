import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "black",
  },
  siteTitle: {
    flexGrow: 1,
    textDecoration: "none",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textTransform: "uppercase",
  },
}));

export const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Link href="/" passHref>
            <Typography
              variant="h6"
              component="a"
              className={classes.siteTitle}
            >
              Boroboro &#9641;
            </Typography>
          </Link>
          <Link href="/explore" passHref>
            <Typography variant="h6" component="a" className={classes.title}>
              Explore
            </Typography>
          </Link>
          <Link href="/mint" passHref>
            <Typography variant="h6" component="a" className={classes.title}>
              Mint Art
            </Typography>
          </Link>
          <Link href="/update" passHref>
            <Typography variant="h6" component="a" className={classes.title}>
              Update Art
            </Typography>
          </Link>
          <Link href="/about" passHref>
            <Typography variant="h6" component="a" className={classes.title}>
              About
            </Typography>
          </Link>

          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
