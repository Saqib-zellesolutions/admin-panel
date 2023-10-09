import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../../App.css";
import { CliftonLocalUrl, LocalUrl } from "../../config/env";
import { Scrollbar } from "../scrollbar";
import { SeverityPill } from "../severity-pill.js";
import OrderItemModal from "../order-item-modal";

function Order() {
  const [order, setOrder] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [modalId, setModalId] = useState("");
  const [open, setOpen] = useState(false);
  const branch = localStorage.getItem("branchName");
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${
        branch === "Bahadurabad" ? LocalUrl : CliftonLocalUrl
      }/OrderPlace/get-order-place`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.length);
        setOrder(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const handleOpen = (e, order) => {
    setModalData(e);
    setModalId(order._id);
    setStatus(order.status);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [status, setStatus] = React.useState("");
  const handleChange = (event, id) => {
    setStatus(event.target.value);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      ...order,
      status: event.target.value,
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
      }/OrderPlace/edit-order-place/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        toast.success("status updated");
        setStatus("");
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
  };
  const statusMap = {
    processing: "warning",
    completed: "success",
    cancled: "error",
  };
  return order.length == 0 ? (
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
            <Grid
              container
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4">Orders</Typography>
            </Grid>
            <Card
              className="main-order-table glass-morphism"
              sx={{ padding: "unset !important", mt: 3 }}
            >
              <Divider />
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="table-heading-and-data">
                        Order Id
                      </TableCell>
                      <TableCell className="table-heading-and-data">
                        Order Date
                      </TableCell>
                      <TableCell className="table-heading-and-data">
                        Title
                      </TableCell>
                      <TableCell className="table-heading-and-data">
                        Name
                      </TableCell>
                      <TableCell className="table-heading-and-data">
                        Mobile Number
                      </TableCell>
                      <TableCell className="table-heading-and-data">
                        Alternate Number
                      </TableCell>
                      <TableCell className="table-heading-and-data">
                        email
                      </TableCell>
                      <TableCell className="table-heading-and-data">
                        Total Amount
                      </TableCell>
                      <TableCell className="table-heading-and-data">
                        Nearest landmark
                      </TableCell>
                      <TableCell className="table-heading-and-data">
                        Delivery Instruction
                      </TableCell>
                      <TableCell className="table-heading-and-data">
                        Payment
                      </TableCell>
                      <TableCell className="table-heading-and-data">
                        tax
                      </TableCell>
                      <TableCell className="table-heading-and-data">
                        Delivery Charges
                      </TableCell>
                      <TableCell className="table-heading-and-data">
                        location
                      </TableCell>
                      <TableCell className="table-heading-and-data">
                        Status
                      </TableCell>
                      <TableCell className="table-heading-and-data">
                        View Product
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order?.map((e) => {
                      return (
                        <TableRow hover key={e._id}>
                          <TableCell>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                              className="product-table-text"
                            >
                              {e.order_number}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              {e.order_Date}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              {e.title}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              {e.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              {e.mobile_number}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              {e.alternate_number}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              {e.email}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              {e.total_amount}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              {e.nearest_landmark}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              {e.delivery_instructions}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              {e.payment}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              {e.tax}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              {e.delivery_charges}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              {e.address.location}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              <SeverityPill color={statusMap[e.status]}>
                                {e.status}
                              </SeverityPill>
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleOpen(e.ProductOrder, e)}
                              >
                                View Order Product
                              </Button>
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
      <OrderItemModal
      status={status}
      modalId={modalId}
        modalData={modalData}
        open={open}
        handleClose={handleClose}
        handleChange={handleChange}
      />
    </div>
  );
}
export default Order;
