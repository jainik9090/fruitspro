import { Category } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { object, string } from "yup";

function Subcategory(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const Subcategoryyup = object({
    SubCategory: string().required(),
    Descripition: string().required(),
  });

  const formikcat = useFormik({
    initialValues: {
      SubCategory: "",
      Descripition: "",
    },
    validationSchema: Subcategoryyup,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const { handleSubmit, handleBlur, handleChange, values, errors, touched } =
    formikcat;

  console.log(values);

  return (
    <React.Fragment>
      <h1>Sub Category</h1>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Sub Category
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
        <DialogTitle>Sub Category</DialogTitle>

        <form onSubmit={handleSubmit}>
          <FormControl sx={{m: 2, minWidth:120}} size="small">
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.Category}
              label="Category Name"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <MenuItem value={1}>{values.Category}</MenuItem>
        
        
            </Select>
          </FormControl>
          <DialogContent>
            <TextField
              margin="dense"
              id="sub category"
              name="SubCategory"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.SubCategory && errors.SubCategory}
              helperText={
                touched.SubCategory && errors.SubCategory
                  ? errors.SubCategory
                  : ""
              }
            />
            <TextField
              margin="dense"
              id="sub dec"
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

export default Subcategory;
