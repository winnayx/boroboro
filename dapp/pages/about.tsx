import {
  Box,
  Typography,
  Container,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GettingStartedRinkeby from "../src/features/getting-started/getting-started";

const useStyles = makeStyles({
  container: {
    marginTop: "30px",
    marginBottom: "30px",
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

export default function AboutPage() {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.container}>
      <Container maxWidth="sm">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <a href="#about">About</a>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <a href="#background">Project Background</a>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <a href="#howitworks">How It Works</a>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <a href="#rinkeby"> Setting up Rinkeby Test Network</a>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <a href="#contact">Contact</a>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
      <br />
      <br />
      <>
        <Typography
          variant="h2"
          id="about"
          className={classes.typographySpacingNormal}
        >
          About
        </Typography>
        <Container maxWidth="sm">
          <Typography variant="h4" className={classes.typographySpacingSmall}>
            What is BOROBORO?
          </Typography>
          <Typography className={classes.typographySpacingNormal}>
            BOROBORO is an open-source decentralized app (dApp) that provides
            provenance and authentication solutions to works of art using
            Ethereum and IPFS.
          </Typography>
          <Typography className={classes.typographySpacingNormal}>
            BOROBORO purposely avoids additional operations surrounding the
            transaction of artworks. It does not seek to provide a customizable
            smart contract that governs artist royalty or other shenanigans.
            BOROBORO is a dApp that focuses on abstracting the complexity of
            interacting and minting on Ethereum and blockchain for creatives and
            art businesses.
          </Typography>
          <Typography variant="h4" className={classes.typographySpacingSmall}>
            Motivation
          </Typography>
          <Typography className={classes.typographySpacingSmall}>
            Boroboro is an open-source project created for Stanford's CS191:
            Senior Project class.
          </Typography>
          <Typography className={classes.typographySpacingNormal}>
            Combining my interest in blockchain and contemporary art, I wanted
            to create a dApp that seeks to address certain problems within the
            art world for my senior project. Based on my researc, provenance
            appeared to be an issue that is naturally addressed and solvable by
            emerging blockchain technologies. As a result, BOROBORO was created.
          </Typography>

          <Typography
            id="contact"
            variant="h4"
            className={classes.typographySpacingSmall}
          >
            Contact
          </Typography>
          <Typography className={classes.typographySpacingLarge}>
            winniex [at] Stanford [dot] edu
          </Typography>
        </Container>
      </>
      <>
        <Typography
          variant="h2"
          id="background"
          className={classes.typographySpacingNormal}
        >
          Background
        </Typography>
        <Container maxWidth="sm">
          <Typography variant="h4" className={classes.typographySpacingSmall}>
            Why is authenticity & provenance a problem in the art world?{" "}
          </Typography>
          <Typography className={classes.typographySpacingNormal}>
            Provenance is the chronology of the ownership, custody or location
            of an art or historical object. Provenance has become increasingly
            important in helping establish the moral and legal validity of a
            chain of custody. Sometimes, a piece with interesting provenance may
            increase its value. Most of the time, however, provenance is
            important in confirming legitimate ownership and authenticity.
            Unscrupulous sellers may forge provenance. Read more on the problem
            of provenance: https://www.artbusiness.com/provwarn.html
          </Typography>
          <Typography variant="h4" className={classes.typographySpacingSmall}>
            How does Blockchain help?
          </Typography>
          <Typography className={classes.typographySpacingSmall}>
            By minting an artwork on the blockchain, creator(s) of an artwork
            can securely add, verify, and transfer the artwork. BOROBORO seeks
            to provide a simple and minimalistic interface to enable creatives
            to use the blockchain in such a way. The transaction history on the
            blockchain provides an digital record of provenance-related events.{" "}
          </Typography>
          <Typography className={classes.typographySpacingSmall}>
            Previously, there lacked a single source of truth for the provenance
            of artwork and it was highly disputable. With the help of
            blockchain, this problem can be improved and explore new
            territories. Forged provenance{" "}
          </Typography>

          <Typography className={classes.typographySpacingNormal}>
            If documents are lost, re-establishing provenance can be nearly
            impossible. Even with digital files, danger comes. If laptop
            crashes, file goes; if servers get compromised, they go too.
            Therefore, blockchain offers a secure solution.{" "}
          </Typography>

          <Typography
            id="contact"
            variant="h4"
            className={classes.typographySpacingSmall}
          >
            Why open-source matters to art provenance?
          </Typography>
          <Typography className={classes.typographySpacingNormal}>
            Currently, there exists paid agencies and companies that offer
            artists and galleries blockchain solutions to provenance and art
            certification. Nonetheless, a centralized institution governing the
            minting and transferral of works of art fundamentally goes against
            why blockchain would be helpful in solving the problems of
            provenance and authenticity.
          </Typography>
          <Typography className={classes.typographySpacingLarge}>
            As an open-source project, BOROBORO is rooted in the philosophy and
            practice of decentralization. Decentralization is the only
            sustainable and helpful medium through which we can provide a
            reliable single source of truth for works of art.
          </Typography>
        </Container>
      </>
      <>
        <Typography
          variant="h2"
          id="howitworks"
          className={classes.typographySpacingNormal}
        >
          How Does It Works?
        </Typography>
        <Container maxWidth="sm">
          <Typography variant="h4" className={classes.typographySpacingSmall}>
            Step 1
          </Typography>
          <Typography className={classes.typographySpacingNormal}>
            An artist or representing gallery connects their Metamask wallet to
            BOROBORO. They mint an artwork on Ethereum via BOROBORO using the
            mint page. Upon minting, their Metamask wallets will be deducted the
            corresponding amount of gas fees, which depends on the blockchain
            traffick at the time.
          </Typography>
          <Typography className={classes.typographySpacingNormal}>
            The artist/gallery receives a unique token ID upon successful
            minting. Their artwork becomes available to view on Explore page.
            Now, the work of art is officially on Ethereum, in which
            corresponding metadata (date, artist, images) are hosted on IPFS
            (Interplanetary File System).{" "}
          </Typography>

          <Typography variant="h4" className={classes.typographySpacingSmall}>
            Step 2, 3, 4...& Beyond
          </Typography>
          <Typography className={classes.typographySpacingNormal}>
            When the title of the artwork changes hands, the current owner
            updates the ownership by submitting a request on the update page.
            The Metamask wallet address must correspond to the current owner of
            the artwork.
          </Typography>
          <Typography className={classes.typographySpacingLarge}>
            First, the owner provides the token ID of the artwork that they want
            to update. Upon verification of rightful ownership, they input the
            wallet address of the new owner.{" "}
          </Typography>
        </Container>
      </>
      <div id="rinkeby">
        <GettingStartedRinkeby />
      </div>
    </Container>
  );
}
