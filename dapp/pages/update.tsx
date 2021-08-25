import { useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  CircularProgress,
} from "@material-ui/core";
import { styled, makeStyles } from "@material-ui/core/styles";
import { getWeb3, getOwner } from "../src/api/web3";
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
  const [newOwner, setNewOwner] = useState("");
  const [contract, setContract] = useState<any>({});
  const [verifyError, setVerifyError] = useState(false);
  const [verified, setVerified] = useState(false);
  const [transferred, setTransferred] = useState(0);

  if (typeof window !== "undefined") {
    window.ethereum.on("accountsChanged", function (accounts: string[]) {
      console.log("account changed", accounts[0]);
      setAccount(accounts[0]);
      setVerifyError(false);
    });
  }

  useEffect(() => {
    getWeb3().then(({ accts, contractInstance }) => {
      setAccount(accts[0]);
      setContract(contractInstance);
    });
  }, []);

  const handleChange = (event: any) => {
    event.preventDefault();
    switch (event.target.id) {
      case "tokenId":
        setTokenId(event.target.value);
        break;
      case "newOwner":
        setNewOwner(event.target.value);
        break;
      default:
        break;
    }
  };

  const updateProvenance = async (event: any) => {
    event.preventDefault();
    console.log(account, newOwner, tokenId);
    setTransferred(-1);
    try {
      contract.methods
        .safeTransferFrom(account, newOwner, tokenId)
        .send({ from: "0x3b634Db3a35da1488AEafB18F1be9108D8408e2C" })
        .on("transactionHash", (hash: string) => {
          console.log(hash);
        })
        .on("error", (error: string) => {
          console.log(error);
        })
        .on("receipt", (receipt: any) => {
          setTransferred(1);
          console.log(receipt);
        });
    } catch (e) {
      console.log("ERROR in safeTransferFrom", e);
    }
  };

  const verifyOwnership = async (event: any) => {
    event.preventDefault();
    try {
      contract.methods
        .ownerOf(tokenId)
        .call({ from: account }, function (err: any, rightfulOwner: string) {
          if (err) {
            setVerifyError(true);
            console.log(err);
          }
          if (rightfulOwner.toLowerCase() === account.toLowerCase()) {
            console.log(rightfulOwner, "===", account);
            setVerified(true);
          } else {
            console.log(rightfulOwner, "!==", account);
            setVerifyError(true);

            // to check which char was wrong
            // for (var c = 0; c < rightfulOwner.length; c++) {
            //   if (rightfulOwner.charCodeAt(c) != account.charCodeAt(c)) {
            //     alert(
            //       "c:" +
            //         c +
            //         " " +
            //         rightfulOwner.charCodeAt(c) +
            //         "!=" +
            //         account.charCodeAt(c)
            //     );
            //     break;
            //   }
            // }
          }
        });
    } catch (e) {
      console.log("ERROR in contract.ownerOf", e);
      setVerifyError(true);
    }
  };

  return (
    <ContentWrapper>
      <Dialog open={transferred > 0} onClose={() => setTransferred(0)}>
        <DialogTitle id="simple-dialog-title">Success</DialogTitle>
        <Typography style={{ padding: "16px 24px" }}>
          Artwork with token ID <b>{tokenId}</b> is transferred from{" "}
          <b>{account}</b> to <b>{newOwner}</b>
        </Typography>
      </Dialog>

      <Typography variant="h2" gutterBottom>
        Update Provenance
      </Typography>
      {verified ? (
        <Section>
          <Typography>
            Verfied ✅. Provide wallet address of new owner.
          </Typography>
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
              {transferred < 0 ? (
                <>
                  <p>Transferring</p>
                  <CircularProgress />
                </>
              ) : (
                <p>Transfer Ownership</p>
              )}
            </Button>
            <br />
            <Typography color="error" variant="overline">
              Please do not exit or refresh page until dialog pops up.
            </Typography>
          </form>
        </Section>
      ) : (
        <Section>
          <Typography>
            Provide token ID of artwork. <br />
            We will perform a quick check to verify that the current Metamask
            account is the rightful owner of the token.
          </Typography>
          <form noValidate onSubmit={verifyOwnership}>
            <Section>
              <TextField
                id="tokenId"
                label="Token ID of Artwork"
                type="number"
                required
                fullWidth
                margin="normal"
                onChange={handleChange}
              />
              {verifyError && (
                <Typography color="error" variant="overline">
                  Error: token ID does not match current Metamask account.
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
