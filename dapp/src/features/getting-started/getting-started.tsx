import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import LaunchIcon from "@material-ui/icons/Launch";

import SelectRinkeby1 from "./rinkeby/1.png";
import SelectRinkeby2 from "./rinkeby/2.png";
import ImportAccount1 from "./import-account/1.png";
import ImportAccount2 from "./import-account/2.png";

const useStyles = makeStyles({
  container: {
    margin: "50px",
  },
  typographySpacingSmall: {
    marginBottom: "10px",
  },
  typographySpacingNormal: {
    marginBottom: "20px",
  },
  typographySpacingLarge: {
    marginBottom: "30px",
  },
});

export default function GettingStartedRinkeby() {
  const classes = useStyles();
  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Setting up Rinkeby Test Network
      </Typography>

      <Typography variant="h4" className={classes.typographySpacingSmall}>
        Prerequisites
      </Typography>
      <Box>
        <Typography
          component="a"
          href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
          gutterBottom
        >
          Metamask chrome extension is installed &nbsp;
          <LaunchIcon fontSize="small" />
        </Typography>
      </Box>

      <Box marginTop="20px" display="inline-flex" flexDirection="column">
        <Typography variant="h4" className={classes.typographySpacingSmall}>
          Step 1. Select Rinkeby test network
        </Typography>
        <br />
        <div>
          <img width="250px" height="400px" src={SelectRinkeby1.src} />
          <img width="250px" height="400px" src={SelectRinkeby2.src} />
        </div>
      </Box>

      <Box marginTop="30px">
        <Typography variant="h4" className={classes.typographySpacingSmall}>
          Step 2. Import network accounts
        </Typography>
        <Typography>
          There is a testing acccount with Ethereum readily available in the
          network that can be imported by private key:
        </Typography>
        <Typography>
          <b>
            0fe5945d6051c231ddb436709a806eaac7147071185194484f015178c390e203
          </b>
        </Typography>
        <br />
        <Typography gutterBottom>
          <b>Account import guide</b>
        </Typography>
        <Box display="flex" flexDirection="column">
          <div>
            <img width="250px" height="400px" src={ImportAccount1.src} />
            <img width="250px" height="400px" src={ImportAccount2.src} />
          </div>
        </Box>
      </Box>
    </Box>
  );
}
