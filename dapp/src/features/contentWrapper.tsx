import { Box } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

interface ContentWrapperProps {
  children?: any;
}

const StyledBox = styled(Box)({
  padding: "30px",
  maxWidth: "700px",
});

export const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
}): JSX.Element => {
  return <StyledBox>{children}</StyledBox>;
};

export default ContentWrapper;
