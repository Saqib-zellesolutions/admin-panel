import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CliftonLocalUrl, LocalUrl } from "../../config/env";
import { toast } from "react-toastify";
function CategoryUpdateModal({ open, handleClose, setEditData, editData }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "75%",
    padding: 4,
    borderRadius: "10px",
    backgroundColor: "#111633",
    color: "#cbccd2",
    boxShadow: " 0px 0px 2px #6a7199",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
  };
  const theme = useTheme();
  const [name, setName] = useState("");
  const [imageData, setImageData] = useState("");
  const [fileurl, setFileurl] = useState("");
  const [editingId, setEditingId] = useState("");
  const [loader, setLoading] = useState(false);
  const [banner, setBanner] = useState("");
  const [bannerFileUrl, setBannerFileUrl] = useState("");
  const branch = localStorage.getItem("branchName");
  useEffect(() => {
    setName(editData.name);
    setFileurl(editData.image);
    setBannerFileUrl(editData.banner_image);
    setEditingId(editData._id);
  }, [editData]);
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

  const handleEditSubmit = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name,
      image: fileurl,
      banner_image: bannerFileUrl,
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
        console.log(result);
        window.location.reload();
        setEditData({});
        setEditingId("");
        setName("");
        setImageData([]);
        handleClose();
      })
      .catch((error) => console.log("error", error));
  };
  const cancelEdit = () => {
    setEditData({});
    setEditingId(null); // Exit edit mode
    setName("");
    setImageData([]);
    handleClose();
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
          onClick={() => handleClose()}
          style={{
            float: "right",
            // margin: "10px 0",
            cursor: "pointer",
          }}
        />
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
                  <Typography variant="h4">Edit Category</Typography>
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
                      //   value={imageData}
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
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Modal>
  );
}
export default CategoryUpdateModal;