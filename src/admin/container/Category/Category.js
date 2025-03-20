import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { object, string } from "yup";
import { useFormik, validationSchema } from "formik";
import { FormControl, InputLabel, MenuItem, Paper, Select } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';

function Category(props) {
  const [open, setOpen] = React.useState(false);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const categoryyup = object({
    Category: string().required(),
    Descripition: string().required(),
  });

  const formikcat = useFormik({
    initialValues: {
      Category: "",
      Descripition: "",
    },
    validationSchema: categoryyup,
    onSubmit: (values, { resetForm }) => {

      console.log(values);

      let obj = { ...values, id: Math.floor(Math.random() * 1000) }
      console.log(obj);

      const localdata = JSON.parse(localStorage.getItem("category"));

      if (localdata) {
        localdata.push(obj);
        localStorage.setItem("category", JSON.stringify(localdata));
      } else {
        localStorage.setItem("category", JSON.stringify([obj]));
      }
      getData();
      handleClose();
      resetForm();
    },
  });



  const { handleSubmit, handleBlur, handleChange, values, errors, touched } =
    formikcat;

  console.log(values);
  const columns = [
    { field: 'Category', headerName: 'Category', width: 130 },
    { field: 'Description', headerName: 'Description', width: 130 },
    {
      headerName: "Action",
      renderCell: () => (
        <>
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </>
      )
    }

  ];

  const [data, setData] = useState([]);

  const getData = () => {
    const localdata = JSON.parse(localStorage.getItem("category"));
    console.log(localdata);

    setData(localdata);

  }

  const paginationModel = { page: 0, pageSize: 5 };

  useEffect(() => {
    getData();
  }, []);


  return (
    <React.Fragment>
      <h1>Category Data</h1>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Category
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Category</DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              id="category"
              name="Category"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.Category && errors.Category}
              helperText={
                touched.Category && errors.Category ? errors.Category : ""
              }
            />
            <TextField
              margin="dense"
              id="des"
              name="Descripition"
              label="Descripition"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.Descripition && errors.Descripition}
              helperText={
                touched.Descripition && errors.Descripition
                  ? errors.Descripition
                  : ""
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>

       
      </Dialog>
      <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
    </React.Fragment>
  );
}

export default Category;
