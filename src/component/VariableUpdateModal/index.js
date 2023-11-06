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
import React from "react";
import { toast } from "react-toastify";
function VariationUpdateModal({
  open,
  handleClose,
  setCategoryId,
  categoryId,
  setName,
  name,
  setDescription,
  description,
  setSku,
  sku,
  setEditData,
  editData,
  setMultipleVariation,
  multipleVariation,
  setVariationId,
  variationId,
  setVariation,
  variation,
  variationEdit,
  setVariationName,
  variationName,
  setVariationDescription,
  variationDescription,
  setVariationSku,
  variationSku,
  setVariationPrice,
  variationPrice,
  setStock,
  stock,
  cancelEdit,
  handleImageChange,
  imageData,
  handleGalleryImageChange,
  selectedGalleryImages,
  SaveImages,
  variationImageData,
  imageFile,
  setCloudImage,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "100%",
    padding: 4,
    borderRadius: "10px",
    backgroundColor: "#111633",
    color: "#cbccd2",
    boxShadow: " 0px 0px 2px #6a7199",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
  };
  const theme = useTheme();
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
          onClick={() => handleClose()}
          style={{
            float: "right",
            // margin: "10px 0",
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
                sx={{
                  maxHeight: "80%",
                  overflow: "hidden",
                  overflowY: "scroll",
                }}
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
                  <Typography variant="h4">Edit Variable Product</Typography>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: 10 }}>
                  <Grid xs={6} item>
                    <Typography component="p">Product Name</Typography>
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
                  <Grid xs={6} item>
                    <Typography component="p">Product Description</Typography>
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
                    <Typography component="p">Image</Typography>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      fullWidth
                      type="file"
                      onChange={handleImageChange}
                      inputProps={{
                        accept: "image/*",
                      }}
                    />
                    {imageData ? (
                      <span style={{ marginTop: "10px" }}>
                        <img
                          src={imageData}
                          alt={`Selected `}
                          style={{
                            maxWidth: "100px",
                            height: "50px",
                            marginRight: "10px",
                          }}
                        />
                      </span>
                    ) : null}
                  </Grid>
                </Grid>
                <Grid
                  container
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 3,
                  }}
                >
                  <Typography variant="h4">Variation</Typography>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: 10 }}>
                  <Grid xs={6} item>
                    <Typography component="p">Variable Name</Typography>
                    {editData._id ? (
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Select name
                        </InputLabel>
                        <Select
                          required
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={variationId}
                          label="name"
                          onChange={(e) => variationEdit(e.target.value)}
                        >
                          {multipleVariation &&
                            multipleVariation.map((e, i) => (
                              <MenuItem value={e._id} key={i}>
                                {e.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    ) : (
                      <TextField
                        required
                        id="outlined-basic"
                        placeholder="Variation name"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setVariationName(e.target.value)}
                        value={variationName}
                      />
                    )}
                  </Grid>
                  <Grid xs={6} item>
                    <Typography component="p">Variation Description</Typography>
                    <TextField
                      required
                      id="outlined-basic"
                      placeholder="Variation Description"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => setVariationDescription(e.target.value)}
                      value={variationDescription}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: 10 }}>
                  <Grid xs={6} item>
                    <Typography component="p">Variation Sku</Typography>
                    <TextField
                      required
                      id="outlined-basic"
                      placeholder="Variation Sku"
                      variant="outlined"
                      fullWidth
                      type="number"
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(
                          /[^0-9]/g,
                          ""
                        );
                        setVariationSku(numericValue);
                      }}
                      value={variationSku}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <Typography component="p">Price</Typography>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      fullWidth
                      placeholder="Variation Price"
                      type="number"
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(
                          /[^0-9]/g,
                          ""
                        );
                        setVariationPrice(numericValue);
                      }}
                      value={variationPrice}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: 10 }}>
                  <Grid xs={6} item>
                    <Typography component="p">Variation Image</Typography>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      fullWidth
                      type="file"
                      inputProps={{
                        multiple: true,
                        accept: "image/*",
                      }}
                      onChange={handleGalleryImageChange}
                      // multiple
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
                          value=""
                          onClick={() =>
                            SaveImages("multipleImage", variationImageData)
                          }
                          color="secondary"
                        >
                          Save Images
                        </Button>
                      ) : null}
                    </div>
                  </Grid>
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
                          control={<Radio />}
                          label="instock"
                          onChange={(e) => setStock(e.target.value)}
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio />}
                          label="outstock"
                          onChange={(e) => setStock(e.target.value)}
                        />
                      </RadioGroup>
                    </FormGroup>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  style={{ marginTop: 10, paddingLeft: "15px" }}
                >
                  <Grid xs={6} item>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={async () => {
                        if (!imageFile) {
                          if (editData.image) {
                            setCloudImage(editData.image);
                          } else {
                            toast.error("upload a product image");
                            return;
                          }
                        }
                        SaveImages("single", [imageFile]);
                        // addVariableProduct();
                      }}
                      color="secondary"
                    >
                      save{" "}
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
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Modal>
  );
}
export default VariationUpdateModal;
