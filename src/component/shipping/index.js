import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CliftonLocalUrl, LocalUrl } from "../../config/env";
function Shipping() {
  const [area, setArea] = useState("");
  const [allShipping, setAllShipping] = useState("");
  const [editingId, setEditingId] = useState("");
  const [delivery_charges, setDelivery_charges] = useState("");
  const branch = localStorage.getItem("branchName");
  const deliveryNumber = Number(delivery_charges);
  const addShipping = () => {
    if ((!area, !delivery_charges)) {
      toast.success("Please fill the input");
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        value: area,
        delivery_charges: deliveryNumber,
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
        }/shipping/add-shipping`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          //
          if (!result.shipping) {
            console.log(delivery_charges, area);
            toast.error(result.message);
          } else if (result.shipping) {
            setArea("");
            setDelivery_charges("");
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log("error", error);
          toast.error(error.message);
        });
    }
  };
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${
        branch === "Bahadurabad" ? LocalUrl : CliftonLocalUrl
      }/shipping/get-shipping`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setAllShipping(result);
      })
      .catch((error) => console.log("error", error));
  }, []);
  const Delete = (id) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `${
        branch === "Bahadurabad" ? LocalUrl : CliftonLocalUrl
      }/shipping/delete-shipping/${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        window.location.reload();
        toast.success("Successfully category delete");
      })
      .catch((error) => console.log("error", error));
  };
  const edit = (data) => {
    console.log(data);
    setEditingId(data._id);
    setArea(data.value);
    setDelivery_charges(data.delivery_charges);
  };

  const handleEditSubmit = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      value: area,
      delivery_charges: deliveryNumber,
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
      }/shipping/edit-shipping/${editingId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // window.location.reload();
        if (result.updatedShipping) {
          window.location.reload();
          setEditingId("");
          setArea("");
          setDelivery_charges("");
        } else {
          toast.error(result.message);
          setEditingId("");
          setArea("");
          setDelivery_charges("");
        }
      })
      .catch((error) => console.log("error", error));
  };
  const cancelEdit = () => {
    setEditingId(null); // Exit edit mode
    setArea("");
    setDelivery_charges("");
  };
  return !allShipping ? (
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
                <Typography variant="h4">Shipping</Typography>
              </Grid>
              <Grid container spacing={2} style={{ marginTop: 10 }}>
                <Grid xs={6} item>
                  <Typography component="p">Area</Typography>
                  <TextField
                    required
                    id="outlined-basic"
                    placeholder="Area"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setArea(e.target.value)}
                    value={area}
                  />
                </Grid>
                <Grid xs={6} item>
                  <Typography component="p">Deliver Charges</Typography>
                  <TextField
                    required
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Delivery Charges"
                    fullWidth
                    type="number"
                    onChange={(e) => setDelivery_charges(e.target.value)}
                    value={delivery_charges}
                  />
                </Grid>
              </Grid>
              {editingId && editingId ? (
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
              ) : (
                <Grid
                  container
                  spacing={2}
                  style={{ marginTop: 10, paddingLeft: "15px" }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={addShipping}
                  >
                    Add Shipping
                  </Button>
                </Grid>
              )}
            </Box>
            <Container sx={{ mt: 5 }} maxWidth="md">
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
                    sx={{ padding: "unset !important" }}
                  >
                    <Divider />
                    <TableContainer>
                      <Table aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">Area</TableCell>
                            <TableCell align="left">Deliver Charges</TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left"></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {allShipping &&
                            allShipping?.map((e, index) => (
                              <TableRow hover key={e?._id}>
                                <TableCell align="left">{e.value}</TableCell>
                                <TableCell align="left">
                                  Rs {e.delivery_charges}
                                </TableCell>
                                <TableCell align="left">
                                  <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => Delete(e._id)}
                                    style={{ marginTop: 5 }}
                                  >
                                    Delete
                                  </Button>
                                </TableCell>
                                <TableCell align="left">
                                  <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => edit(e)}
                                    style={{ marginTop: 5, marginLeft: 20 }}
                                  >
                                    Edit
                                  </Button>
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
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
export default Shipping;
