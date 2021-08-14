import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Box, Typography, TextField } from "@material-ui/core";
import { styled, makeStyles } from "@material-ui/core/styles";
import ContentWrapper from "../src/features/contentWrapper";
import Section from "../src/features/section";
import { ArtworkCard } from "../src/features/ArtworkCard";
import { getWeb3, detectAccountChange } from "../src/api/web3";

declare let window: any;

export default function ExplorePage() {
  const [tokens, setTokens] = useState<string[]>([]);
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
                  from: "0x3b634db3a35da1488aeafb18f1be9108d8408e2c",
                })
                .then((url: string) => url);
            });

            Promise.all(newTokens).then(function (results) {
              setTokens(results);
              console.log(tokens);
            });
          }
        }
      );
    });
  }, []);

  return (
    <ContentWrapper>
      <Typography variant="h2" gutterBottom>
        Explore
      </Typography>
      <Section>
        {tokens.map((url, i) => (
          <Link href={`/artwork/${i}`} passHref key={i}>
            <a target="_blank">
              <Box key={i} maxWidth="250px" margin="15px">
                <ArtworkCard tokenId={i} metadataUrl={url} />
              </Box>
            </a>
          </Link>
        ))}
      </Section>
    </ContentWrapper>
  );
}
