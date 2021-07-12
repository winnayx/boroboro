import { DropzoneArea } from "material-ui-dropzone";
import { makeStyles, Theme } from "@material-ui/core";
import DropIcon from "./dropIcon.svg";

// const useStyles = makeStyles((theme: Theme) => ({
//   dropzoneTextContainer: {
//     display: "flex",
//     flexDirection: "column-reverse",
//     alignItems: "center",
//     marginTop: theme.spacing(9),
//   },

//   dropzoneText: {
//     fontSize: "20px",
//   },

//   dropzoneIcon: {
//     width: "61px",
//   },
// }));

const maxFileSize = 600 * 1024 * 1024; // 600mb

export default function DropZone({ onFileSelected }: any) {
  // const classes = useStyles();

  return (
    <DropzoneArea
      Icon={DropIcon}
      filesLimit={2}
      onChange={onFileSelected}
      maxFileSize={maxFileSize}
    />
  );
}
