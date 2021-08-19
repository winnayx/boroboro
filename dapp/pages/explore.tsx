import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Box, Typography, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArtworkCard from "../src/features/ArtworkCard";
import { getWeb3, getAllTokens } from "../src/api/web3";
import { MetadataSchema } from "../src/api/schemas";

const useStyles = makeStyles({
  container: {
    padding: "30px",
    width: "100%",
  },
});

export default function ExplorePage() {
  const [metadatas, setMetadatas] = useState<MetadataSchema[]>([]);
  const classes = useStyles();

  useEffect(() => {
    getAllTokens().then((metadatas: MetadataSchema[]) =>
      setMetadatas(metadatas)
    );
  }, []);

  return (
    <Box className={classes.container}>
      <Typography variant="h2" gutterBottom>
        Explore
      </Typography>
      <Box style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
        {metadatas &&
          metadatas.length > 0 &&
          metadatas
            .slice(0)
            .reverse()
            .map((metadata, i, metadatas) => (
              <Link
                href={`/artwork/${metadatas.length - i}`}
                passHref
                key={metadata.title}
              >
                <a>
                  <Box key={metadata.title} maxWidth="250px" margin="15px">
                    <ArtworkCard
                      metadata={metadata}
                      tokenId={metadatas.length - i}
                    />
                  </Box>
                </a>
              </Link>
            ))}
      </Box>
    </Box>
  );
}
