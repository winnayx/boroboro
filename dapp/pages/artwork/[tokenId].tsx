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

function ArtworkPage({ query: { tokenId } }) {
  const classes = useStyles();
  const [metadata, setMetadata] = useState<MetadataSchema>(initialMetadata);
  const [owner, setOwner] = useState("");

  // useEffect(() => {
  //   if (tokenId) {
  //     console.log("update: ", tokenId);
  //   }
  // }, [tokenId]);

  useEffect(() => {
    getToken(tokenId).then((metadata) => setMetadata(metadata));
  }, [tokenId]);

  useEffect(() => {
    getOwner(tokenId).then((owner) => setOwner(owner));
  }, [tokenId]);

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

ArtworkPage.getInitialProps = async ({ query }) => {
  return { query };
};

export default ArtworkPage;
