import { useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  withStyles,
  makeStyles,
} from "@material-ui/core";
import { ArtworkCardProps } from "../api/schemas";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
  },
});

export const ArtworkCard: React.FC<ArtworkCardProps> = ({
  tokenId,
  metadata,
}) => {
  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <CardMedia
          component="img"
          image={metadata.fileUrl}
          className={classes.media}
          title={metadata.title}
        />
      </CardContent>

      <CardActions>
        {metadata && (
          <Box flexGrow={1}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle1">{metadata.title}</Typography>

              <Typography variant="caption">
                Token ID:&nbsp;
                {tokenId}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle2">
                {String(metadata.artist).slice(0, 80)}
              </Typography>
              <Typography variant="subtitle2">
                {String(metadata.year)}
              </Typography>
            </Box>
          </Box>
        )}
      </CardActions>

      {/* <CardActions>
        <Link href={`/sell/`} passHref>
          <StyledButton variant="contained" color="primary">
            Sell now
          </StyledButton>
        </Link>
      </CardActions> */}
    </Card>
  );
};

export default ArtworkCard;
