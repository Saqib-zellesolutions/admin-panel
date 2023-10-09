// import * as React from "react";
// import { useState } from "react";
// import { Button } from "@mui/material";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import dayjs from "dayjs";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: "10px",
// };

// function CustomDateModal({ handleClose, open, filterOrders }) {
//   const [selectedValue, setSelectedValue] = useState([
//     dayjs("2023-09-20"),
//     dayjs("2023-09-30"),
//   ]);

//   const handleDateChange = (newValue) => {
//     setSelectedValue(newValue);
//   };

//   const handleApply = () => {
//     // Call the filterOrders function with the selected date range
//     filterOrders("custom", selectedValue[0], selectedValue[1]);
//     handleClose();
//   };

//   return (
//     <div>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DemoContainer
//               components={["DateRangeCalendar", "DateRangeCalendar"]}
//             >
//               <DemoItem label="Custom Date">
//                 <DateRangeCalendar
//                   calendars={1}
//                   value={selectedValue}
//                   onChange={handleDateChange}
//                 />
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleApply}
//                 >
//                   Apply
//                 </Button>{" "}
//               </DemoItem>
//             </DemoContainer>
//           </LocalizationProvider>
//         </Box>
//       </Modal>
//     </div>
//   );
// }

// export default CustomDateModal;
import { Box, Button, Modal } from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  padding: 4,
  borderRadius: "10px",
  backgroundColor: "#111633",
  color: "#cbccd2",
  border: "none",
  boxShadow: " 0px 0px 2px #6a7199",
  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
  p: 4,
};
function MyDateRangePicker({ handleClose, open, filterOrders }) {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const [start, setStartDate] = useState();
  const [end, setEndDate] = useState();
  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  const handleApply = () => {
    if (start && end) {
      let startDate = dayjs(start);
      let endDate = dayjs(end);
      // console.log(startDate, endDate);
      filterOrders("custom", startDate, endDate);
      handleClose();
    } else {
      console.error("Invalid start or end date");
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DateRange
            ranges={dateRange}
            style={{ background: "transparent" }}
            onChange={handleSelect}
          />
          <Button
            variant="contained"
            fullWidth
            color="secondary"
            onClick={handleApply}
            sx={{ mt: 3 }}
          >
            Apply
          </Button>{" "}
        </Box>
      </Modal>
    </div>
  );
}

export default MyDateRangePicker;
