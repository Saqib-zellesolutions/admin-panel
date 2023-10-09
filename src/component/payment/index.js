import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CliftonLocalUrl, LocalUrl } from "../../config/env";
import { toast } from "react-toastify";

const label = { inputProps: { "aria-label": "Switch demo" } };

function Payment() {
  const [method, setMethod] = useState([]);
  const [loading, setLoading] = useState(true);
  const branch = localStorage.getItem("branchName");
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${
        branch === "Bahadurabad" ? LocalUrl : CliftonLocalUrl
      }/payment-method/get-payment-method`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setMethod(result);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => console.log("error", error));
  }, []);

  const handleSwitchChange = (index) => {
    // Clone the method array to avoid mutating state directly
    const updatedMethod = [...method];
    updatedMethod[index].enable = !updatedMethod[index].enable; // Toggle enable value
    setMethod(updatedMethod);

    // Make an API call to update the 'enable' property on the server
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      method: updatedMethod[index].method,
      enable: updatedMethod[index].enable,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(updatedMethod[index]._id);
    fetch(
      `${
        branch === "Bahadurabad" ? LocalUrl : CliftonLocalUrl
      }/payment-method/edit-payment-method/${updatedMethod[index]._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  return loading ? (
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
      <Box
        component={Paper}
        rowrpacing={1}
        columnspacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          width: "90%",
          padding: "20px",
          mt: 3,
        }}
        className=" glass-morphism"
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
          <Typography variant="h4">Payment Method</Typography>
        </Grid>
        <Box className="method-container">
          {method.length &&
            method.map((e, index) => (
              <div
                key={e._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "200px",
                  justifyContent: "space-between",
                  padding: "5px 10px",
                  boxShadow:
                    "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                  boxSizing: "border-box",
                  borderRadius: "50px",
                }}
              >
                <Typography variant="body2">{e.method}</Typography>
                <Switch
                  color="secondary"
                  {...label}
                  checked={e.enable}
                  onChange={() => handleSwitchChange(index)} // Call handleSwitchChange with index
                />
              </div>
            ))}
        </Box>
      </Box>
    </div>
  );
}

export default Payment;
