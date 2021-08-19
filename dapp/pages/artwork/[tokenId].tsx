import { getToken, getOwner } from "../../src/api/web3";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MetadataSchema } from "../../src/api/schemas";
import ContentWrapper from "../../src/features/contentWrapper";
import BigNumber from "bignumber.js";
import { Button, Box, Typography, TextField } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

const initialMetadata = {
  title: "",
  artist: "",
  year: "",
  fileUrl: "",
};

const useStyles = makeStyles({
  image: {
    width: "500px",
  },
});

export default function ArtworkPage() {
  const router = useRouter();
  const classes = useStyles();
  const { tokenId } = router.query;
  const [metadata, setMetadata] = useState<MetadataSchema>(initialMetadata);
  const [owner, setOwner] = useState("");

  useEffect(() => {
    getToken(new BigNumber(tokenId)).then((metadata) => setMetadata(metadata));
  }, []);

  useEffect(() => {
    getOwner(new BigNumber(tokenId)).then((owner) => setOwner(owner));
  }, []);

  return (
    <ContentWrapper>
      {metadata && (
        <>
          <Typography variant="h2" gutterBottom>
            {metadata.title}
          </Typography>
          <Box>
            <img src={metadata.fileUrl} className={classes.image} />
            <Box>
              <List>
                <ListItem>
                  <ListItemText>{"Artist: " + metadata.artist}</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>{"Year: " + metadata.year}</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>{"Current Owner: " + owner}</ListItemText>
                </ListItem>
              </List>
            </Box>
          </Box>
        </>
      )}
    </ContentWrapper>
  );
}
