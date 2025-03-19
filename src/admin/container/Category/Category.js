import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { object, string } from "yup";
import { useFormik, validationSchema } from "formik";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { handleSubmit, handleBlur, handleChange, values, errors, touched } =
    formikcat;

  console.log(values);
  const columns = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    
  ];
  
  
  const paginationModel = { page: 0, pageSize: 5 };
  

  return (
    <React.Fragment>
      <h1>Category Data</h1>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Category
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          },
        }}
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
    </React.Fragment>
  );
}

export default Category;
