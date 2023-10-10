import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "80%",
  padding: 4,
  borderRadius: "10px",
  backgroundColor: "#111633",
  color: "#cbccd2",
  boxShadow: " 0px 0px 2px #6a7199",
  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
};
export default function OrderItemModal({
  modalData,
  handleClose,
  open,
  handleChange,
  modalId,
  status,
  setStatus,
}) {
  const theme = useTheme();
  let numbers;
  if (modalData && Object.keys(modalData).length > 0) {
    console.log("modalData is not empty and has properties");
    numbers = modalData?.payment?.match(/\d+/g);
    console.log("Numbers in the string:", numbers);
  } else {
    console.log("modalData is empty or null");
  }
  // `modalData?.payment` ko string mein convert karo
  // const paymentString = modalData?.payment.toString();

  // Agar `paymentString` ek valid string hai
  // if (
  //   paymentString &&
  //   typeof paymentString === "string" &&
  //   paymentString.length > 0
  // ) {
  //   // Regex ka use karke numbers ko nikalo
  //   const numbers = paymentString.match(/\d+/g);

  //   if (numbers && numbers.length > 0) {
  //     // Numbers mil gaye hain
  //     console.log("Payment Method:", paymentString);
  //     console.log("Numbers in the string:", numbers);
  //   } else {
  //     // Koi numbers nahi mile
  //     console.log("Payment Method:", paymentString);
  //     console.log("No numbers found in the string.");
  //   }
  // } else {
  //   // Yeh kuchh bhi valid nahi hai
  //   console.log("Payment Method not found or not a valid string.");
  // }

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
        <Typography sx={{ textAlign: "center" }} component="h1" variant="h5">
          Customer Detail And Order Product
        </Typography>
        <CloseIcon
          onClick={() => handleClose()}
          sx={{
            float: "right",
            margin: "10px 0",
            cursor: "pointer",
          }}
        />
        <Container
          sx={{
            mt: 5,
            height: "73% !important",
            padding: "0 !important",
          }}
          maxWidth="lg"
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            // spacing={3}
            sx={{ height: "100%" }}
          >
            <Grid item xs={12} sx={{ height: "100%" }}>
              <Card
                className="modal-order-table glass-morphism"
                sx={{
                  padding: "unset !important",
                }}
              >
                <Divider />
                <Box className="table-scroll">
                  <Typography
                    sx={{ textAlign: "center", mt: 3, mb: 3 }}
                    component="h1"
                    variant="h5"
                  >
                    Customer Detail
                  </Typography>
                  <Box
                    className="table-scroll"
                    sx={{
                      padding: "0 15px",
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      // justifyContent:"space-evenly"
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: "5px",
                        mt: 1,
                        alignItems: "center",
                        mr: 2,
                      }}
                    >
                      <Typography component="h1" variant="h5">
                        Name :{" "}
                      </Typography>
                      <Typography component="p" variant="p">
                        {" "}
                        {modalData.name}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "5px",
                        mt: 1,
                        alignItems: "center",
                        mr: 2,
                      }}
                    >
                      <Typography component="h1" variant="h5">
                        Email :{" "}
                      </Typography>
                      <Typography component="p" variant="p">
                        {" "}
                        {modalData.email}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "5px",
                        mt: 1,
                        alignItems: "center",
                        mr: 2,
                      }}
                    >
                      <Typography component="h1" variant="h5">
                        Mobile Number :{" "}
                      </Typography>
                      <Typography component="p" variant="p">
                        {" "}
                        {modalData.mobile_number}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "5px",
                        mt: 1,
                        alignItems: "center",
                        mr: 2,
                      }}
                    >
                      <Typography component="h1" variant="h5">
                        Alternate Name :{" "}
                      </Typography>
                      <Typography component="p" variant="p">
                        {" "}
                        {modalData.alternate_number}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "5px",
                        mt: 1,
                        alignItems: "center",
                        mr: 2,
                      }}
                    >
                      <Typography component="h1" variant="h5">
                        Area:{" "}
                      </Typography>
                      <Typography component="p" variant="p">
                        {" "}
                        {modalData.address?.location}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "5px",
                        mt: 1,
                        alignItems: "center",
                        mr: 2,
                      }}
                    >
                      <Typography component="h1" variant="h5">
                        Delivery Address:{" "}
                      </Typography>
                      <Typography component="p" variant="p">
                        {" "}
                        {modalData?.address?.complete}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "5px",
                        mt: 1,
                        alignItems: "center",
                        mr: 2,
                      }}
                    >
                      <Typography component="h1" variant="h5">
                        Nearest Landmark:{" "}
                      </Typography>
                      <Typography component="p" variant="p">
                        {" "}
                        {modalData?.nearest_landmark}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "5px",
                        mt: 1,
                        alignItems: "center",
                        mr: 2,
                      }}
                    >
                      <Typography component="h1" variant="h5">
                        Delivery Insturction:{" "}
                      </Typography>
                      <Typography component="p" variant="p">
                        {" "}
                        {modalData?.delivery_instructions}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    sx={{ textAlign: "center", mt: 3, mb: 3 }}
                    component="h1"
                    variant="h5"
                  >
                    Order Product
                  </Typography>
                  <TableContainer className="table-scroll">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell className="table-heading-and-data">
                            Name
                          </TableCell>
                          <TableCell className="table-heading-and-data">
                            Image
                          </TableCell>
                          <TableCell className="table-heading-and-data">
                            Unit Price
                          </TableCell>
                          <TableCell className="table-heading-and-data">
                            Quantity
                          </TableCell>
                          <TableCell className="table-heading-and-data">
                            Sku
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {modalData &&
                          modalData?.ProductOrder?.map((e) => {
                            return (
                              <TableRow hover key={e?._id}>
                                <TableCell>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    noWrap
                                    className="product-table-text"
                                  >
                                    {e?.name}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    noWrap
                                  >
                                    {e?.images?.map((image, i) => (
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
                                <TableCell>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    noWrap
                                  >
                                    Rs {e?.price}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    noWrap
                                  >
                                    {e?.quantity}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    noWrap
                                  >
                                    {e?.sku}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box
                    className="table-scroll"
                    sx={{
                      padding: "27px 15px",
                      pt: 0,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: "5px",
                        mt: 1,
                        alignItems: "center",
                        mr: 2,
                      }}
                    >
                      <Typography component="h1" variant="h5">
                        Sub Total :{" "}
                      </Typography>
                      <Typography component="p" variant="p">
                        {" "}
                        Rs {modalData.total_amount}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "5px",
                        mt: 1,
                        alignItems: "center",
                        mr: 2,
                      }}
                    >
                      <Typography component="h1" variant="h5">
                        Shipping :{" "}
                      </Typography>
                      <Typography component="p" variant="p">
                        {" "}
                        Rs {modalData.delivery_charges}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "5px",
                        mt: 1,
                        alignItems: "center",
                        mr: 2,
                      }}
                    >
                      <Typography component="h1" variant="h5">
                        Payment Method:{" "}
                      </Typography>
                      <Typography component="p" variant="p">
                        {numbers && numbers.length > 0
                          ? "cash on Delivery"
                          : modalData?.payment}{" "}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
        {modalData.status === "processing" ? (
          <FormControl
            sx={{ color: "white", marginTop: "10px", width: "100%" }}
          >
            <FormLabel sx={{ color: "white" }}>Status</FormLabel>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <RadioGroup
                style={{ flexDirection: "row", color: "#000" }}
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value);
                  // handleChange(event, modalId);
                }}
                name="radio-buttons-group"
              >
                <FormControlLabel
                  sx={{ color: "white" }}
                  value="processing"
                  control={<Radio />}
                  label="Processing"
                />
                <FormControlLabel
                  sx={{ color: "white" }}
                  value="completed"
                  control={<Radio />}
                  label="Completed"
                />
                <FormControlLabel
                  sx={{ color: "white" }}
                  value="cancled"
                  control={<Radio />}
                  label="Canceled"
                />
              </RadioGroup>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleChange(modalId)}
              >
                change status
              </Button>
            </Box>
          </FormControl>
        ) : (
          <></>
        )}
      </Box>
    </Modal>
  );
}
