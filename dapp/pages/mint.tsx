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
import { styled, makeStyles } from "@material-ui/core/styles";
import { AbiItem } from "web3-utils";
import DropIcon from "../src/features/dropzone/dropIcon.svg";
import ContentWrapper from "../src/features/contentWrapper";
import { uploadFileToIPFS, uploadMetadata } from "../src/api/ipfs";
import { ARTWORK_ADDRESS, ARTWORK_ABI } from "../contractConfig";

declare let window: any;
const initialState = {
  title: "",
  artist: "",
  description: "",
  year: "",
  files: [],
};

const required = (value: string) =>
  typeof value !== "undefined" && value ? undefined : "This field is required";

const minting = false;

const Section = styled(Box)({
  margin: "20px 0",
});

const StyledDropzoneArea = styled(DropzoneArea)({});

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    margin: "15px 0",
  },
});

export default function MintPage() {
  const [artwork, setArtwork] = useState(initialState);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState({});
  const classes = useStyles();
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

  const constructMetadata = (artwork: any, fullPath: string) => {
    const { title, artist, description, year } = artwork;
    return {
      title: title,
      artist: artist,
      description: description,
      year: year,
      fileUrl: fullPath,
    };
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(artwork);
    console.log("contract", contract.methods);
    // use web3.js to call mint function to mint the artwork!
    // what does minting an artwork mean? however?

    uploadFileToIPFS(artwork.files[0])
      .then(({ fullPath, path }) => {
        const metadata = constructMetadata(artwork, fullPath);
        uploadMetadata(metadata)
          .then((res) => console.log(res))
          .catch((error) => console.log(error));
      })
      .catch((err) => console.log(err));
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
      case "artist":
        setArtwork({
          ...artwork,
          artist: event.target.value,
        });
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
            Add New Artwork
          </Typography>
        </Section>
        <Section>
          <StyledDropzoneArea onChange={handleFileUpload} />
        </Section>

        <Section>
          <TextField
            id="title"
            label="Artwork Title"
            required
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            id="artist"
            label="Artist"
            required
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            id="year"
            label="Creation Year"
            fullWidth
            margin="normal"
            required
            onChange={handleChange}
          />
          <TextField
            id="description"
            label="Artwork Description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            onChange={handleChange}
          />
        </Section>
        <Section>
          <Typography variant="h5" gutterBottom>
            Assign Roles
          </Typography>
        </Section>
        <Section>
          <TextField
            id="publisher"
            label="Publisher"
            fullWidth
            margin="normal"
            required
            onChange={handleChange}
          />
          <TextField
            id="creator"
            label="Creator"
            fullWidth
            margin="normal"
            required
            onChange={handleChange}
          />
        </Section>

        {/* <Button type="submit" variant="contained" color="primary"> */}
        <Button
          type="submit"
          classes={{
            root: classes.root, // class name, e.g. `classes-nesting-root-x`
          }}
        >
          Mint Artwork
        </Button>
      </form>
    </ContentWrapper>
  );
}
