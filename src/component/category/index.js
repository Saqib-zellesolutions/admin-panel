import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CliftonLocalUrl, LocalUrl } from "../../config/env";
function AddCategory() {
  const [name, setName] = useState("");
  const [imageData, setImageData] = useState("");
  const [allCategory, setAllCategory] = useState("");
  const [fileurl, setFileurl] = useState("");
  const [editingId, setEditingId] = useState("");
  const [loader, setLoading] = useState(false);
  const [banner, setBanner] = useState("");
  const [bannerFileUrl, setBannerFileUrl] = useState("");
  const [slider, setSlider] = useState("");
  const [sliderFileUrl, setSliderFileUrl] = useState("");
  const branch = localStorage.getItem("branchName");
  const addCategory = () => {
    if (!name || !fileurl || !sliderFileUrl || !bannerFileUrl) {
      toast.success("Please fill the input");
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        name: name,
        image: fileurl,
        banner_image: bannerFileUrl,
        slider_image: sliderFileUrl,
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(
        `${
          branch === "Bahadurabad" ? LocalUrl : CliftonLocalUrl
        }/category/add-category`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          window.location.reload();
          setName("");
          setImageData("");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  const ImageUploader = async (e) => {
    toast.success("wait for the upload image");
    const formData = new FormData();
    formData.append("file", e);
    formData.append("upload_preset", "htjxlrii"); 
    // setLoading(true);
    // Make an API call to Cloudinary using fetch or axios
    fetch("https://api.cloudinary.com/v1_1/dnwbw493d/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.url) {
          setFileurl(data?.url);
          // setLoading(false);
          toast.success("Image uploaded successfully");
          // return data.url;
        } else {
          // setLoading(false);
          toast.error("image is not uploaded");
        }
      })
      .catch((error) => {
        // Handle error
        setLoading(false);
        // setIsLoading(false);
        toast.error("Upload error");
      });
  };
  const handleImageChange = (e) => {
    // setIsLoading(true);
    const file = e.target.files[0];
    setImageData(URL.createObjectURL(file));
    // setFile(file)
    ImageUploader(file);
  };
  const BannerImageUploader = async (e) => {
    toast.success("wait for the upload image");
    const formData = new FormData();
    formData.append("file", e);
    formData.append("upload_preset", "htjxlrii"); // Replace with your Cloudinary upload preset name
    // setLoading(true);
    // Make an API call to Cloudinary using fetch or axios
    fetch("https://api.cloudinary.com/v1_1/dnwbw493d/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from Cloudinary
        if (data.url) {
          setBannerFileUrl(data?.url);
          // setLoading(false);
          toast.success(" uploaded Banner Image successfully");
          // return data.url;
        } else {
          // setLoading(false);
          toast.error("Banner Image is not uploaded");
        }
      })
      .catch((error) => {
        // Handle error
        setLoading(false);
        // setIsLoading(false);
        toast.error("Upload error");
      });
  };
  const handleBannerImageChange = (e) => {
    // setIsLoading(true);
    const file = e.target.files[0];
    setBanner(URL.createObjectURL(file));
    // setFile(file)
    BannerImageUploader(file);
  };
  const sliderImageUploader = async (e) => {
    toast.success("wait for the upload image");
    const formData = new FormData();
    formData.append("file", e);
    formData.append("upload_preset", "htjxlrii"); // Replace with your Cloudinary upload preset name
    // setLoading(true);
    // Make an API call to Cloudinary using fetch or axios
    fetch("https://api.cloudinary.com/v1_1/dnwbw493d/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from Cloudinary
        if (data.url) {
          setSliderFileUrl(data?.url);
          // setLoading(false);
          toast.success(" uploaded Slider Image successfully");
          // return data.url;
        } else {
          // setLoading(false);
          toast.error("Slider Image is not uploaded");
        }
      })
      .catch((error) => {
        // Handle error
        setLoading(false);
        // setIsLoading(false);
        toast.error("Upload error");
      });
  };
  const handleSliderImageChange = (e) => {
    // setIsLoading(true);
    const file = e.target.files[0];
    setSlider(URL.createObjectURL(file));
    // setFile(file)
    sliderImageUploader(file);
  };

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${
        branch === "Bahadurabad" ? LocalUrl : CliftonLocalUrl
      }/category/get-category`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setAllCategory(result);
      })
      .catch((error) => console.log("error", error));
  }, []);
  const Delete = (id) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `${
        branch === "Bahadurabad" ? LocalUrl : CliftonLocalUrl
      }/category/delete-category/${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        window.location.reload();
        toast.success("Successfully category delete");
      })
      .catch((error) => console.log("error", error));
  };
  const edit = (id) => {
    setEditingId(id._id);
    setFileurl(id.image);
    setName(id.name);
    setBannerFileUrl(id.banner_image);
    setSliderFileUrl(id.slider_image);
  };

  const handleEditSubmit = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name,
      image: fileurl,
      banner_image: bannerFileUrl,
      slider_image: sliderFileUrl,
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
      }/category/edit-category/${editingId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        window.location.reload();
        setEditingId("");
        setName("");
        setImageData([]);
      })
      .catch((error) => console.log("error", error));
  };
  const cancelEdit = () => {
    setEditingId(null); // Exit edit mode
    setName("");
    setImageData([]);
  };
  const theme = useTheme();
  return !allCategory ? (
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
        marginTop: 20,
        flexDirection: "column",
      }}
    >
      <Container sx={{ mt: 5 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Box
              component="form"
              rowrpacing={1}
              columnspacing={{ xs: 1, sm: 2, md: 3 }}
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
                <Typography variant="h4">Category</Typography>
              </Grid>
              <Grid container spacing={2} style={{ marginTop: 10 }}>
                <Grid xs={6} item>
                  <Typography component="p">Name</Typography>
                  <TextField
                    required
                    id="outlined-basic"
                    // label="Product name"
                    placeholder="Product name"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </Grid>
                <Grid xs={6} item>
                  <Typography component="p">Image</Typography>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    type="file"
                    onChange={handleImageChange}
                    // value={imageData}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{ marginTop: 10 }}>
                <Grid xs={6} item>
                  <Typography component="p">Banner Image</Typography>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    type="file"
                    onChange={handleBannerImageChange}
                  />
                </Grid>
                <Grid xs={6} item>
                  <Typography component="p">Slider Image</Typography>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    type="file"
                    onChange={handleSliderImageChange}
                    // value={imageData}
                  />
                </Grid>
              </Grid>
              {editingId && editingId ? (
                <Grid
                  container
                  spacing={2}
                  style={{ marginTop: 10, paddingLeft: "15px" }}
                >
                  <Grid xs={6} item>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleEditSubmit}
                      color="secondary"
                    >
                      save
                    </Button>
                  </Grid>
                  <Grid xs={6} item>
                    <Button
                      variant="contained"
                      color="error"
                      fullWidth
                      onClick={() => cancelEdit()}
                      style={{ marginTop: 5 }}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <Grid
                  container
                  spacing={2}
                  style={{ marginTop: 10, paddingLeft: "15px" }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={addCategory}
                  >
                    Add category
                  </Button>
                </Grid>
              )}
            </Box>
            <Card
              className="main-order-table glass-morphism"
              sx={{ padding: "unset !important", mt: 3 }}
            >
              <Divider />
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">name</TableCell>
                      <TableCell align="left">image</TableCell>
                      <TableCell align="left">Banner Image</TableCell>
                      <TableCell align="left">Slider Image</TableCell>
                      <TableCell align="left">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allCategory &&
                      allCategory?.map((e, index) => (
                        <TableRow hover key={e?._id}>
                          <TableCell align="left">{e.name}</TableCell>
                          <TableCell align="left">
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                              className="product-table-text"
                            >
                              <img
                                src={e.image}
                                alt=""
                                width={50}
                                height={50}
                              />
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                              className="product-table-text"
                            >
                              <img
                                src={e.banner_image}
                                alt=""
                                width={50}
                                height={50}
                              />
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                              className="product-table-text"
                            >
                              <img
                                src={e.slider_image}
                                alt=""
                                width={50}
                                height={50}
                              />
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Tooltip title="Edit Product" arrow>
                              <IconButton
                                onClick={() => edit(e)}
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
                            <Tooltip title="Delete Product" arrow>
                              <IconButton
                                sx={{
                                  "&:hover": {
                                    background: theme.colors.error.lighter,
                                  },
                                  color: theme.palette.error.main,
                                }}
                                color="inherit"
                                size="small"
                                onClick={() => Delete(e._id)}
                              >
                                <DeleteTwoToneIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                          {/* <TableCell align="left">
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => Delete(e._id)}
                              style={{ marginTop: 5 }}
                            >
                              Delete
                            </Button>
                          </TableCell> */}
                          {/* <StyledTableCell align="left">
                              <Button
                                variant="contained"
                                color="success"
                                onClick={() => edit(e)}
                                style={{ marginTop: 5, marginLeft: 20 }}
                              >
                                Edit
                              </Button>
                            </StyledTableCell> */}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
export default AddCategory;
