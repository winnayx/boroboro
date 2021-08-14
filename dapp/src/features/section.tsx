import { Box } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

interface SectionProps {
  children?: any;
}

const StyledSection = styled(Box)({
  margin: "20px 0",
});

export const Section: React.FC<SectionProps> = ({ children }): JSX.Element => {
  return <StyledSection>{children}</StyledSection>;
};

export default Section;
