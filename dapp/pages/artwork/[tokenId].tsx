import { Box, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { getToken, getOwner } from "../../src/api/web3";
import { useEffect, useState } from "react";
import { MetadataSchema, ArtworkPageProps } from "../../src/api/schemas";
import ContentWrapper from "../../src/features/contentWrapper";
import Image from "next/image";

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

export default function ArtworkPage({ query: { tokenId } }: ArtworkPageProps) {
  const classes = useStyles();
  const [metadata, setMetadata] = useState<MetadataSchema>(initialMetadata);
  const [owner, setOwner] = useState("");

  useEffect(() => {
    getToken(parseInt(tokenId)).then((metadata) => setMetadata(metadata));
  }, [tokenId]);

  useEffect(() => {
    getOwner(parseInt(tokenId)).then((owner) => setOwner(owner));
  }, [tokenId]);

  return (
    <ContentWrapper>
      {metadata && (
        <>
          <Typography variant="h2" gutterBottom>
            {metadata.title}
          </Typography>
          <Box>
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

            <img src={metadata.fileUrl} className={classes.image} />
          </Box>
        </>
      )}
    </ContentWrapper>
  );
}

ArtworkPage.getInitialProps = async ({ query }: ArtworkPageProps) => {
  return { query };
};
