import { useEffect, useState } from "react";
import { Button, Box, Typography, TextField } from "@material-ui/core";
import { styled, makeStyles } from "@material-ui/core/styles";
import Web3 from "web3";
import type { AbiItem } from "web3-utils";
import { ARTWORK_ABI, ARTWORK_ADDRESS } from "../contractConfig";
import ContentWrapper from "../src/features/contentWrapper";

const Section = styled(Box)({
  margin: "20px 0",
});

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
declare let window: any;

export default function MintPage() {
  const classes = useStyles();
  const [tokenId, setTokenId] = useState(0);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState<any>({});
  const [verifyError, setVerifyError] = useState(false);
  const [verified, setVerified] = useState(false);

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
  const checkOwnership = async (tokenId: number) => {
    try {
      return await contract.methods
        .ownerOf(tokenId)
        .call(
          { from: "0x3b634Db3a35da1488AEafB18F1be9108D8408e2C" },
          function (err: any, rightfulOwner: any) {
            if (err) {
              return false;
            }
            console.log("account:", account, rightfulOwner);
            console.log(rightfulOwner.toString() === account.toString());
            return rightfulOwner.toString() === account.toString();
          }
        );
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const handleChange = (event: any) => {
    event.preventDefault();
    switch (event.target.id) {
      case "tokenId":
        setTokenId(event.target.value);
        break;
      default:
        console.log("neither cases. weird");
        break;
    }
  };

  const updateProvenance = () => {};
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      contract.methods
        .ownerOf(tokenId)
        .call(
          { from: "0x3b634Db3a35da1488AEafB18F1be9108D8408e2C" },
          function (err: any, rightfulOwner: any) {
            if (err) {
              setVerifyError(true);
              return false;
            }
            if (rightfulOwner.toString() === account.toString()) {
              console.log("Is right");
              setVerified(true);
            } else {
              console.log("nah");
            }
          }
        );
    } catch (e) {
      setVerifyError(true);
      return false;
    }
  };

  return (
    <ContentWrapper>
      <Typography variant="h2" gutterBottom>
        Update Provenance
      </Typography>
      {verified ? (
        <Section>
          <Typography>Verfied ✅. Provide address of new owner.</Typography>
          <form noValidate onSubmit={updateProvenance}>
            <Section>
              <TextField
                id="newOwner"
                label="Wallet Address of New Owner"
                required
                fullWidth
                margin="normal"
                onChange={handleChange}
                // error={textFieldError.title}
                // helperText={textFieldError.title ? "Required field" : ""}
              />
            </Section>
            <Button
              type="submit"
              classes={{
                root: classes.root,
              }}
            >
              Transfer Ownership
            </Button>
          </form>
        </Section>
      ) : (
        <Section>
          <Typography>
            Provide token ID of artwork to check ownership and rights to modify
            provenance.
          </Typography>
          <form noValidate onSubmit={handleSubmit}>
            <Section>
              <TextField
                id="tokenId"
                label="Token ID of Artwork"
                type="number"
                required
                fullWidth
                margin="normal"
                onChange={handleChange}
                // error={textFieldError.title}
                // helperText={textFieldError.title ? "Required field" : ""}
              />
              {verifyError && (
                <Typography color="error" variant="overline">
                  Error: token ID does not exist
                </Typography>
              )}
            </Section>
            <Button
              type="submit"
              classes={{
                root: classes.root,
              }}
            >
              Verify Ownership
            </Button>
          </form>
        </Section>
      )}
    </ContentWrapper>
  );
}
