import { Category } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  NativeSelect,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useFormik } from "formik";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from "react";
import { object, string } from "yup";

function Subcategory(props) {
  const [open, setOpen] = React.useState(false);
  const [data, setCategorydata] = React.useState([]);
  const [subd, setSubd] = useState([]);
  const [update, setUpdate] = useState([]);

  useEffect(() => {
    getcategorydata();
    getData();
  }, []);

  const getcategorydata = () => {
    const localdata = JSON.parse(localStorage.getItem("category"));
    setCategorydata(localdata);
  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpen(false);
    resetForm();
  };
  const Subcategoryyup = object({
    Category: string().required(),
    SubCategory: string().required(),
    Descripition: string().required(),
  });

  const formikcat = useFormik({
    initialValues: {
      Category: "",
      SubCategory: "",
      Descripition: "",
    },
    validationSchema: Subcategoryyup,
    onSubmit: (values, {resetForm}) => {
      console.log(values);
      
      const subdata = JSON.parse(localStorage.getItem("subcategory"))

     if (update) {
      let index = subdata.findIndex((v) => v.id === values.id);
      console.log(index);
      subdata[index] = values;
      localStorage.setItem("subcategory", JSON.stringify(subdata));
     } else {
      let obj = {...values, id:Math.floor(Math.random() *1000)};
      if (subdata) {
        subdata.push(obj);
          localStorage.setItem("subcategory", JSON.stringify(subdata));
      } else {
        localStorage.setItem("subcategory", JSON.stringify([obj]));
      }
     }

      getData();
      handleClose();
      resetForm();
    
    },
  });

  const handleDelete = (id) => {
    console.log(id);
    const subdata = subd.filter((v) => v.id !== id);
    localStorage.setItem("subcategory", JSON.stringify(subdata));
    getData();
    handleClose();
  }


  const handleEdit = (data) => {
    console.log(data);
    setValues(data)
    handleClickOpen();
    setUpdate(true);
  }

  const columns = [
    { field: "Category", headerName: "Category", width: 70 },
    { field: "SubCategory", headerName: "SubCategory", width: 130 },
    { field: "Descripition", headerName: "Descripition", width: 130 },
    {
      headerName: "Action",
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];


  const getData = () => {
    const subdata = JSON.parse(localStorage.getItem("subcategory"))
    
    setSubd(subdata);
  }
  const paginationModel = { page: 0, pageSize: 5 };

  const { handleSubmit, handleBlur, handleChange, values, errors, touched ,resetForm, setValues} =
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
      >
        <DialogTitle>Sub Category</DialogTitle>

        <form onSubmit={handleSubmit}>
           <FormControl sx={{ m: 3, minWidth: 120 }} error={touched.Category && errors.Category}>
            <NativeSelect
              defaultValue={30}
              inputProps={{
                name: 'Category',
                id: 'uncontrolled-native',
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.Category}
            >
              <option value="">--Select Category--</option>
              {
                data?.map((v) => (
                  <option value={v.id}>{v.Category}</option>
                ))
              }
            </NativeSelect>
            <FormHelperText>{ touched.Category && errors.Category? errors.Category:""}</FormHelperText>
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
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={subd}
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

export default Subcategory;
