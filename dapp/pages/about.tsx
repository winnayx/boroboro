import { Box, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

const Section = styled(Box)({
  margin: "30px",
});

export default function AboutPage() {
  return (
    <Section>
      <Typography variant="h2">About</Typography>
      <Typography variant="h4">What is Boroboro?</Typography>

      <Typography>
        Boroboro uses the Ethereum blockchain to provide provenance and
        authentication solution to contemporary artwork. Artists and galleries
        mints an artwork on Boroboro to record its creation and various metadata
        on the blockchain. When the artwork is transacted, the current owner of
        the artwork updates the ownership of the artwork. Every recorded
        transaction on the blockchain cannot be modified and therefore can be
        used as a certificate of authenticity for the artwork.
      </Typography>
      <br />
      <Typography variant="h4">Motivation</Typography>
      <Typography>
        Boroboro is an open-source project created for Stanford's CS191: Senior
        Project class.
      </Typography>
      <br />
      <Typography variant="h4">Contact</Typography>
      <Typography>winniex [at] Stanford [dot] edu</Typography>
    </Section>
  );
}
