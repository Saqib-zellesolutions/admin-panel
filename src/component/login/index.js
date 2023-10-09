import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LocalUrl } from "../../config/env";
import "./style.css";
const theme = createTheme();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branch, setBranch] = useState([
    { branch: "Bahadurabad" },
    { branch: "Clifton" },
  ]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isloading, setLoader] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleChange = (event) => {
    setSelectedBranch(event.target.value);
    localStorage.setItem("branchName", event?.target.value);
  };
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const login = () => {
    setLoader(true);
    // if ((!email, !password, !selectedBranch)) {
    //   alert("please fill the input");
    // } else {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${LocalUrl}/authentictaion/login`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setEmail("");
        setPassword("");
        setSelectedBranch("");
        setLoader(false);
        if (result.data) {
          localStorage.setItem("token", result.data.token);
          navigate("/dashboard");
        } else {
          toast.error(result.message);
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast.error("Your Connection failed");
        setEmail("");
        setPassword("");
        setSelectedBranch("");
      });
    // }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className="main-login glass-morphism"
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          // noValidate
          sx={{
            mt: 1,
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            placeholder="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            variant="outlined"
          />
          <FormControl fullWidth variant="outlined">
            {/* <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel> */}
            <OutlinedInput
              required
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    color="#A1A1A1"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                    style={{ color: "#A1A1A1" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </FormControl>
          {/* <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            /> */}
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="demo-simple-select-label">Branch Name</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedBranch}
              label="Branch Name"
              onChange={handleChange}
            >
              {branch.map((e, i) => {
                return (
                  <MenuItem key={i} value={e.branch}>
                    {e.branch}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="secondary"
            sx={{
              mt: 3,
              mb: 2,
            }}
            onClick={() => login()}
          >
            {isloading ? <CircularProgress color="secondary" /> : "Sign In"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
