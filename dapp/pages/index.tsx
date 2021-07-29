import Head from "next/head";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";

const StyledContainer = styled(Container)({
  padding: "30px",
  display: "flex",
  textAlign: "center",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "32px",
  paddingBottom: "64px",
});

const StyledButton = styled(Button)({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  borderRadius: 3,
  border: 0,
  color: "white",
  height: 48,
  padding: "0 30px",
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  margin: "15px 0",
});

export default function Home() {
  return (
    <div>
      <Head>
        <title>CS191 Project</title>
        <meta name="description" content="CS191 Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <StyledContainer maxWidth="sm">
          <Typography variant="h2" align="center">
            Art Provenance Blockchain Tool
          </Typography>
          <StyledButton variant="contained" href="/mint">
            Mint an Artwork
          </StyledButton>
        </StyledContainer>
      </div>
    </div>
  );
}
