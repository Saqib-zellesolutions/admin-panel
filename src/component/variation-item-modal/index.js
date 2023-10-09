import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

export default function Variation({ data, open, handleClose }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "80%",
    // backdropFilter: "blur(10px)",
    // backgroundColor: "rgba(255, 255, 255, 0.1)", // Adjust the background color and transparency as needed
    // border: "2px solid rgba(255, 255, 255, 0.4)", // Adjust border color and transparency
    // boxShadow: "0px 0px 20px rgba(140, 124, 240, 0.4)",
    padding: 4,
    borderRadius: "10px",
    backgroundColor: "#111633",
    color: "#cbccd2",
    boxShadow: " 0px 0px 2px #6a7199",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CloseIcon
          onClick={() => handleClose()}
          style={{
            float: "right",
            margin: "10px 0",
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
              <Card
                className="main-order-table glass-morphism"
                sx={{
                  padding: "unset !important",
                  height: "80%",
                }}
              >
                <Divider />
                <TableContainer sx={{ height: "100%", overflow: "auto",pb:3 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">name</TableCell>
                        <TableCell align="left">description</TableCell>
                        <TableCell align="left">image</TableCell>
                        <TableCell align="left">sku</TableCell>
                        <TableCell align="left">price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody sx={{ overflowY: "scroll" }}>
                      {data &&
                        data.map((e, index) => (
                          <TableRow key={e._id}>
                            <TableCell align="left">
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                noWrap
                                className="product-table-text"
                              >
                                {e.name}
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                noWrap
                                className="product-table-text"
                              >
                                {e.description}
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                noWrap
                                className="product-table-text"
                                style={{ diplay: "flex" }}
                              >
                                {e?.images &&
                                  e?.images?.map((image, i) => (
                                    // console.log(e,"renderImage")
                                    <img
                                      key={i}
                                      src={image}
                                      width={50}
                                      height={50}
                                      style={{ marginRight: 10 }}
                                    />
                                  ))}
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              {" "}
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                noWrap
                                className="product-table-text"
                              >
                                {e.sku}
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              {" "}
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                noWrap
                                className="product-table-text"
                              >
                                Rs {e.price}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Modal>
  );
}
