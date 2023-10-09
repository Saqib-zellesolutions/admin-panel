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
} from "@mui/material";
import React from "react";

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
export default function OrderItemModal({
  modalData,
  handleClose,
  open,
  handleChange,
  modalId,
  status,
}) {
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
        {/* <TableContainer
          // component={Paper}
          className="modal-table"
          style={{
            width: "100%",
            margin: "auto",
            height: "80%",
            overflowY: "scroll",
          }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  align="left"
                  className="table-heading-and-data"
                >
                  Name
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  className="table-heading-and-data"
                >
                  Description
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  className="table-heading-and-data"
                >
                  Image
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  className="table-heading-and-data"
                >
                  Sku
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  className="table-heading-and-data"
                >
                  Price
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {modalData &&
                modalData.map((e, index) => (
                  <React.Fragment key={index}>
                    <StyledTableRow key={e.email}>
                      <StyledTableCell
                        align="left"
                        className="table-heading-and-data"
                      >
                        {e.name}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className="table-heading-and-data"
                      >
                        {e.description}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <div style={{ display: "flex" }}>
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
                        </div>
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className="table-heading-and-data"
                      >
                        {e.sku}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className="table-heading-and-data"
                      >
                        Rs {e.price}
                      </StyledTableCell>
                    </StyledTableRow>
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </TableContainer> */}
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
