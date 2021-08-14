import { useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  withStyles,
} from "@material-ui/core";
import { ArtworkCardProps } from "../api/schemas";
// import { ArtworkMedia } from "./ArtworkMedia";
import Link from "next/link";

const StyledButton = withStyles({
  root: {
    width: "100%",
  },
})(Button);

export const ArtworkCard: React.FC<ArtworkCardProps> = ({
  tokenId,
  metadata,
}) => {
  return (
    <Card>
      <CardContent>
        <img src={metadata.fileUrl} width="250px" />
      </CardContent>
      <Typography>{metadata.artist}</Typography>

      {/* <CardActions>
        {metadata && (
          <Box flexGrow={1}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle1">
                {metadata.description}
              </Typography>

              <Typography variant="caption">
                Editions:&nbsp;
                {tokenId}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">
                {String(metadata.description).slice(0, 80)}
                {String(metadata.description).length > 80 && <>...</>}
              </Typography>
            </Box>
          </Box>
        )}
      </CardActions> */}

      <CardActions>
        <Link href={`/sell/`} passHref>
          <StyledButton variant="contained" color="primary">
            Sell now
          </StyledButton>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ArtworkCard;
