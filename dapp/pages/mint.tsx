import {
  Button,
  Box,
  Typography,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import Web3 from "web3";
import { useEffect, useState } from "react";
import { styled } from "@material-ui/core/styles";
import { AbiItem } from "web3-utils";
import DropIcon from "../src/features/dropzone/dropIcon.svg";
import ContentWrapper from "../src/features/contentWrapper";

import { ARTWORK_ADDRESS, ARTWORK_ABI } from "../contractConfig";

declare let window: any;
const initialState = {
  title: "",
  description: "",
  year: "",
  files: [],
};

const required = (value: string) =>
  typeof value !== "undefined" && value ? undefined : "This field is required";

const minting = false;

const Section = styled(Box)({});
const StyledTextField = styled(TextField)({
  margin: "0 0 20px 0",
  width: "100%",
});
const StyledDropzoneArea = styled(DropzoneArea)({});

export default function MintPage() {
  const [artwork, setArtwork] = useState(initialState);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState({});

  useEffect(() => {
    const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    web3.eth.requestAccounts().then((accts) => setAccount(accts[0]));
    const contractInstance = new web3.eth.Contract(
      ARTWORK_ABI as AbiItem[],
      ARTWORK_ADDRESS
    );
    setContract(contractInstance);
  }, []);

  useEffect(() => {
    function detectAccountChange() {
      if (window.ethereum) {
        window.ethereum.on("accountsChanged", (accts: any) => {
          const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
          web3.eth.requestAccounts().then((accounts) => setAccount(accts[0]));
        });
      }
    }
    detectAccountChange();
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(artwork);
  };

  const handleChange = (event: any) => {
    event.preventDefault();
    switch (event.target.id) {
      case "title":
        setArtwork({
          ...artwork,
          title: event.target.value,
        });
        break;
      case "description":
        setArtwork({
          ...artwork,
          description: event.target.value,
        });
        break;
      case "year":
        setArtwork({
          ...artwork,
          year: event.target.value,
        });
        break;
      default:
        console.log("weird");
        break;
    }
  };

  const handleFileUpload = (files: any) => {
    setArtwork({
      ...artwork,
      files: files,
    });
  };

  return (
    <ContentWrapper>
      <form noValidate onSubmit={handleSubmit}>
        <Section>
          <Typography variant="h2" gutterBottom>
            Create new Item
          </Typography>
        </Section>
        <Section>
          <StyledDropzoneArea onChange={handleFileUpload} />
        </Section>

        <Section>
          <StyledTextField
            id="title"
            label="Artwork Title"
            required
            onChange={handleChange}
          />
          <StyledTextField
            id="description"
            label="Artwork Description"
            multiline
            rows={4}
            onChange={handleChange}
          />
          <StyledTextField
            id="year"
            label="Creation Year"
            required
            onChange={handleChange}
          />
        </Section>
        <Section>
          <Typography variant="h5" gutterBottom>
            Assign Roles
          </Typography>
        </Section>
        <Section>
          <StyledTextField
            id="publisher"
            label="Publisher"
            required
            onChange={handleChange}
          />
          <StyledTextField
            id="creator"
            label="Creator"
            required
            onChange={handleChange}
          />
        </Section>

        <Button type="submit" variant="contained" color="primary">
          Mint Artwork
        </Button>
      </form>
    </ContentWrapper>
  );
}
