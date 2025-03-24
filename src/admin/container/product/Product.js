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
import { FormHelperText } from '@mui/material';


function Product(props) {
    const [open, setOpen] = React.useState(false);
    const [product, setProduct] = React.useState({});
    const [update, setUpdate] = React.useState([]);
    const [category, setCategory] = React.useState([]);
    const [subcategory, setSubCategory] = React.useState([]);

    useEffect(() => {
        getData();
    }, [])



    const getData = () => {
        const prodata = JSON.parse(localStorage.getItem("product"))
        setProduct(prodata);

        const catedata = JSON.parse(localStorage.getItem("category"))
        setCategory(catedata);

        const subdata = JSON.parse(localStorage.getItem("subcategory"))
        setSubCategory(subdata);
    }


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

            const prodata = JSON.parse(localStorage.getItem("product"))

            let obj = { ...values, id: Math.floor(Math.random() * 1000) };
            if (prodata) {
                prodata.push(obj);
                localStorage.setItem("product", JSON.stringify(prodata));
            } else {
                localStorage.setItem("product", JSON.stringify([obj]));
            }
        }
    })

    const { handleSubmit, handleBlur, handleChange, values, errors, touched, resetForm } = formikpdata

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
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.Category}
                            >
                                <option value="">--Select Category--</option>
                                {
                                    category?.map((v) => (
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
                                <option value="">--Select Category--</option>
                                {
                                    subcategory?.map((v) => (
                                        <option value={v.id}>{v.SubCategory}</option>
                                    ))
                                }
                            </NativeSelect>
                            <FormHelperText>{touched.SubCategory && errors.SubCategory ? errors.Category : ""}</FormHelperText>
                        </FormControl>
                        <TextField
                            autoFocus
                            required
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
                            autoFocus
                            required
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
                        />
                        {touched.price && errors.price ? errors.price : ""}

                        <TextField
                            autoFocus
                            required
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
                        />
                        {touched.pDescripition && errors.pDescripition ? errors.pDescripition : ""}

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

export default Product;
