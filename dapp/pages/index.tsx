import Head from "next/head";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";

const StyledContainer = styled(Container)({
  padding: "100px 30px",
  display: "flex",
  textAlign: "center",
  flexDirection: "column",
  alignItems: "center",
  color: "white",
});

const StyledButton = styled(Button)({
  background: "white",
  color: "black",
  borderRadius: 3,
  border: 0,
  height: 48,
  padding: "0 30px",
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  margin: "40px 0 0",
});

export default function Home() {
  return (
    <div
      style={{ background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)" }}
    >
      <Head>
        <title>CS191 Project</title>
        <meta name="description" content="CS191 Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <StyledContainer maxWidth="sm">
          <Typography variant="h1" align="center">
            Boroboro &#9641;
          </Typography>

          <Typography variant="h4" align="center">
            Secure Provence & Authenticity of Artwork via Blockchain
          </Typography>
          <StyledButton variant="contained" href="/mint">
            Mint an Artwork
          </StyledButton>
        </StyledContainer>
      </div>
    </div>
  );
}
