import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Slider from '@mui/material/Slider';
import { useDispatch, useSelector } from "react-redux";
import { productUser } from "../../admin/container/redux/slice/product.slice";
import { getCategory } from "../../admin/container/redux/slice/category.slice";

function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [selectedcat, setSelectedcat] = useState('');
  const [price, setPrice] = useState(0);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const productData = useSelector(state => state.product)
  const categoryData = useSelector(state => state.category)




  // const fetchProduct = async () => {
  //   const responce = await fetch("http://localhost:4000/Product");
  //   const data = await responce.json();

  //   if (data && data.productData?.product) {
  //     setProducts(data.productData?.product);
  //   }
  // }




  const getData = () => {
    dispatch(productUser())
    dispatch(getCategory())

    console.log(productData?.product, categoryData?.category);


    //   const UniqueData = []
    //   setProducts(localData);
    //   localData.map((v, i) => {
    //     let x = catedata.find((v1) => v1.id == v.Category)

    //     if (!UniqueData.some((v2) => v2.id == v.Category)) {
    //       UniqueData.push(x);
    //     }
    //   })
    //   console.log(UniqueData);

    //   setCategory(UniqueData)
  }

  useEffect(() => {
    getData();
    // fetchProduct();
  }, [])


  const handleFilter = () => {
    const fdata = productData?.product.filter((v) =>
      v.pname?.toLowerCase().includes(search?.toLowerCase()) ||
      v.pDescripition?.toLowerCase().includes(search?.toLowerCase()) ||
      v.price?.toLowerCase().includes(search?.toLowerCase())

    )
    const sData = fdata.sort((a, b) => {
      if (sort === "az") {
        return a.pname.localeCompare(b.pname);
      } else if (sort === "za") {
        return b.pname.localeCompare(a.pname);
      } else if (sort === "lh") {
        return a.price - b.price
      } else if (sort === "hl") {
        return b.price - a.price
      }




    })

    if (selectedcat) {
      const ssdata = sData.filter((v1) => v1.Category == selectedcat);
      return ssdata;
    }

    if (price) {
      const sldata = sData.filter((v2) => v2.price <= price)
      return sldata;

    }

    return sData;
  }


  const Finaldata = handleFilter();

  console.log(productData?.product);

  const selectedpage = (selpage) => {
    if (selpage >= 1 &&
      selpage <= productData?.product.length &&
      selpage !== page)

      setPage(selpage);
  }


  return (
    productData?.product.length > 0 ?
      <div>
        {/* Single Page Header start */}
        <div className="container-fluid page-header py-5">
          <h1 className="text-center text-white display-6">Shop</h1>
          <ol className="breadcrumb justify-content-center mb-0">
            <li className="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Pages</a>
            </li>
            <li className="breadcrumb-item active text-white">Shop</li>
          </ol>
        </div>
        {/* Single Page Header End */}
        {/* Fruits Shop Start*/}
        <div className="container-fluid fruite py-5">
          <div className="container py-5">
            <h1 className="mb-4">Fresh fruits shop</h1>
            <div className="row g-4">
              <div className="col-lg-12">
                <div className="row g-4">
                  <div className="col-xl-3">
                    <div className="input-group w-100 mx-auto d-flex">
                      <input
                        type="search"
                        className="form-control p-3"
                        placeholder="keywords"
                        aria-describedby="search-icon-1"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />

                      <span id="search-icon-1" className="input-group-text p-3">
                        <i className="fa fa-search" />
                      </span>
                    </div>
                  </div>
                  <div className="col-6" />
                  <div className="col-xl-3" >
                    <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                      <label htmlFor="fruits">Default Sorting:</label>
                      <select
                        id="fruits"
                        name="fruitlist"
                        className="border-0 form-select-sm bg-light me-3"
                        form="fruitform"
                        onChange={(e) => setSort(e.target.value)}
                      >
                        <option value="0">--Select Product--</option>
                        <option value="az">Title: A-Z</option>
                        <option value="za">Title: Z-A</option>
                        <option value="hl">Prices: High-Low</option>
                        <option value="lh">Prices: Low-High</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row g-4">
                  <div className="col-lg-3">
                    <div className="row g-4">
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <h4>Categories</h4>
                          <ul className="list-unstyled fruite-categorie">
                            <li>
                              <div className="d-flex justify-content-between fruite-name">
                                <a href="#" onClick={() => setSelectedcat()} style={{
                                  color: selectedcat ? "#81c408" : "orange",
                                }}>
                                  <i className="fas fa-apple-alt me-2" ></i>
                                  All
                                </a>
                                <span>({products.length})</span>
                              </div>
                            </li>
                            {
                              categoryData?.category.map((v) => (
                                <li>
                                  <div className="d-flex justify-content-between fruite-name">
                                    <a href="#" onClick={() => setSelectedcat(v.id)} style={{
                                      color: selectedcat == v.id ? "orange" : "#81c408",
                                    }}>
                                      <i className="fas fa-apple-alt me-2" ></i>
                                      {v.Category}
                                      {/* {category?.find((c) => c.id == v.Category).Category} */}
                                    </a>
                                    <span>({productData?.product.filter((v1) => v1.Category == v.id).length})</span>
                                  </div>
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <h4 className="mb-2">Price</h4>
                          <Slider
                            style={{ color: "#81c408 " }}
                            defaultValue={0}
                            aria-label="Default"
                            valueLabelDisplay="auto"
                            min={100}
                            max={500}
                            onChange={(e, v) => setPrice(v)}
                            value={price}
                          />
                          <output
                            id="amount"
                            name="amount"
                            min={0}
                            max={500}
                            htmlFor="rangeInput"
                          >
                            {price}
                          </output>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <h4>Additional</h4>
                          <div className="mb-2">
                            <input
                              type="radio"
                              className="me-2"
                              id="Categories-1"
                              name="Categories-1"
                              defaultValue="Beverages"
                            />
                            <label htmlFor="Categories-1"> Organic</label>
                          </div>
                          <div className="mb-2">
                            <input
                              type="radio"
                              className="me-2"
                              id="Categories-2"
                              name="Categories-1"
                              defaultValue="Beverages"
                            />
                            <label htmlFor="Categories-2"> Fresh</label>
                          </div>
                          <div className="mb-2">
                            <input
                              type="radio"
                              className="me-2"
                              id="Categories-3"
                              name="Categories-1"
                              defaultValue="Beverages"
                            />
                            <label htmlFor="Categories-3"> Sales</label>
                          </div>
                          <div className="mb-2">
                            <input
                              type="radio"
                              className="me-2"
                              id="Categories-4"
                              name="Categories-1"
                              defaultValue="Beverages"
                            />
                            <label htmlFor="Categories-4"> Discount</label>
                          </div>
                          <div className="mb-2">
                            <input
                              type="radio"
                              className="me-2"
                              id="Categories-5"
                              name="Categories-1"
                              defaultValue="Beverages"
                            />
                            <label htmlFor="Categories-5"> Expired</label>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <h4 className="mb-3">Featured products</h4>
                        <div className="d-flex align-items-center justify-content-start">
                          <div
                            className="rounded me-4"
                            style={{ width: 100, height: 100 }}
                          >
                            <img
                              src="img/featur-1.jpg"
                              className="img-fluid rounded"
                              alt
                            />
                          </div>
                          <div>
                            <h6 className="mb-2">Big Banana</h6>
                            <div className="d-flex mb-2">
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star" />
                            </div>
                            <div className="d-flex mb-2">
                              <h5 className="fw-bold me-2">2.99 $</h5>
                              <h5 className="text-danger text-decoration-line-through">
                                4.11 $
                              </h5>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-start">
                          <div
                            className="rounded me-4"
                            style={{ width: 100, height: 100 }}
                          >
                            <img
                              src="img/featur-2.jpg"
                              className="img-fluid rounded"
                              alt
                            />
                          </div>
                          <div>
                            <h6 className="mb-2">Big Banana</h6>
                            <div className="d-flex mb-2">
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star" />
                            </div>
                            <div className="d-flex mb-2">
                              <h5 className="fw-bold me-2">2.99 $</h5>
                              <h5 className="text-danger text-decoration-line-through">
                                4.11 $
                              </h5>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-start">
                          <div
                            className="rounded me-4"
                            style={{ width: 100, height: 100 }}
                          >
                            <img
                              src="img/featur-3.jpg"
                              className="img-fluid rounded"
                              alt
                            />
                          </div>
                          <div>
                            <h6 className="mb-2">Big Banana</h6>
                            <div className="d-flex mb-2">
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star" />
                            </div>
                            <div className="d-flex mb-2">
                              <h5 className="fw-bold me-2">2.99 $</h5>
                              <h5 className="text-danger text-decoration-line-through">
                                4.11 $
                              </h5>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center my-4">
                          <a
                            href="#"
                            className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100"
                          >
                            Vew More
                          </a>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="position-relative">
                          <img
                            src="img/banner-fruits.jpg"
                            className="img-fluid w-100 rounded"
                            alt
                          />
                          <div
                            className="position-absolute"
                            style={{
                              top: "50%",
                              right: 10,
                              transform: "translateY(-50%)",
                            }}
                          >
                            <h3 className="text-secondary fw-bold">
                              Fresh <br /> Fruits <br /> Banner
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9">
                    <div className="row g-4 justify-content-center">

                      {
                        Finaldata?.slice(page * 2 - 2, page * 2).map((v) => (

                          <div className="col-md-6 col-lg-6 col-xl-4">

                            <NavLink to={'/shopdetail/' + v.id}>
                              <div className="rounded position-relative fruite-item">
                                <div className="fruite-img">
                                  <img
                                    src="img/fruite-item-5.jpg"
                                    className="img-fluid w-100 rounded-top"
                                    alt
                                  />
                                </div>
                                <div
                                  className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                                  style={{ top: 10, left: 10 }}
                                >
                                  {categoryData?.category.find(v1 => v1.id == v.Category)?.Category}
                                </div>

                                <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                  <h4>{v.pname}</h4>
                                  <p>
                                    {v.pDescripition}
                                  </p>
                                  <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold mb-0">
                                      {v.price}
                                    </p>
                                    <a
                                      href="#"
                                      className="btn border border-secondary rounded-pill px-3 text-primary"
                                    >
                                      <i className="fa fa-shopping-bag me-2 text-primary" />{" "}
                                      Add to cart
                                    </a>
                                  </div>
                                </div>

                              </div>
                            </NavLink>
                          </div>
                        ))
                      }


                      <div className="col-12">
                        <div className="pagination d-flex justify-content-center mt-5">
                          {
                           Finaldata?.length > 0 && (
                              <div style={{ padding: "10px", margin: "15px 0", display: "flex", justifyContent: "space-between" }}>
                                <span className={page > 1 ? "" : "page_disable"} style={{ padding: "15px 20px", border: "1px solid gray", cursor: "pointer", fontWeight: "500" }} onClick={() => selectedpage(page - 1)}>Prew</span>
                                {
                                  [...Array(Finaldata?.length / 2)].map((_, i) => {
                                    return <span className={page === i + 1 ? "page_selected" : ""} style={{ padding: "15px 20px", border: "1px solid gray", cursor: "pointer", fontWeight: "500" }} onClick={() => selectedpage(i + 1)} key={i}>{i + 1}</span>
                                  })
                                }
                                <span className={page < productData?.product?.length / 2 ? "" : "page_disable"} style={{ padding: "15px 20px", border: "1px solid gray", cursor: "pointer", fontWeight: "500" }} onClick={() => selectedpage(page + 1)}>Next</span>
                              </div>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Fruits Shop End*/}
      </div>
      : <CircularProgress color="success" style={{ height: "none", padding: "200px 0", display: "flex", margin: " 0 auto" }} />

  );
}

export default Shop;
