import { Box } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

const Section = styled(Box)({
  margin: "30px",
  background: "red",
});

export default function AboutPage() {
  return (
    <Section>
      <h1>hello</h1>
    </Section>
  );
}
