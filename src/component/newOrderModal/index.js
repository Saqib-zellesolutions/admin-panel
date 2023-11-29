import { Box, Button, Modal, Typography, useTheme } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  height: "20%",
  padding: 4,
  borderRadius: "10px",
  backgroundColor: "#111633",
  color: "#cbccd2",
  boxShadow: " 0px 0px 2px #6a7199",
  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
};
function NewOrderModal({handleClose, open, handleAcceptReject}) {
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
            width: "30%",
            height: "20%",
            // Add other styles for small screens here
          },
          [theme.breakpoints.down("sm")]: {
            // Style for screens smaller than or equal to small breakpoint (e.g., mobile devices)
            paddingLeft: "10px",
            paddingRight: "10px",
            width: "30%",
            height: "20%",
            // Add other styles for small screens here
          },
        }}
      >
        {" "}
        <Typography sx={{ textAlign: "center" }} component="h1" variant="h5">
          New Order
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "25px",
          }}
        >
          <Button variant="container" onClick={() => handleAcceptReject("processing")}>
            Accept
          </Button>
          <Button onClick={() => handleAcceptReject("cancled")}>Reject</Button>
        </Box>
      </Box>
    </Modal>
  );
}
export default NewOrderModal;
