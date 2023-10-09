import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
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
}) {
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
            margin: "10px 0",
            cursor: "pointer",
          }}
        />
        <Container
          sx={{
            mt: 5,
            height: "80% !important",
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
          >
            <Grid item xs={12}>
              <Card
                className="main-order-table glass-morphism"
                sx={{
                  padding: "unset !important",
                  // overflow:"scroll"
                  height: "80% !important",
                }}
              >
                <Divider />
                <TableContainer style={{ height: "100%", overflow: "auto" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell className="table-heading-and-data">
                          Name
                        </TableCell>
                        <TableCell className="table-heading-and-data">
                          Description
                        </TableCell>
                        <TableCell className="table-heading-and-data">
                          Image
                        </TableCell>
                        <TableCell
                          className="table-heading-and-data"
                          align="right"
                        >
                          Price
                        </TableCell>
                        <TableCell
                          className="table-heading-and-data"
                          align="right"
                        >
                          Sku
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {modalData &&
                        modalData?.map((e) => {
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
                                  {e?.description}
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
                              <TableCell align="right">
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  noWrap
                                >
                                  {e?.price}
                                </Typography>
                              </TableCell>
                              <TableCell align="right">
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
              </Card>
            </Grid>
          </Grid>
        </Container>
        <FormControl style={{ marginTop: 10, color: "white" }}>
          <FormLabel sx={{ color: "white" }}>Status</FormLabel>
          <RadioGroup
            style={{ flexDirection: "row", color: "#000" }}
            value={status}
            onChange={(event) => {
              handleChange(event, modalId);
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
        </FormControl>
      </Box>
    </Modal>
  );
}
