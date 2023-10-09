import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { useState } from "react";
export default function NewTable({ data, theme, edit, Delete }) {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };
  return (
    <Container sx={{ mt: 5 }} maxWidth="lg">
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
                    <TableCell className="table-heading-and-data" align="right">
                      Price
                    </TableCell>
                    <TableCell className="table-heading-and-data" align="right">
                      Sku
                    </TableCell>
                    <TableCell className="table-heading-and-data" align="right">
                      Stock
                    </TableCell>
                    <TableCell className="table-heading-and-data" align="right">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data &&
                    data?.map((e) => {
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
                          <TableCell align="right">
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              {e?.instock?.toString()}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Tooltip title="Edit Product" arrow>
                              <IconButton
                                onClick={() => edit(e)}
                                sx={{
                                  "&:hover": {
                                    background: theme.colors.primary.lighter,
                                  },
                                  color: theme.palette.primary.main,
                                }}
                                color="inherit"
                                size="small"
                              >
                                <EditTwoToneIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Product" arrow>
                              <IconButton
                                onClick={() => Delete(e._id)}
                                sx={{
                                  "&:hover": {
                                    background: theme.colors.error.lighter,
                                  },
                                  color: theme.palette.error.main,
                                }}
                                color="inherit"
                                size="small"
                              >
                                <DeleteTwoToneIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <Box p={2}>
              <TablePagination
                component="div"
                count={data?.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25, 30]}
              />
            </Box> */}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
