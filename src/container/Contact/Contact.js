import { useFormik, validateSchema } from "formik";
import React from "react";
import { object, string, number, date, InferType, bool, boolean, array } from "yup";

function Contact(props) {
  const contactyup = object({
    name: string()
      .required("please enter your name")
      .matches(/^[a-zA-Z]+$/, "enter valid name"),
    email: string()
      .required("your enter email")
      .email("please enter valid email"),
    message: string()
      .required("please enter message")
      .test("message", "pleses enter valid message", (val) => {
        console.log(val);

        const arr = val.trim().split(" ");
        console.log(arr.length);

        if (arr.length <= 20) {
          return true;
        } else {
          return false;
        }
      }),
    number: string()
      .required("Enter your mobile number")
      .matches(/^[6789]\d{9}$/, "plesea enter valid mobile number"),
    country: string().required("please select option"),
    gender: string().required("please select your gender"),
    condition: boolean().required("please check term & condition").oneOf([true], 'You need to accept the terms and conditions'),
    hobbey: array().required("please select your hobby").min(2),


  });
  const formikcat = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
      number: "",
      country: "",
      gender: "",
      condition: false,
      file:"",
      hobbey:"",
    },
    validationSchema: contactyup,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { handleSubmit, handleBlur, handleChange, values, errors, touched } =
    formikcat;
  return (
    <div>
      {/* Single Page Header start */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Contact</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Pages</a>
          </li>
          <li className="breadcrumb-item active text-white">Contact</li>
        </ol>
      </div>
      {/* Single Page Header End */}
      {/* Contact Start */}
      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="p-5 bg-light rounded">
            <div className="row g-4">
              <div className="col-12">
                <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
                  <h1 className="text-primary">Get in touch</h1>
                  <p className="mb-4">
                    The contact form is currently inactive. Get a functional and
                    working contact form with Ajax &amp; PHP in a few minutes.
                    Just copy and paste the files, add a little code and you're
                    done.{" "}
                    <a href="https://htmlcodex.com/contact-form">
                      Download Now
                    </a>
                    .
                  </p>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="h-100 rounded">
                  <iframe
                    className="rounded w-100"
                    style={{ height: 400 }}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750346623!2d-73.97968099999999!3d40.6974881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1694259649153!5m2!1sen!2sbd"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
              <div className="col-lg-7">
                <form action className onSubmit={handleSubmit}>
                  {touched.name && errors.name ? (
                    <span className="errors">{errors.name}</span>
                  ) : (
                    ""
                  )}
                  <input
                    name="name"
                    type="text"
                    className="w-100 form-control border-0 py-3 mb-4"
                    placeholder="Your Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  {touched.email && errors.email ? (
                    <span className="errors">{errors.email}</span>
                  ) : (
                    ""
                  )}
                  <input
                    name="email"
                    type="email"
                    className="w-100 form-control border-0 py-3 mb-4"
                    placeholder="Enter Your Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {touched.country && errors.country ? (
                    <span className="errors">{errors.country}</span>
                  ) : (
                    ""
                  )}
                  <select
                    className="w-100 form-control border-0 py-3 mb-4"
                    id="country"
                    name="country"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.country}
                  >
                    <option value="">--Select country--</option>
                    <option value="1">India</option>
                    <option value="2">USA</option>
                    <option value="3">Japan</option>
                  </select>

                  {touched.gender && errors.gender ? (
                    <span className="errors">{errors.gender}</span>
                  ) : (
                    ""
                  )}
                  <br></br>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    Male
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    Female
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    Other
                  </label>
                  <br></br>
                  <br></br>
                  <label>
                  {touched.hobbey && errors.hobbey ? (
                    <span className="errors">{errors.hobbey}</span>
                  ) : (
                    ""
                  )}
                  <br></br>
                    <input
                      type="checkbox"
                      name="hobbey"
                      value={"Traveling"}
                      onChange={handleChange}
                      onBlur={handleBlur} 
                    />
                    Traveling
                    <input
                      type="checkbox"
                      name="hobbey"
                      value={"Driving"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    Driving
                    <input
                      type="checkbox"
                      name="hobbey"
                      value={"Play Games"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    Play Games
                  </label>
                  <br></br>
                  <br></br>



                  {touched.number && errors.number ? (
                    <span className="errors">{errors.number}</span>
                  ) : (
                    ""
                  )}
                  <input
                    name="number"
                    type="number"
                    className="w-100 form-control border-0 py-3 mb-4"
                    placeholder="Enter Your Mobile Number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.number}
                  />

                  {touched.message && errors.message ? (
                    <span className="errors">{errors.message}</span>
                  ) : (
                    ""
                  )}
                  <textarea
                    name="message"
                    className="w-100 form-control border-0 mb-4"
                    rows={5}
                    cols={10}
                    placeholder="Your Message"
                    defaultValue={""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                  />
                  <label>
                   <input 
                  type="file" 
                  name="file"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  />
                  
                  </label>
                  <br></br>
                  <br></br>

                  <label>
                  {touched.condition && errors.condition ? (
                    <span className="errors">{errors.condition}</span>
                  ) : (
                    ""
                  )}
                  <br></br>
                  <input 
                  type="checkbox" 
                  name="condition"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  />
                    Terms & conditions
                  </label>
                  <br></br>
                  <br></br>
                  <button
                    className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
              <div className="col-lg-5">
                <div className="d-flex p-4 rounded mb-4 bg-white">
                  <i className="fas fa-map-marker-alt fa-2x text-primary me-4" />
                  <div>
                    <h4>Address</h4>
                    <p className="mb-2">123 Street New York.USA</p>
                  </div>
                </div>
                <div className="d-flex p-4 rounded mb-4 bg-white">
                  <i className="fas fa-envelope fa-2x text-primary me-4" />
                  <div>
                    <h4>Mail Us</h4>
                    <p className="mb-2">info@example.com</p>
                  </div>
                </div>
                <div className="d-flex p-4 rounded bg-white">
                  <i className="fa fa-phone-alt fa-2x text-primary me-4" />
                  <div>
                    <h4>Telephone</h4>
                    <p className="mb-2">(+012) 3456 7890</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact End */}
    </div>
  );
}

export default Contact;
