import {
  Button,
  Card,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../../App.css";
import { CliftonLocalUrl, LocalUrl } from "../../config/env";
import OrderItemModal from "../order-item-modal";
import { SeverityPill } from "../severity-pill.js";
import CustomerModal from "../customer-modal";

function Order() {
  const [order, setOrder] = useState([]);
  const [modalData, setModalData] = useState({});
  const [modalId, setModalId] = useState("");
  const [open, setOpen] = useState(false);
  const branch = localStorage.getItem("branchName");
  const [status, setStatus] = React.useState("");
  const [customerDetailModal, setCustomerDetailModal] = useState(false);
  const [customerDetailData, setCustomerDetailData] = useState({});
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
  const handleCustomModalOpen = (e, order) => {
    console.log(e);
    setCustomerDetailData(e);
    setModalId(order._id);
    setStatus(order.status);
    setCustomerDetailModal(true);
  };
  const handleClose = () => setOpen(false);
  const handleCustomDeatilModalClose = () => setCustomerDetailModal(false);

  // const handleChange = (event, id) => {
  const handleChange = (id) => {
    // setStatus(event.target.value);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      ...order,
      status: status,
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
              <TableContainer className="table-scroll">
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
                        Order Time
                      </TableCell>
                      <TableCell className="table-heading-and-data">
                        Name
                      </TableCell>
                      <TableCell className="table-heading-and-data">
                        Mobile Number
                      </TableCell>
                      <TableCell className="table-heading-and-data">
                        Status
                      </TableCell>
                      <TableCell
                        className="table-heading-and-data"
                        align="center"
                      >
                        Action
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
                              {new Date(e.order_Date).toLocaleDateString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              {new Date(e.order_Date).toLocaleTimeString()}
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
                              gap="5px"
                            >
                              {/* <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleCustomModalOpen(e, e)}
                                sx={{ marginRight: 3 }}
                              >
                                Customer Detail
                              </Button> */}
                              <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleOpen(e, e)}
                              >
                                View
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
        setStatus={setStatus}
      />
      <CustomerModal
        status={status}
        modalId={modalId}
        modalData={customerDetailData}
        open={customerDetailModal}
        handleClose={handleCustomDeatilModalClose}
        handleChange={handleChange}
      />
    </div>
  );
}
export default Order;
