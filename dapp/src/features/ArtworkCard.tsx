import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  withStyles,
} from "@material-ui/core";
// import { MetadataJSONSchema, Token } from "~/api";
// import { ArtworkMedia } from "./ArtworkMedia";
import Link from "next/link";

const StyledButton = withStyles({
  root: {
    width: "100%",
  },
})(Button);

export const ArtworkCard = (tokenId: number, metadataUrl: string) => {
  return (
    <Card data-target="artwork-card">
      <CardContent>
        <img
          src="https://bafybeifscrqr2bd7khgu6j7jlmjf5x6koh632pd545w5sp6fbumq2iyrkq.ipfs.infura-ipfs.io/"
          width="250px"
        />
      </CardContent>
      {/* 
      <CardActions>
        {metadata && (
          <Box flexGrow={1}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle1">
                {metadata.properties.name.description}
              </Typography>

              <Typography variant="caption">
                Editions:&nbsp;
                {token.tokenSupply}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">
                {String(metadata.properties.description.description).slice(
                  0,
                  80
                )}
                {String(metadata.properties.description.description).length >
                  80 && <>...</>}
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
