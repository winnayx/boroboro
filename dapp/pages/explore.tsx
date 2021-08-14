import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Box, Typography, TextField } from "@material-ui/core";
import { styled, makeStyles } from "@material-ui/core/styles";
import ContentWrapper from "../src/features/contentWrapper";
import Section from "../src/features/section";
import ArtworkCard from "../src/features/ArtworkCard";
import { getWeb3, detectAccountChange } from "../src/api/web3";
import { MetadataSchema } from "../src/api/schemas";
import { SettingsSystemDaydreamTwoTone } from "@material-ui/icons";
declare let window: any;

export default function ExplorePage() {
  const [metadatas, setMetadatas] = useState<MetadataSchema[]>([]);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState<string>("");
  if (typeof window !== "undefined") {
    window.ethereum.on("accountsChanged", function (accounts: string[]) {
      console.log("account changed", accounts[0]);
      setAccount(accounts[0]);
    });
  }

  useEffect(() => {
    getWeb3().then(({ accts, contractInstance }) => {
      setAccount(accts[0]);
      console.log(contractInstance);
      contractInstance.methods.totalSupply().call(
        {
          from: "0x3b634db3a35da1488aeafb18f1be9108d8408e2c",
        },
        function (err: any, res: any) {
          if (err) {
            console.log("ERROR in totalSupply call", err);
          } else {
            const arr = Array(parseInt(res, 10)).fill(0); // creates arr [0,0...]
            const newTokens = arr.map(function (item, i) {
              return contractInstance.methods
                .tokenURI(i + 1) // tokenID begins at 1
                .call({
                  from: account,
                })
                .then((url: string) => {
                  return fetch(url, { redirect: "follow" }).then((data) =>
                    data.json()
                  );
                });
            });

            Promise.all(newTokens).then((results) => setMetadatas(results));
          }
        }
      );
    });
  }, []);

  useEffect(() => {
    console.log(metadatas);
  }, [metadatas]);

  return (
    <ContentWrapper>
      <Typography variant="h2" gutterBottom>
        Explore
      </Typography>
      <Section>
        {metadatas.length > 0 &&
          metadatas.map((metadata, i) => (
            <Link href={`/artwork/${i}`} passHref key={metadata.title}>
              <a target="_blank">
                <Box key={metadata.title} maxWidth="250px" margin="15px">
                  <ArtworkCard metadata={metadata} tokenId={i} />
                </Box>
              </a>
            </Link>
          ))}
      </Section>
    </ContentWrapper>
  );
}
