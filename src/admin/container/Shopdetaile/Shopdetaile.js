import { Email } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useFormik, validateYupSchema } from 'formik';
import React, { useEffect, useState } from 'react';
import { object, string } from 'yup';
import EditIcon from '@mui/icons-material/Edit';
import FormControl from '@mui/material/FormControl';

function Shopdetaile(props) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState('');
    const [shopdata, setShopdata] = useState('');
    const [update, setUpdte] = useState(false);





    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        resetForm();
        
    };

    useEffect(() => {
        getData();
    },[])

    const getData = () => {
        const shopData = JSON.parse(localStorage.getItem("shopDetaileData"))
        setData(shopData)

        const shopdet = JSON.parse(localStorage.getItem("shopDetaile"))
        setShopdata(shopdet)
    }

    const Shopdatetaileschema = object({
        name: string().required(),
        email: string().required().email(),
        review: string().required(),
        rating: string().required()
    })
    const formicksdata = useFormik({
        initialValues: {
            name: '',
            email: '',
            review: '',
            rating: ''
        },
        validateSchema: Shopdatetaileschema,
        onsubmit: (values, {resetForm}) => {
            console.log(values);
            const shopData = JSON.parse(localStorage.getItem("shopDetaile"))
            if (update) {
                let index = shopData.findIndex((v) => v.id === values);
                console.log(index);
                shopData[index] = values;
                localStorage.setItem("shopDetaile", JSON.stringify(shopData));
            } else {
                let obj = { ...values, id: Math.floor(Math.random() * 1000) }
                if (shopData) {
                    shopData.push(obj);
                    localStorage.setItem("shopDetaile", JSON.stringify(shopData));
                } else {
                    localStorage.setItem("shopDetaile", JSON.stringify([obj]));
                }
            }

            getData();
            resetForm();
        }
    });

    const handleEdite = (shopdata) => {
        setValues(shopdata);
        handleClickOpen();
        setUpdte(true)
    }
    const columns = [

        { field: "name", headerName: "name", width: 130 },
        { field: "email", headerName: "email", width: 130 },
        { field: "review", headerName: "review", width: 130 },
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


    const { handleSubmit, handleBlur, handleChange, errors, values, touched, setValues,resetForm } = formicksdata;
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


                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Rating</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.rating}
                                label="rating"
                                name='rating'
                                onChange={handleChange}
                                onBlur={handleBlur}

                            >
                                
                                <MenuItem value={1}>Padding</MenuItem>
                                <MenuItem value={2}>Reject</MenuItem>
                                <MenuItem value={3}>Approved</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                </form>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">{update ? "Update" : "Submit"}</Button>
                </DialogActions>
            </Dialog>
            <Paper sx={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={shopdata}
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