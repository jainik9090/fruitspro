import { Email } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useFormik, validateYupSchema } from 'formik';
import React, { useEffect, useState } from 'react';
import { number, object, string } from 'yup';
import EditIcon from '@mui/icons-material/Edit';
import FormControl from '@mui/material/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import { addShopdet, getShopdet, updateShopdet } from '../redux/slice/shopdet.slice';
import { productUser } from '../redux/slice/product.slice';

function Shopdetaile(props) {
    const [open, setOpen] = useState(false);
    const [shopdata, setShopdata] = useState('');
    const [update, setUpdte] = useState(false);
    const dispatch = useDispatch();

    const shopdeData = useSelector(state => state.shopdet);
    const productData = useSelector(state => state.product)





    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        resetForm();

    };

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
       dispatch(getShopdet())
        dispatch(productUser())
     
    }

    const Shopdatetaileschema = object({
        id: string().required(),
        name: string().required(),
        email: string().required().email(),
        review: string().required(),
        status: string().required(),
        ratting: number()
    })
    const formicksdata = useFormik({
        initialValues: {
            id:'',
            name: '',
            email: '',
            review: '',
            status: '',
            ratting:''
        },
        validateSchema: Shopdatetaileschema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
           
           dispatch(updateShopdet(values))
      
         
            

            // getData();
            resetForm();
            handleClose();
        }
    });

    const handleEdite = (shopdeData) => {
        setValues(shopdeData);
        handleClickOpen();
        setUpdte(true)
    }
    const columns = [
        { field: "id", headerName: "Product", width: 130,
             renderCell: (params) => {
                console.log(params.row.pid, productData?.product);
                const pData = productData?.product?.find(v => v.id === params.row.pid)
                console.log(pData.pname);
                return pData?.pname 

            }
         },
        { field: "name", headerName: "name", width: 130 },
        { field: "email", headerName: "email", width: 130 },
        { field: "review", headerName: "review", width: 130 },
        { field: "status", headerName: "status", width: 130 },
        { field: "ratting", headerName: "ratting", width: 130 },

        {
            headerName: "Action",
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handleEdite(params.row)}>
                        <EditIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    const paginationModel = { page: 0, pageSize: 5 };


    const { handleSubmit, handleBlur, handleChange, errors, values, touched, setValues, resetForm } = formicksdata;
    return (
        <React.Fragment>
            <h1>Shopdetaile Data</h1>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open Shopdetail
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Shopdetaile</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="Enter your name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.name && errors.name}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="Enter your name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.name && errors.name}
                        />
                        {touched.name && errors.name ? errors.name : ''}
                        <TextField
                            margin="dense"
                            id="name"
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && errors.email}
                        />
                        {touched.email && errors.email ? errors.email : ''}
                        <TextField
                            margin="dense"
                            id="name"
                            name="review"
                            label="Review"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={values.review}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.review && errors.review}
                        />
                        {touched.review && errors.review ? errors.review : ''}
                        <InputLabel id="demo-simple-select-label">Rating</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.status}
                            label="status"
                            name='status'
                            onChange={handleChange}
                            onBlur={handleBlur}

                        >

                            <MenuItem value={'Pending'}>Panding</MenuItem>
                            <MenuItem value={'Reject'}>Reject</MenuItem>
                            <MenuItem value={'Approved'}>Approved</MenuItem>
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">{update ? "Update" : "Submit"}</Button>
                    </DialogActions>
                </form>

            </Dialog>
            <Paper sx={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={shopdeData.shopdet}
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

export default Shopdetaile;