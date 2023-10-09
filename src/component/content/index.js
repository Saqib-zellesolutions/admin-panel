import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CliftonLocalUrl, LocalUrl } from "../../config/env";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
  margin:10px 0px;
  width: 97%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px 12px 0 12px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[500] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

function Content() {
  const theme = useTheme();
  const [content, setContent] = useState([]);
  const [heading, setHeading] = useState("");
  const [sub_heading, setSub_Heading] = useState("");
  const [editIndex, setEditIndex] = useState("");
  const branch = localStorage.getItem("branchName");
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${
        branch === "Bahadurabad" ? LocalUrl : CliftonLocalUrl
      }/content/get-content`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setContent(result);
      })
      .catch((error) => console.log("error", error));
  }, []);
  const handleEditClick = (item) => {
    setEditIndex(item._id);
    setHeading(item.heading);
    setSub_Heading(item.sub_heading);
  };
  const CancleEdit = () => {
    setEditIndex("");
    setHeading("");
    setSub_Heading("");
  };
  const handleSaveClick = (e) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      heading: heading,
      sub_heading: sub_heading,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${
        branch === "Bahadurabad" ? LocalUrl : CliftonLocalUrl
      }/content/edit-content/${editIndex}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const handleDeleteClick = (e) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `${
        branch === "Bahadurabad" ? LocalUrl : CliftonLocalUrl
      }/content/delete-content/${e._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return !content.length ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <CircularProgress />
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component={Paper}
        rowrpacing={1}
        columnspacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          width: "90%",
          padding: "10px",
          mt: 3,
        }}
        className="main-order-table glass-morphism"
      >
        <Grid
          container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Typography variant="h4">Content</Typography>
        </Grid>
        {content.length &&
          content.map((e) => (
            <Grid
              key={e._id}
              component={Paper}
              sx={{ margin: "10px 10px", padding: "10px 10px" }}
              className="glass-morphism"
            >
              {editIndex === e._id ? (
                <>
                  {/* <Typography component="p">Heading</Typography> */}
                  <TextField
                    placeholder="Heading"
                    variant="outlined"
                    fullWidth
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    // Add onChange to update the heading
                  />

                  <StyledTextarea
                    maxRows={4}
                    aria-label="Sub Heading"
                    value={sub_heading}
                    onChange={(e) => setSub_Heading(e.target.value)}
                  />
                  <Box>
                    <Tooltip title="Save Edit" arrow>
                      <IconButton
                        onClick={() => handleSaveClick(e)}
                        sx={{
                          "&:hover": {
                            background: theme.colors.primary.lighter,
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                      >
                        <SaveAsIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Edit" arrow>
                      <IconButton
                        onClick={() => CancleEdit()}
                        sx={{
                          "&:hover": {
                            background: theme.colors.error.lighter,
                          },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DoDisturbOnIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </>
              ) : (
                <>
                  <Typography component="h1" fontSize="30px" fontWeight={600}>
                    {e.heading}
                  </Typography>
                  <Typography
                    component="p"
                    style={{ margin: "10px 0px" }}
                    fontWeight={400}
                  >
                    {e.sub_heading}
                  </Typography>
                  <Box>
                    <Tooltip title="Edit Content" arrow>
                      <IconButton
                        onClick={() => handleEditClick(e)}
                        sx={{
                          "&:hover": {
                            background: theme.colors.primary.lighter,
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {/* <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditClick(e)}
                    >
                      Edit
                    </Button> */}
                    <Tooltip title="Delete Content" arrow>
                      <IconButton
                        onClick={() => handleDeleteClick(e)}
                        sx={{
                          "&:hover": {
                            background: theme.colors.error.lighter,
                          },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {/* <Button
                      style={{ marginLeft: "12px" }}
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteClick(e)}
                    >
                      Delete
                    </Button> */}
                  </Box>
                </>
              )}
            </Grid>
          ))}
      </Box>
    </div>
  );
}
export default Content;
