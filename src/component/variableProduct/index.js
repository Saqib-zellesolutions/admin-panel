import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
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
import * as React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CliftonLocalUrl, LocalUrl } from "../../config/env";
import VariationItemModal from "../variation-item-modal";
import VariationUpdateModal from "../VariableUpdateModal";
import { useNavigate } from "react-router-dom";

function VariableProduct() {
  const [categories, setCategories] = useState();
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sku, setSku] = useState("");
  const skuNumber = Number(sku);
  const [imageData, setImageData] = useState("");
  const [variation, setVariation] = useState(false);
  const [variationName, setVariationName] = useState("");
  const [variationDescription, setVariationDescription] = useState("");
  const [variationSku, setVariationSku] = useState("");
  const variationSkuNumber = Number(variationSku);
  const [variationImageData, setVariationImageData] = useState([]);
  const [variationPrice, setVariationPrice] = useState("");
  const variationPriceNumber = Number(variationPrice);
  const [stock, setStock] = useState(true);
  const [selectedGalleryImages, setSelectedGalleryImages] = useState([]);
  const [cloudImage, setCloudImage] = useState("");
  const [variationCloudImage, setVariationCloudImage] = useState([]);
  const [imageFile, setImageFile] = useState("");
  const [loader, setLoading] = useState(false);
  const [multipleVariation, setMultipleVariation] = useState([]);
  const [open, setOpen] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [variationId, setVariationId] = useState("");
  const branch = localStorage.getItem("branchName");
  const handleOpen = (e) => {
    setModalData(e);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    // setCategoryId(e.parent_id);
  };
  const handleCloseUpdateModal = () => {
    setName("");
    setDescription("");
    setSku("");
    setCloudImage("");
    setMultipleVariation([]);
    setEditData({});
    setSelectedGalleryImages([]);
    setVariation(false);
    setUpdateModal(false);
  };
  const [editData, setEditData] = useState({});
  let edit = (e) => {
    navigate("/dashboard/edit-variableProduct", { state: e });
    // setUpdateModal(true);
    // setCategoryId(e.parent_id);
    // setName(e.name);
    // setDescription(e.description);
    // setSku(e.sku);
    // setEditData(e);
    // setMultipleVariation(e.variation);
    // setVariationId(e._id);
    // setVariation(true);
    // setCategoryId(e.parent_id);
  };
  let saveVariation = () => {
    // const findImages=[]
    if (
      !variationName ||
      !variationDescription ||
      !variationSkuNumber ||
      !variationPriceNumber ||
      !variationCloudImage.length ||
      !stock
    ) {
      toast.error("Please Fill Variation Input");
      return;
    } else {
      const variationData = {
        name: variationName,
        description: variationDescription,
        sku: variationSkuNumber,
        price: variationPriceNumber,
        images: variationCloudImage,
        instock: stock,
      };
      setMultipleVariation([...multipleVariation, variationData]);
      setVariationName("");
      setVariationDescription("");
      setVariationSku("");
      setVariationPrice("");
      setVariationImageData([]);
      setStock("");
      setSelectedGalleryImages([]);
      setVariationCloudImage([]);
    }
  };
  let variationEdit = (e) => {
    setVariationId(e);
    const changeVariation = multipleVariation.find((v) => v._id === e);
    setVariationName(changeVariation.name);
    setVariationDescription(changeVariation.description);
    setVariationSku(changeVariation.sku);
    setVariationPrice(changeVariation.price);
    setStock(changeVariation.stock);
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
        setCategories(result);
      })
      .catch((error) => console.log("error", error));
  }, []);
  useEffect(() => {
    const addVariableProduct = () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        name: name,
        description: description,
        sku: skuNumber,
        image: cloudImage,
        variation: multipleVariation,
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
        }/VariableProduct/addProduct/${categoryId}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setName("");
          setImageData("");
          setDescription("");
          setSku(0);
          setMultipleVariation([]);
          // window.location.reload();
        })
        .catch((error) => console.log("error", error));
      setVariation(!variation);
    };
    if (cloudImage && !editData._id) {
      if (
        (!name,
        !description ||
          !skuNumber ||
          !cloudImage.length ||
          // !stock ||
          !multipleVariation.length)
      ) {
        console.log("he;lll");
        toast.error("Please Fill Input");
      } else {
        addVariableProduct();
      }
    } else if (cloudImage && editData._id) {
      if (
        !variationCloudImage.length ||
        !stock ||
        !variationName ||
        !variationDescription ||
        !variationPriceNumber ||
        !variationSkuNumber
      ) {
        toast.error("Please Fill Input");
        return;
      }
      let updateEdit = () => {
        const updatedVariation = {
          _id: variationId,
          name: variationName,
          description: variationDescription,
          sku: variationSkuNumber,
          images: variationCloudImage,
          price: variationPriceNumber,
          instock: stock,
        };

        const newUpdatedVariation = multipleVariation.map((v) =>
          v._id === updatedVariation._id ? updatedVariation : v
        );
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
          name: name,
          description: description,
          sku: sku,
          image: cloudImage ? cloudImage : editData.image,
          variation: newUpdatedVariation,
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
          }/VariableProduct/edit-product/${editData._id}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            window.location.reload();
            setName("");
            setDescription("");
            setSku("");
            setCloudImage("");
            setMultipleVariation([]);
            setEditData({});
            setSelectedGalleryImages([]);
            toast.success(result.message);
          })
          .catch((error) => {
            toast.error(error.message);
          });
      };
      updateEdit();
    }
  }, [cloudImage]);
  useEffect(() => {
    if (variationCloudImage.length === variationImageData.length) {
      setLoading(false);
    }
  }, [variationCloudImage]);

  const handleGalleryImageChange = (e) => {
    const files = Array.from(e.target.files);
    const gFiles = e.target.files[0];
    setVariationImageData((gallery) => [...gallery, gFiles]);
    const images = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setSelectedGalleryImages((prevImages) => [...prevImages, ...images]);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageData(URL.createObjectURL(file));

    setImageFile(file);
  };
  const uploadImages = async (e, name) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", e);
    formData.append("upload_preset", "htjxlrii");
    fetch("https://api.cloudinary.com/v1_1/dnwbw493d/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (name === "multipleImage") {
          setVariationCloudImage((prevArray) => [...prevArray, data.url]);
        } else {
          setLoading(false);

          setCloudImage(data.url);
        }
      })
      .catch((error) => {
        toast.error("image is not uploaded");
      });
  };
  const SaveImages = (e, imgData) => {
    let newUrl = [];
    for (let i of imgData) {
      newUrl.push(uploadImages(i, e));
      toast.success("gallery images uploaded successfully!");
    }

    if (newUrl.length > 1) {
      toast.success("gallery images uploaded successfully!");
    }
  };
  const addVariations = () => {
    setVariation(!variation);
  };
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${
        branch === "Bahadurabad" ? LocalUrl : CliftonLocalUrl
      }/VariableProduct/getProduct`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setAllProduct(result);
      })
      .catch((error) => console.log("error", error));
  }, []);
  let Delete = (id) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `${
        branch === "Bahadurabad" ? LocalUrl : CliftonLocalUrl
      }/VariableProduct/delete-product/${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
  };
  const cancelEdit = () => {
    setName("");
    setDescription("");
    setSku("");
    setCloudImage("");
    setMultipleVariation([]);
    setEditData({});
    setSelectedGalleryImages([]);
    setVariation(false);
    setUpdateModal(false);
  };
  const theme = useTheme();
  const navigate = useNavigate();
  return !categories && !allProduct ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <CircularProgress sx={{ color: "#797C8C" }} />
    </Box>
  ) : loader == true ? (
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
    <>
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
              {/* <Box
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
                  <Typography variant="h4">Variable Product</Typography>
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
                            borderRadius: "10px",
                            marginTop: 5,
                          }}
                        />
                      </span>
                    ) : null}
                  </Grid>
                </Grid>
                {multipleVariation.length === 1 ? (
                  <TableContainer sx={{ mt: 2 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Name</TableCell>
                          <TableCell align="left">Description</TableCell>
                          <TableCell align="left">Image</TableCell>
                          <TableCell align="left">Sku</TableCell>
                          <TableCell align="left">Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {multipleVariation.map((e) => (
                          <TableRow key={e._id}>
                            <TableCell align="left">{e.name}</TableCell>
                            <TableCell align="left">{e.description}</TableCell>
                            <TableCell align="left">
                              <img
                                src={e.images && e.images[0]}
                                width={50}
                                height={50}
                                style={{ borderRadius: "10px" }}
                              />
                            </TableCell>
                            <TableCell align="left">{e.sku}</TableCell>
                            <TableCell align="left">{e.price}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <></>
                )}
                {variation ? (
                  <></>
                ) : (
                  <Grid
                    container
                    spacing={2}
                    style={{ marginTop: 10, paddingLeft: "15px" }}
                  >
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={addVariations}
                      color="secondary"
                    >
                      Add Variation
                    </Button>
                  </Grid>
                )}
                {variation ? (
                  <>
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
                        <Typography component="p">
                          Variation Description
                        </Typography>
                        <TextField
                          required
                          id="outlined-basic"
                          placeholder="Variation Description"
                          variant="outlined"
                          fullWidth
                          onChange={(e) =>
                            setVariationDescription(e.target.value)
                          }
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
                          inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                          }}
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
                          placeholder="Variation Price"
                          fullWidth
                          type="number"
                          inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                          }}
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
                                  borderRadius: "10px",
                                  marginTop: 5,
                                }}
                              />
                            </span>
                          ))}
                        <div>
                          {selectedGalleryImages &&
                          selectedGalleryImages.length ? (
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
                    <Grid container spacing={2} style={{ marginTop: 10 }}>
                      <Grid xs={6} item>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() => {
                            saveVariation();
                          }}
                          color="secondary"
                        >
                          Save Variation
                        </Button>
                      </Grid>
                      <Grid xs={6} item>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={async () => {
                            // if (
                            //   !name ||
                            //   !description ||
                            //   !sku ||
                            //   !multipleVariation.length
                            // ) {
                            //   toast.error("Please Fill Input");
                            // } else {
                              SaveImages("single", [imageFile]);
                            // }
                            // addVariableProduct();
                          }}
                          color="secondary"
                        >
                          Add Variable Product
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
              </Box> */}
              <Box
                className="main-order-table glass-morphism"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // position: "absolute",
                  width: "100%",
                  zIndex: 9999,
                  mb: "-35px",
                }}
              >
                <Typography variant="h6">Add Variable Product</Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate("/dashboard/add-variableProduct")}
                  sx={{ background: "transparent" }}
                >
                  Add New
                </Button>
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
                        <TableCell align="left">description</TableCell>
                        <TableCell align="left">image</TableCell>
                        <TableCell align="center">sku</TableCell>
                        <TableCell align="center">Variations</TableCell>
                        <TableCell align="left">View Variation</TableCell>
                        <TableCell align="left">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allProduct &&
                        allProduct.map((e, index) => (
                          <TableRow key={index}>
                            <TableCell align="left">{e.name}</TableCell>
                            <TableCell align="left">{e.description}</TableCell>
                            <TableCell align="left">
                              <img
                                src={e.image}
                                width={50}
                                height={50}
                                style={{ borderRadius: "8px" }}
                              />
                            </TableCell>
                            <TableCell align="center">{e.sku}</TableCell>
                            <TableCell align="center">
                              {e.variation.length}
                            </TableCell>
                            <TableCell align="left">
                              <Button
                                variant="contained"
                                style={{
                                  marginTop: 5,
                                  fontSize: 12,
                                  width: "max-content",
                                }}
                                color="secondary"
                                onClick={() => handleOpen(e.variation)}
                              >
                                View Variations
                              </Button>
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
                                  onClick={() => Delete(e._id)}
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
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
              <VariationItemModal
                data={modalData}
                open={open}
                handleClose={handleClose}
              />
              <VariationUpdateModal
                setCategoryId={setCategoryId}
                categoryId={categoryId}
                setName={setName}
                name={name}
                setDescription={setDescription}
                description={description}
                setSku={setSku}
                sku={sku}
                setEditData={setEditData}
                editData={editData}
                setMultipleVariation={setMultipleVariation}
                multipleVariation={multipleVariation}
                setVariationId={setVariationId}
                variationId={variationId}
                setVariation={setVariation}
                variation={variation}
                variationEdit={variationEdit}
                setVariationName={setVariationName}
                variationName={variationName}
                setVariationDescription={setVariationDescription}
                variationDescription={variationDescription}
                setVariationSku={setVariationSku}
                variationSku={variationSku}
                setVariationPrice={setVariationPrice}
                variationPrice={variationPrice}
                setStock={setStock}
                stock={stock}
                open={updateModal}
                handleClose={handleCloseUpdateModal}
                cancelEdit={cancelEdit}
                imageData={imageData}
                handleGalleryImageChange={handleGalleryImageChange}
                selectedGalleryImages={selectedGalleryImages}
                SaveImages={SaveImages}
                variationImageData={variationImageData}
                imageFile={imageFile}
                setCloudImage={setCloudImage}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
export default VariableProduct;
