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
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CliftonLocalUrl, LocalUrl } from "../../config/env";
import ProdcutImage from "../../assets/productImage.png";
import { Gallery } from "../../config/icon";
import { toast } from "react-toastify";
function AddBeverages() {
  const [categories, setCategories] = useState();
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");
  const [stock, setStock] = useState(true);
  const [imageData, setImageData] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [selectedGalleryImages, setSelectedGalleryImages] = useState([]);
  const [cloudImage, setCloudImage] = useState([]);
  const priceVariable = Number(price);
  const skuVariable = Number(sku);
  const branch = localStorage.getItem("branchName");
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
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
    getCategory();
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
      toast.error("Please Fill Inputs");
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
  return (
    <Container sx={{ mt: 5 }} maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 2 }}>
        Add Feature Product
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        component="form"
      >
        <Grid item xs={7.5}>
          <Box
            rowrpacing={1}
            columnspacing={{ xs: 1, sm: 2, md: 3 }}
            className="main-order-table glass-morphism"
          >
            <Grid container>
              <label style={{ marginBottom: "10px" }}>Select Category</label>
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
            <Grid container sx={{ marginTop: 2 }}>
              <label style={{ marginBottom: "10px" }}>Feature Product Name</label>
              <TextField
                required
                id="outlined-basic"
                placeholder="Product Name"
                variant="outlined"
                fullWidth
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Grid>
            <Grid container sx={{ marginTop: 2 }}>
              <label style={{ marginBottom: "10px" }}>
              Feature Product Description
              </label>
              <TextField
                required
                id="outlined-basic"
                placeholder="Product Description"
                variant="outlined"
                fullWidth
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </Grid>
            <Grid container sx={{ marginTop: 2 }}>
              <label style={{ marginBottom: "10px" }}>Feature Product Sku</label>
              <TextField
                required
                id="outlined-basic"
                placeholder="Product Sku"
                variant="outlined"
                fullWidth
                type="number"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, "");
                  setSku(numericValue);
                }}
                value={sku}
              />
            </Grid>
            <Grid container sx={{ marginTop: 2 }}>
              <label style={{ marginBottom: "10px" }}>Feature Product Price</label>
              <TextField
                required
                id="outlined-basic"
                placeholder="Product Price"
                variant="outlined"
                fullWidth
                type="number"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, "");
                  setPrice(numericValue);
                }}
                value={price}
              />
            </Grid>
            <Grid
              container
              sx={{
                marginTop: 2,
              }}
            >
              <Box>
                <label style={{ marginBottom: "10px" }}>Feature Product Stock</label>
                <FormGroup>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="true"
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
                      control={
                        <Radio
                          sx={{
                            color: "#FFF",
                            "&.Mui-checked": { color: "#3f51b5" },
                          }}
                        />
                      }
                      label="In Stock"
                      onChange={(e) => setStock(e.target.value)}
                    />
                    <FormControlLabel
                      value="false"
                      control={
                        <Radio
                          sx={{
                            color: "#FFF",
                            "&.Mui-checked": { color: "#3f51b5" },
                          }}
                        />
                      }
                      label="Out Stock"
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </RadioGroup>
                </FormGroup>
              </Box>
            </Grid>
            <Grid container sx={{ marginTop: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={addProduct}
                fullWidth
              >
                Add Feature Product
              </Button>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            // component="form"
            // component={Paper}
            rowrpacing={1}
            columnspacing={{ xs: 1, sm: 2, md: 3 }}
            className="main-order-table glass-morphism"
          >
            <Typography variant="h6">Feature Product Images</Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              {selectedGalleryImages &&
                selectedGalleryImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`Selected ${index + 1}`}
                    style={{
                      width: "170px",
                      height: "120px",
                      borderRadius: "10px",
                      marginTop: 5,
                    }}
                  />
                ))}
            </div>
            <Grid container sx={{ marginTop: 2 }}>
              <label for="upload-photo" className="image-upload-customize">
                <img src={Gallery} alt="" width={80} height={80} />
                <Typography variant="h6">Upload Feature Product Image</Typography>
              </label>
              <input
                id="upload-photo"
                style={{ opacity: 0, position: "absolute", zIndex: -1 }}
                fullWidth
                type="file"
                onChange={handleGalleryImageChange}
              />
            </Grid>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
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
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
export default AddBeverages;
