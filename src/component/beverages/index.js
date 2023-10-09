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
        .catch((error) => console.log("error", error));
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
          setallBeverages(result);
        })
        .catch((error) => console.log("error", error));
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
    setCategoryId(e.parent_id);
    setName(e.name);
    setDescription(e.description);
    setPrice(e.price);
    setSku(e.sku);
    setStock(e.stock);
    setEditData(e);
  };

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
      }/beverages/edit-Beverage/${editData._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        window.location.reload();
        setCategoryId("");
        setName("");
        setDescription("");
        setPrice("");
        setSku("");
        setStock("");
        setImageData([]);
        setEditData({});
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
  };
  return !categories && !allBeverages ? (
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
                    onChange={(e) => setSku(e.target.value)}
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
                    onChange={(e) => setPrice(e.target.value)}
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
                {!editData._id ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={addProduct}
                    fullWidth
                  >
                    Add Beverages
                  </Button>
                ) : (
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
                )}
              </Grid>
            </Box>
            {allBeverages.length && (
              <NewTable
                data={allBeverages}
                theme={theme}
                edit={edit}
                Delete={Delete}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
    // <div
    //   style={{
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     marginTop: 20,
    //     flexDirection: "column",
    //   }}
    // >
    //   <Box
    //     component={Paper}
    //     rowrpacing={1}
    //     columnspacing={{ xs: 1, sm: 2, md: 3 }}
    //     style={{ width: "80%", padding: 10 }}
    //   >
    //     <Grid
    //       container
    //       style={{
    //         display: "flex",
    //         alignItems: "center",
    //         justifyContent: "center",
    //         marginBottom: "20px",
    //       }}
    //     >
    //       <Typography variant="h4">Beverages</Typography>
    //     </Grid>
    //     <Grid container spacing={2} style={{ paddingLeft: "15px" }}>
    //       <FormControl fullWidth>
    //         <Typography component="p">Select Category</Typography>
    //         <InputLabel id="demo-simple-select-label">
    //           Select Category
    //         </InputLabel>
    //         <Select
    //           labelId="demo-simple-select-label"
    //           id="demo-simple-select"
    //           value={categoryId}
    //           label="Categories"
    //           onChange={(e) => setCategoryId(e.target.value)}
    //         >
    //           {categories &&
    //             categories.map((e, i) => (
    //               <MenuItem value={e.uniqueId} key={i}>
    //                 {e.name}
    //               </MenuItem>
    //             ))}
    //         </Select>
    //       </FormControl>
    //     </Grid>
    //     <Grid container spacing={2} style={{ marginTop: 10 }}>
    //       <Grid xs={6} item>
    //         <Typography component="p">Beverages Name</Typography>
    //         <TextField
    //           id="outlined-basic"
    //           placeholder="Beverages Name"
    //           variant="outlined"
    //           fullWidth
    //           onChange={(e) => setName(e.target.value)}
    //           value={name}
    //         />
    //       </Grid>
    //       <Grid xs={6} item>
    //         <Typography component="p">Beverages Description</Typography>
    //         <TextField
    //           id="outlined-basic"
    //           placeholder="Beverages Description"
    //           variant="outlined"
    //           fullWidth
    //           onChange={(e) => setDescription(e.target.value)}
    //           value={description}
    //         />
    //       </Grid>
    //     </Grid>
    //     <Grid container spacing={2} style={{ marginTop: 10 }}>
    //       <Grid xs={6} item>
    //         <Typography component="p">Sku</Typography>
    //         <TextField
    //           id="outlined-basic"
    //           placeholder="Sku"
    //           variant="outlined"
    //           fullWidth
    //           type="number"
    //           onChange={(e) => setSku(e.target.value)}
    //           value={sku}
    //         />
    //       </Grid>
    //       <Grid xs={6} item>
    //         <Typography component="p">Price</Typography>
    //         <TextField
    //           id="outlined-basic"
    //           placeholder="Price"
    //           type="number"
    //           variant="outlined"
    //           fullWidth
    //           onChange={(e) => setPrice(e.target.value)}
    //           value={price}
    //         />
    //       </Grid>
    //     </Grid>
    //     <Grid container spacing={2} style={{ marginTop: 10 }}>
    //       <Grid xs={6} item>
    //         <FormGroup>
    //           <RadioGroup
    //             aria-labelledby="demo-radio-buttons-group-label"
    //             defaultValue="female"
    //             name="radio-buttons-group"
    //             style={{
    //               display: "flex",
    //               alignItems: "center",
    //               justifyContent: "center",
    //               flexDirection: "row",
    //             }}
    //           >
    //             <FormControlLabel
    //               value="true"
    //               control={<Radio />}
    //               label="instock"
    //               onChange={(e) => setStock(e.target.value)}
    //             />
    //             <FormControlLabel
    //               value="false"
    //               control={<Radio />}
    //               label="outstock"
    //               onChange={(e) => setStock(e.target.value)}
    //             />
    //           </RadioGroup>
    //         </FormGroup>
    //       </Grid>
    //       <Grid xs={6} item>
    //         <Typography component="p">Product Image</Typography>
    //         <TextField
    //           id="outlined-basic"
    //           variant="outlined"
    //           fullWidth
    //           type="file"
    //           inputProps={{
    //             multiple: true,
    //             accept: "image/*",
    //           }}
    //           onChange={handleGalleryImageChange}
    //         />
    //         {selectedGalleryImages &&
    //           selectedGalleryImages.map((image, index) => (
    //             <span key={index} style={{ marginTop: "10px" }}>
    //               <img
    //                 src={image.url}
    //                 alt={`Selected ${index + 1}`}
    //                 style={{
    //                   maxWidth: "100px",
    //                   height: "50px",
    //                   marginRight: "10px",
    //                 }}
    //               />
    //             </span>
    //           ))}
    //         <div>
    //           {selectedGalleryImages && selectedGalleryImages.length ? (
    //             <Button variant="contained" onClick={SaveImages}>
    //               Save Images
    //             </Button>
    //           ) : null}
    //         </div>
    //       </Grid>
    //     </Grid>
    //     <Grid
    //       container
    //       spacing={2}
    //       style={{ marginTop: 10, paddingLeft: "15px" }}
    //     >
    //       {!editData._id ? (
    //         <Button variant="contained" onClick={addProduct} fullWidth>
    //           Add Beveages
    //         </Button>
    //       ) : (
    //         <Grid
    //           container
    //           spacing={2}
    //           style={{ marginTop: 10, paddingLeft: "15px" }}
    //         >
    //           <Grid xs={6} item>
    //             <Button variant="contained" onClick={saveEdit} fullWidth>
    //               Save
    //             </Button>
    //           </Grid>
    //           <Grid xs={6} item>
    //             <Button
    //               variant="contained"
    //               color="error"
    //               fullWidth
    //               onClick={() => cancelEdit()}
    //               style={{ marginTop: 5 }}
    //             >
    //               Cancel
    //             </Button>
    //           </Grid>
    //         </Grid>
    //       )}
    //     </Grid>
    //   </Box>
    //   <TableContainer component={Paper} style={{ width: "95%", marginTop: 40 }}>
    //     <Table sx={{ minWidth: 700 }} aria-label="customized table">
    //       <TableHead>
    //         <TableRow>
    //           <StyledTableCell>id</StyledTableCell>
    //           <StyledTableCell align="left">name</StyledTableCell>
    //           <StyledTableCell align="left">description</StyledTableCell>
    //           <StyledTableCell align="left">image</StyledTableCell>
    //           <StyledTableCell align="left">price</StyledTableCell>
    //           <StyledTableCell align="left">sku</StyledTableCell>
    //           <StyledTableCell align="left">stock</StyledTableCell>
    //           <StyledTableCell align="left"></StyledTableCell>
    //           <StyledTableCell align="left"></StyledTableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {allBeverages &&
    //           allBeverages.map((e, index) => (
    //             <React.Fragment key={index}>
    //               <StyledTableRow>
    //                 <StyledTableCell component="th" scope="row">
    //                   {e._id}
    //                 </StyledTableCell>
    //                 <StyledTableCell sx={{ whiteSpace: "nowrap" }} align="left">
    //                   {e.name}
    //                 </StyledTableCell>
    //                 <StyledTableCell sx={{ whiteSpace: "nowrap" }} align="left">
    //                   {e.description}
    //                 </StyledTableCell>
    //                 <StyledTableCell align="left">
    //                   <div style={{ display: "flex" }}>
    //                     {e?.images?.map((image, i) => (
    //                       <img
    //                         src={image}
    //                         width={50}
    //                         height={50}
    //                         style={{ marginRight: 10 }}
    //                       />
    //                     ))}
    //                   </div>
    //                 </StyledTableCell>
    //                 <StyledTableCell sx={{ whiteSpace: "nowrap" }} align="left">
    //                   Rs {e.price}
    //                 </StyledTableCell>
    //                 <StyledTableCell sx={{ whiteSpace: "nowrap" }} align="left">
    //                   {e.sku}
    //                 </StyledTableCell>
    //                 <StyledTableCell align="left">
    //                   {e.instock.toString()}
    //                 </StyledTableCell>
    //                 <StyledTableCell align="left">
    //                   <Button
    //                     variant="contained"
    //                     color="error"
    //                     onClick={() => Delete(e._id)}
    //                     style={{ marginTop: 5 }}
    //                   >
    //                     Delete
    //                   </Button>
    //                 </StyledTableCell>
    //                 <StyledTableCell align="left">
    //                   <Button
    //                     variant="contained"
    //                     color="success"
    //                     onClick={() => edit(e)}
    //                     style={{ marginTop: 5, marginLeft: 20 }}
    //                   >
    //                     Edit
    //                   </Button>
    //                 </StyledTableCell>
    //               </StyledTableRow>
    //             </React.Fragment>
    //           ))}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    // </div>
  );
}
export default AddProduct;
