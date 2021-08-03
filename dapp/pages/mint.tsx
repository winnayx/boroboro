import {
  Button,
  Box,
  Typography,
  TextField,
  FormControl,
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import Web3 from "web3";
import { useEffect, useState } from "react";
import { styled, makeStyles } from "@material-ui/core/styles";
import { AbiItem } from "web3-utils";
import ContentWrapper from "../src/features/contentWrapper";
import { uploadFileToIPFS, uploadMetadata } from "../src/api/ipfs";
import { ARTWORK_ADDRESS, ARTWORK_ABI } from "../contractConfig";
import {
  MetadataSchema,
  ArtworkSchema,
  constructMetadata,
} from "../src/api/schemas";

declare let window: any;
const initialState = {
  title: "",
  artist: "",
  description: "",
  year: "",
  files: [],
  creator: "",
  owner: "",
};

const initialTextFieldErrorState = {
  title: false,
  artist: false,
  description: false,
  year: false,
  files: false,
  creator: false,
  owner: false,
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
  const [artwork, setArtwork] = useState<ArtworkSchema>(initialState);
  const [account, setAccount] = useState<string>("");
  const [textFieldError, setTextFieldError] = useState(
    initialTextFieldErrorState
  );
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

  const validateForm = () => {
    // Object.keys(artwork).forEach((field: any) => {
    //   if (!artwork[field]) {
    //     setTextFieldError({
    //       ...textFieldError,
    //       ${field}`: true,
    //     });
    //   } else {
    //     textFieldError[field] = false;
    //   }
    // });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(artwork);

    try {
      const { fullPath } = await uploadFileToIPFS(artwork.files[0]);
      const metadata = constructMetadata(artwork, fullPath);
      const res = await uploadMetadata(metadata);
      const metadataURI = res.fullPath;

      // mint here
      contract.methods
        .mintToken("0x3b634Db3a35da1488AEafB18F1be9108D8408e2C", metadataURI)
        .send({ from: "0x3b634Db3a35da1488AEafB18F1be9108D8408e2C" })
        .on("transactionHash", function (hash) {
          console.log(hash);
        })
        .on("error", function (error, receipt) {
          console.log(error);
        });
    } catch (e) {
      console.log("Minting failed with error:", e);
    }
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
            variant="outlined"
            required
            fullWidth
            margin="normal"
            onChange={handleChange}
            error={artwork.title === ""}
            helperText={artwork.title ? "Required field" : ""}
          />
          <TextField
            id="artist"
            label="Artist"
            required
            fullWidth
            variant="outlined"
            margin="normal"
            onChange={handleChange}
            error={artwork.artist === ""}
            helperText={artwork.artist ? "Required field" : ""}
          />
          <TextField
            id="year"
            label="Creation Year"
            fullWidth
            variant="outlined"
            margin="normal"
            required
            error={artwork.year === ""}
            helperText={artwork.year ? "Required field" : ""}
          />
          <TextField
            id="description"
            label="Artwork Description"
            fullWidth
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            onChange={handleChange}
            error={artwork.description === ""}
            helperText={artwork.description ? "Required field" : ""}
          />
        </Section>
        <Section>
          <Typography variant="h5" gutterBottom>
            Assign Roles
          </Typography>
        </Section>
        <Section>
          <TextField
            id="creator"
            label="Creator of Artwork"
            fullWidth
            variant="outlined"
            margin="normal"
            required
            onChange={handleChange}
            error={artwork.creator}
            helperText={artwork.creator ? "Required field" : ""}
          />
          <TextField
            id="owner"
            label="Owner of Token"
            fullWidth
            variant="outlined"
            margin="normal"
            required
            onChange={handleChange}
            error={artwork.owner}
            helperText={artwork.owner ? "Required field" : ""}
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
