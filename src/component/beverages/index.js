import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CliftonLocalUrl, LocalUrl } from "../../config/env";
import NewTable from "../newtable";
import BevergesUpdateModal from "../beveragesUpdateModal";
function AddProduct() {
  const theme = useTheme();
  const [categories, setCategories] = useState();
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");
  const [stock, setStock] = useState(true);
  const [imageData, setImageData] = useState([]);
  const [allBeverages, setallBeverages] = useState([]);
  const [selectedGalleryImages, setSelectedGalleryImages] = useState([]);
  const [cloudImage, setCloudImage] = useState([]);
  const priceVariable = Number(price);
  const skuVariable = Number(sku);
  const [editData, setEditData] = useState({});
  const [isloading, setloading] = useState(true);
  const [open, setOpen] = useState(false);
  const branch = localStorage.getItem("branchName");
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const getCategory = () => {
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
          setCategories(result);
          setloading(false);
        })
        .catch((error) => {
          setloading(false);
          console.log("error", error);
        });
    };
    getCategory();
    const getProduct = () => {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        `${
          branch === "Bahadurabad" ? LocalUrl : CliftonLocalUrl
        }/beverages/getBeverage`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setloading(false);
          setallBeverages(result);
        })
        .catch((error) => {
          setloading(false);
          console.log("error", error);
        });
    };
    getProduct();
  }, []);
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
  const addProduct = async () => {
    if (
      (!name, !description, !skuVariable, !priceVariable, !cloudImage.length)
    ) {
      return;
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        name: name,
        description: description,
        sku: skuVariable,
        images: cloudImage,
        price: priceVariable,
        instock: stock,
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
        }/beverages/addBeverage/${categoryId}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          toast.success("successfully product add");
          window.location.reload();
          setName("");
          setDescription("");
          setImageData([]);
          setSku(0);
          setPrice(0);
          setStock(true);
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };
  const Delete = (id) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `${
        branch === "Bahadurabad" ? LocalUrl : CliftonLocalUrl
      }/beverages/delete-Beverage/${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
  };
  let edit = (e) => {
    // setEditData()
    setEditData(e);
    setOpen(true);
  };

  return isloading ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <CircularProgress sx={{ color: "#797C8C" }} />
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
              // component={Paper}
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
                <Typography variant="h4">Beverages</Typography>
              </Grid>
              <Grid container spacing={2} style={{ paddingLeft: "15px" }}>
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
              </Grid>
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
                            borderRadius: "10px",
                            marginTop: 5,
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
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={addProduct}
                  fullWidth
                >
                  Add Beverages
                </Button>
              </Grid>
            </Box>
            {allBeverages.length ? (
              <NewTable
                data={allBeverages}
                theme={theme}
                edit={edit}
                Delete={Delete}
              />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 3,
                }}
              >
                <Typography component="h1" variant="h4">
                  Data Not Found
                </Typography>
              </Box>
            )}
            <BevergesUpdateModal
              handleClose={handleClose}
              open={open}
              editData={editData}
              setEditData={setEditData}
              categories={categories}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
export default AddProduct;
