import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CliftonLocalUrl, LocalUrl } from "../../config/env";
import { toast } from "react-toastify";
function SimpleUpdateModal({
  open,
  handleClose,
  setEditData,
  editData,
  categories,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
    padding: "5px 10px",
    borderRadius: "10px",
    backgroundColor: "#111633",
    color: "#cbccd2",
    boxShadow: " 0px 0px 2px #6a7199",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
  };
  const theme = useTheme();
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");
  const [stock, setStock] = useState(true);
  const [imageData, setImageData] = useState([]);
  const [selectedGalleryImages, setSelectedGalleryImages] = useState([]);
  const [cloudImage, setCloudImage] = useState([]);
  const priceVariable = Number(price);
  const skuVariable = Number(sku);
  const branch = localStorage.getItem("branchName");
  useEffect(() => {
    if (editData) {
      //   console.log(editData.parent_id, "edit");
      setCategoryId(editData.parent_id);
      setName(editData.name);
      setDescription(editData.description);
      setPrice(editData.price);
      setSku(editData.sku);
      setStock(editData.stock);
    }
  }, [editData]);
  console.log(categoryId);
  let saveEdit = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name,
      description: description,
      sku: skuVariable,
      images: [...editData.images, ...cloudImage],
      price: priceVariable,
      instock: stock,
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
      }/SimpleProduct/edit-product/${editData._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        window.location.reload();
        cancelEdit();
      })
      .catch((error) => console.log("error", error));
  };
  const cancelEdit = () => {
    setEditData({});
    setCategoryId("");
    setName("");
    setDescription("");
    setPrice("");
    setSku("");
    setStock("");
    setImageData([]);
    handleClose();
  };
  const uploadImages = async (e) => {
    const formData = new FormData();
    formData.append("file", e);
    formData.append("upload_preset", "htjxlrii");
    fetch("https://api.cloudinary.com/v1_1/dnwbw493d/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setCloudImage((prevArray) => [...prevArray, data.url]);
      })
      .catch((error) => {
        toast.error("image is not uploaded");
      });
  };
  const SaveImages = () => {
    let newUrl = [];
    for (let i of imageData) {
      newUrl.push(uploadImages(i));
      toast.success("gallery images uploaded successfully!");
    }

    if (newUrl.length > 1) {
      toast.success("gallery images uploaded successfully!");
    }
  };
  const handleGalleryImageChange = (e) => {
    const files = Array.from(e.target.files);
    const gFiles = e.target.files[0];
    setImageData((gallery) => [...gallery, gFiles]);
    const images = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setSelectedGalleryImages((prevImages) => [...prevImages, ...images]);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...style,
          [theme.breakpoints.down("md")]: {
            // Style for screens smaller than or equal to small breakpoint (e.g., mobile devices)
            width: "90%",
            height: "90%",
            // Add other styles for small screens here
          },
          [theme.breakpoints.down("sm")]: {
            // Style for screens smaller than or equal to small breakpoint (e.g., mobile devices)
            paddingLeft: "10px",
            paddingRight: "10px",
            width: "90%",
            height: "90%",
            // Add other styles for small screens here
          },
        }}
      >
        <CloseIcon
          onClick={() => cancelEdit()}
          style={{
            float: "right",
            cursor: "pointer",
          }}
        />
        <Container sx={{ mt: 5, height: "80%" }} maxWidth="lg">
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
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: "30px",
                  }}
                >
                  <Typography variant="h4">Edit Simple Product</Typography>
                </Grid>
                {/* <Grid container spacing={2} style={{ paddingLeft: "15px" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Category
                    </InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={categoryId}
                      label="Category"
                      onChange={(e) => setCategoryId(e.target.value)}
                    >
                      {categories &&
                        categories.map((e, i) => (
                          <MenuItem value={e.uniqueId} key={i}>
                            {e.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid> */}
                <Grid container spacing={2} style={{ marginTop: 10 }}>
                  <Grid xs={6} item>
                    <Typography component="p">Name</Typography>
                    <TextField
                      required
                      id="outlined-basic"
                      placeholder="Name"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <Typography component="p">Description</Typography>
                    <TextField
                      required
                      id="outlined-basic"
                      placeholder="Description"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: 10 }}>
                  <Grid xs={6} item>
                    <Typography component="p">Sku</Typography>
                    <TextField
                      required
                      id="outlined-basic"
                      placeholder="Sku"
                      variant="outlined"
                      fullWidth
                      type="number"
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(
                          /[^0-9]/g,
                          ""
                        );
                        setSku(numericValue);
                      }}
                      value={sku}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <Typography component="p">Price</Typography>
                    <TextField
                      required
                      id="outlined-basic"
                      placeholder="Price"
                      variant="outlined"
                      fullWidth
                      type="number"
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(
                          /[^0-9]/g,
                          ""
                        );
                        setPrice(numericValue);
                      }}
                      value={price}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: 10 }}>
                  <Grid xs={6} item>
                    <FormGroup>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio sx={{ color: "#FFF" }} />}
                          label="instock"
                          onChange={(e) => setStock(e.target.value)}
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio sx={{ color: "#FFF" }} />}
                          label="outstock"
                          onChange={(e) => setStock(e.target.value)}
                        />
                      </RadioGroup>
                    </FormGroup>
                  </Grid>
                  <Grid xs={6} item>
                    <Typography component="p">Image</Typography>
                    <TextField
                      sx={{
                        "& .MuiInputLabel-root": {
                          color: "#A1A1A1", // Change the label color to green
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#A1A1A1",
                            color: "#A1A1A1",
                          },
                          "&:hover fieldset": {
                            borderColor: "#A1A1A1",
                            color: "#A1A1A1",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#A1A1A1", // Change the border color when focused to green
                          },
                          "& .MuiInputBase-input": {
                            color: "#A1A1A1",
                            "&::placeholder": {
                              color: "#A1A1A1", // Change the placeholder color to green
                            },
                          },
                        },
                      }}
                      required
                      id="outlined-basic"
                      variant="outlined"
                      fullWidth
                      type="file"
                      inputProps={{
                        multiple: true,
                        accept: "image/*",
                      }}
                      onChange={handleGalleryImageChange}
                    />
                    {selectedGalleryImages &&
                      selectedGalleryImages.map((image, index) => (
                        <span key={index} style={{ marginTop: "10px" }}>
                          <img
                            src={image.url}
                            alt={`Selected ${index + 1}`}
                            style={{
                              maxWidth: "100px",
                              height: "50px",
                              marginRight: "10px",
                            }}
                          />
                        </span>
                      ))}
                    <div>
                      {selectedGalleryImages && selectedGalleryImages.length ? (
                        <Button
                          variant="contained"
                          sx={{
                            borderColor: "#A1A1A1",
                            background: "#A1A1A1",
                          }}
                          onClick={SaveImages}
                        >
                          Save Images
                        </Button>
                      ) : null}
                    </div>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  style={{ marginTop: 10, paddingLeft: "15px" }}
                >
                  <Grid
                    container
                    spacing={2}
                    style={{ marginTop: 10, paddingLeft: "15px" }}
                  >
                    <Grid xs={6} item>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={saveEdit}
                        fullWidth
                      >
                        Save
                      </Button>
                    </Grid>
                    <Grid xs={6} item>
                      <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        onClick={() => cancelEdit()}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Modal>
  );
}
export default SimpleUpdateModal;
