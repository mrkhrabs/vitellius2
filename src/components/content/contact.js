import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from "react-google-recaptcha";


export default function Contact() {

    const [showForm, showFormStatus] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const updateStatus = (t) => {
        showFormStatus(t)
    }

    return (
        <div className="container">
            <p className="">HOME - QOUTE REQUEST</p>

            <div className="row abt-accreditations">
                <div className="col-lg-12">
                    <h3>Contact Us</h3>
                </div>

                <div className="col-lg-5">
                    <br />
                    <h4>Contact Details</h4>
                    <h6>Office Address</h6>
                    <ul>
                        <li>BLK 2 Lot 9 Fifth St. Centro De Buenviaje Sto. Nino Marikina City</li>
                    </ul>
                    <h6>Telephone</h6>
                    <ul>
                        <li>(632) 505-9565</li>
                        <li>0917-5931179</li>
                    </ul>
                    <h6>Email Address Address</h6>
                    <ul>
                        <li>nielantonio@vitellius-logisticsinc.com</li>
                        <li>accounting@vitellius-logisticsinc.com</li>
                        <li>operation@vitellius-logisticsinc.com</li>
                    </ul>

                </div>
                <div className="col-lg-7">
                    <h4>Contact Details</h4>
                    {
                        showForm == true ?
                            <SignupForm updateStatuss={updateStatus} />
                            :
                            <div className="formSubmitted">
                                <div className="message-sent">
                                    <p>Message has been successfully sent!</p>
                                    <button className="btn btn-primary" onClick={() => updateStatus(true)}>Send another</button>
                                </div>
                            </div>
                    }
                </div>
            </div>



        </div>
    )
}


const SignupForm = ({ updateStatuss }) => {
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const [submitting, updateStatus] = useState(false);
    const [showChallenge, updateShowChallenge] = useState(false);
    const [formValues, updateFormValues] = useState([]);

    const onChange = (value) => {
        if (value) {

            updateStatus(true)

            var fd = new FormData();

            for (var i in formValues) {
                fd.append(i, formValues[i]);
            }

            fetch("/contact_us.php",
                {
                    method: "POST",
                    body: fd
                })
                .then(function (res) { return res.json(); })
                .then(function () { updateStatuss(false) })
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            requestQoute: true,
            address: '',
            contact: '',
            subject: '',
            message: '',
            company: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(5, 'Please enter valid name')
                .required('Required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            contact: Yup.string()
                .min(5, 'Please enter valid contact number')
                .required('Required'),
            subject: Yup.string()
                .min(5, 'Please enter valid subject')
                .required('Required'),
            message: Yup.string()
                .min(5, 'Please enter valid message')
                .required('Required'),

        }),
        onSubmit: (values) => {
            updateShowChallenge(true);

            values.recipient = values.requestQoute == 1 ? " nielantonio@vitellius-logisticsinc.com" : "operation@vitellius-logisticsinc.com, accounting@vitellius-logisticsinc.com";

            updateFormValues(values);

        },
    });



    return (

        <div>
            <form className="contact-form" onSubmit={formik.handleSubmit}>


                {
                    showChallenge == true ?
                        <div className="overlay">
                            {
                                submitting == true ?
                                    <div className="sending-message">
                                        Sending Message. . . .
                                </div>
                                    :
                                    <div className="recaptcha">
                                        <ReCAPTCHA
                                            class="g-recaptcha"
                                            sitekey="6LcX7rAZAAAAAEplFwAkmTGojuS624CJfXb3kQHy"
                                            onChange={onChange}
                                            size="normal"
                                        />
                                    </div>
                            }

                        </div>
                        : ""
                }

                <div className="control-group form-group">
                    <div className="controls">
                        <label>Full Name: </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            type="text" className="form-control" />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="formErr">{formik.errors.name}</div>
                        ) : null}
                    </div>

                </div>
                <div>
                    <label>Request Qoute: </label>
                    <div class="form-check form-check-inline">
                        <input
                            onChange={formik.handleChange}
                            class="form-check-input"
                            type="radio"
                            name="requestQoute"
                            id="inlineRadio1"
                            defaultChecked="true"
                            value="1" />
                        <label class="form-check-label" for="inlineRadio1"> Yes</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input
                            onChange={formik.handleChange}
                            class="form-check-input"
                            type="radio"
                            name="requestQoute"
                            id="inlineRadio2"
                            value="0" />
                        <label class="form-check-label" for="inlineRadio2"> No</label>
                    </div>
                </div>
                <div className="control-group form-group">
                    <div className="controls">
                        <label>Company Name:</label>
                        <input
                            onChange={formik.handleChange}
                            type="text"
                            className="form-control"
                            id="company"
                            name="company" />
                    </div>
                </div>
                <div className="control-group form-group">
                    <div className="controls">
                        <label>Address:</label>
                        <input
                            onChange={formik.handleChange}
                            name="address"
                            type="text"
                            className="form-control"
                            id="address"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="col-7">
                        <label>Email Address: * </label>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="formErr">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="col">
                        <label>Contact Number: * </label>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className="form-control"
                            id="contact"
                            name="contact"
                        />
                        {formik.touched.contact && formik.errors.contact ? (
                            <div className="formErr">{formik.errors.contact}</div>
                        ) : null}
                    </div>
                </div>
                <div className="control-group form-group">
                    <div className="controls">
                        <label>Subject: *</label>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className="form-control"
                            id="subject"
                        />
                        {formik.touched.subject && formik.errors.subject ? (
                            <div className="formErr">{formik.errors.subject}</div>
                        ) : null}
                    </div>
                </div>
                <div className="control-group form-group">
                    <div className="controls">
                        <label>Message:</label>
                        <textarea
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            rows="10"
                            cols="100"
                            className="form-control"
                            id="message"
                            maxlength="999"></textarea>
                        {formik.touched.message && formik.errors.message ? (
                            <div className="formErr">{formik.errors.message}</div>
                        ) : null}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" id="sendMessageButton">Send Message</button>

            </form >
        </div>
    );
};

