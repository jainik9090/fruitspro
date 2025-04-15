import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect } from 'react';
import { number, object, string } from 'yup';
import { useFormik } from 'formik';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { FormHelperText, IconButton, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct, productUser, updateProduct } from '../redux/slice/product.slice';
import { getCategory } from '../redux/slice/category.slice';


function Product(props) {
    const [open, setOpen] = React.useState(false);
    const [product, setProduct] = React.useState({});
    const [update, setUpdate] = React.useState(false);
    const [category, setCategory] = React.useState([]);
    const [subcategory, setSubCategory] = React.useState([]);

    const dispatch = useDispatch(productUser);

    const p = useSelector(state => state.product)
    console.log(p);

    const c = useSelector(state => state.category);

    const s = useSelector(state => state.subcategory);

    console.log(c.category);



    useEffect(() => {
        getData();
    }, [])



    const getData = () => {
        dispatch(productUser());
        dispatch(getCategory());

        

   
    }

    console.log(category);



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        resetForm();
    };
    const Pruductschema = object({
        Category: string().required(),
        SubCategory: string().required(),
        pname: string().required(),
        price: number().required(),
        pDescripition: string().required(),
    })

    const formikpdata = useFormik({
        initialValues: {
            Category: '',
            SubCategory: '',
            pname: '',
            price: '',
            pDescripition: '',
        },
        validationSchema: Pruductschema,
        onSubmit: (values) => {
            console.log(values);

            if (update) {
                dispatch(updateProduct(values))
            } else {
                dispatch(addProduct(values))
            }
            getData();
            handleClose();
            resetForm();
        }
    })

    const { handleSubmit, handleBlur, handleChange, values, errors, touched, resetForm, setFieldValue, setValues } = formikpdata;

    const handlecatedata = (t) => {
        console.log(t);
    
        const sdata = s?.subcategory.filter((v) => v.Category === t)
        setSubCategory(sdata)
    }


    const columns = [
        {
            field: "Category", headerName: "Category", width: 120,
            renderCell: (params) => {
                console.log(params.row.Category, category);
                const catdat = c?.category.find(v => v.id == params.row.Category)
                console.log(catdat?.Category);
                return catdat?.Category
            }
        },
        {
            field: "SubCategory", headerName: "SubCategory", width: 130,
            renderCell: (params) => {
              
                console.log(params.row.SubCategory);
                const catdat = s?.subcategory.find(v => v.id == params.row.SubCategory)
                console.log(catdat?.SubCategory);
                return catdat?.SubCategory

            }
        },
        { field: "pname", headerName: "pname", width: 130 },
        { field: "price", headerName: "price", width: 130 },
        { field: "pDescripition", headerName: "pDescripition", width: 130 },
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

    const handleDelete = (id) => {
        dispatch(deleteProduct(id))

    }
    const handleEdit = (product) => {
        console.log(product);
        setValues(product);
        handleClickOpen();
        handlecatedata(product.Category);
        setUpdate(true);

    }

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <React.Fragment>
            <h1>Product</h1>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Product
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Product</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <FormControl sx={{ m: 3, minWidth: 120 }} error={touched.Category && errors.Category}>
                            <NativeSelect
                                defaultValue={30}
                                inputProps={{
                                    name: 'Category',
                                    id: 'uncontrolled-native',
                                }}
                                onChange={(e) => {
                                    handlecatedata(e.target.value);
                                    setFieldValue("Category", e.target.value)
                                }}
                                onBlur={handleBlur}
                                value={values.Category}
                            >
                                <option value="">--Select Category--</option>
                                {
                                    c.category?.map((v) => (
                                        <option value={v.id}>{v.Category}</option>
                                    ))
                                }
                            </NativeSelect>
                            <FormHelperText>{touched.Category && errors.Category ? errors.Category : ""}</FormHelperText>
                        </FormControl>

                        <FormControl sx={{ m: 3, minWidth: 120 }} error={touched.Category && errors.Category}>
                            <NativeSelect
                                defaultValue={30}
                                inputProps={{
                                    name: 'SubCategory',
                                    id: 'uncontrolled-native',
                                }}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.SubCategory}
                            >
                                <option value="">--Select Sub Category--</option>
                                {
                                    subcategory?.map((v) => (
                                        <option value={v.id}>{v.SubCategory}</option>
                                    ))
                                }
                            </NativeSelect>
                            <FormHelperText>{touched.SubCategory && errors.SubCategory ? errors.Category : ""}</FormHelperText>
                        </FormControl>
                        <TextField
                            margin="dense"
                            id="name"
                            name="pname"
                            label="Enter Product Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={values.pname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.pname && errors.pname}
                        />
                        {touched.pname && errors.pname ? errors.pname : ""}
                        <TextField
                            margin="dense"
                            id="price"
                            name="price"
                            label="Enter Price"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.price && errors.price}
                            helperText={touched.price && errors.price ? errors.price : ""}
                        />


                        <TextField
                            margin="dense"
                            id="pDescripition"
                            name="pDescripition"
                            label="Enter Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={values.pDescripition}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.pDescripition && errors.pDescripition}
                            helperText={touched.pDescripition && errors.pDescripition ? errors.pDescripition : ""}
                        />


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">{update ? "Update" : "Submit"}</Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Paper sx={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={p.product}
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

export default Product;

