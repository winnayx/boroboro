import {
  Button,
  Box,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  CircularProgress,
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { styled, makeStyles } from "@material-ui/core/styles";
import ContentWrapper from "../src/features/contentWrapper";
import { uploadFileToIPFS, uploadMetadata } from "../src/api/ipfs";
import { getWeb3 } from "../src/api/web3";

import {
  ArtworkErrorSchema,
  ArtworkSchema,
  constructMetadata,
} from "../src/api/schemas";

declare let window: any;
const initialArtworkState = {
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

const validateForm = (artwork: any): { error: boolean; errorState: any } => {
  let errorState = {} as any;
  let error = false;
  Object.keys(artwork).forEach((field) => {
    if (
      field !== "description" &&
      (!artwork[field] || artwork[field].length === 0)
    ) {
      errorState[field] = true;
      error = true;
    } else {
      errorState[field] = false;
    }
  });
  return { error, errorState };
};

export default function MintPage() {
  const [artwork, setArtwork] = useState<ArtworkSchema>(initialArtworkState);
  const [account, setAccount] = useState<string>("");
  const [tokenId, setTokenId] = useState(0);
  const [minting, setMinting] = useState(false);
  const [textFieldError, setTextFieldError] = useState<ArtworkErrorSchema>(
    initialTextFieldErrorState
  );
  const [contract, setContract] = useState<any>({});
  const classes = useStyles();

  if (typeof window !== "undefined") {
    window.ethereum.on("accountsChanged", function (accounts: string[]) {
      console.log("account changed", accounts[0]);
      setAccount(accounts[0]);
    });
  }

  useEffect(() => {
    getWeb3().then(({ accts, contractInstance }) => {
      setAccount(accts[0]);
      setContract(contractInstance);
    });
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(artwork);
    const { error, errorState } = validateForm(artwork);
    setTextFieldError(errorState);

    if (error) {
      return;
    }
    setTokenId(-1);
    try {
      const { fullPath } = await uploadFileToIPFS(artwork.files[0]);
      const metadata = constructMetadata(artwork, fullPath);
      const res = await uploadMetadata(metadata);
      const metadataURI = res.fullPath;

      // mint here
      contract.methods
        .mintToken("0x3b634Db3a35da1488AEafB18F1be9108D8408e2C", metadataURI)
        .send({ from: "0x3b634Db3a35da1488AEafB18F1be9108D8408e2C" })
        .on("transactionHash", (hash: string) => {
          console.log(hash);
        })
        .on("error", (error: string) => {
          console.log(error);
        })
        .on("receipt", (receipt: any) => {
          setTokenId(
            Web3.utils.hexToNumber(receipt.events.Transfer.raw.topics[3])
          );
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
      case "creator":
        setArtwork({
          ...artwork,
          creator: event.target.value,
        });
        break;
      case "owner":
        setArtwork({
          ...artwork,
          owner: event.target.value,
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
      <Dialog open={tokenId > 0} onClose={() => setTokenId(0)}>
        <DialogTitle id="simple-dialog-title">Success</DialogTitle>
        <Typography style={{ padding: "16px 24px" }}>
          The Token ID for <i>{artwork.title}</i> is <b>{tokenId}</b>.
          <br />
          Please record the token ID somewhere safe.
        </Typography>
      </Dialog>
      <form noValidate onSubmit={handleSubmit}>
        <Section>
          <Typography variant="h2" gutterBottom>
            Add New Artwork
          </Typography>
        </Section>
        <Section>
          <StyledDropzoneArea onChange={handleFileUpload} />
          {textFieldError.files && (
            <Typography color="error" variant="overline">
              Required Field
            </Typography>
          )}
        </Section>

        <Section>
          <TextField
            id="title"
            label="Artwork Title"
            required
            fullWidth
            margin="normal"
            onChange={handleChange}
            error={textFieldError.title}
            helperText={textFieldError.title ? "Required field" : ""}
          />
          <TextField
            id="artist"
            label="Artist"
            required
            fullWidth
            margin="normal"
            onChange={handleChange}
            error={textFieldError.artist}
            helperText={textFieldError.artist ? "Required field" : ""}
          />
          <TextField
            id="year"
            label="Creation Year"
            fullWidth
            margin="normal"
            required
            onChange={handleChange}
            error={textFieldError.year}
            helperText={textFieldError.year ? "Required field" : ""}
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
            id="creator"
            label="Wallet Address of Artwork Creator"
            fullWidth
            margin="normal"
            required
            onChange={handleChange}
            error={textFieldError.creator}
            helperText={textFieldError.creator ? "Required field" : ""}
          />
          <TextField
            id="owner"
            label="Wallet Address of Artwork Owner (could be same as above)"
            fullWidth
            margin="normal"
            required
            onChange={handleChange}
            error={textFieldError.owner}
            helperText={textFieldError.owner ? "Required field" : ""}
          />
        </Section>

        <Button
          type="submit"
          classes={{
            root: classes.root, // class name, e.g. `classes-nesting-root-x`
          }}
        >
          {tokenId < 0 ? (
            <>
              <CircularProgress />
              <p>minting</p>
            </>
          ) : (
            <p>mint now</p>
          )}
        </Button>
        <br />
        <Typography color="error" variant="overline">
          Please do not exit or refresh page until dialog pops up.
        </Typography>
      </form>
    </ContentWrapper>
  );
}
