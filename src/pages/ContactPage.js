import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './ContactPage.css';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters long'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    message: Yup.string()
      .required('Message is required')
      .min(10, 'Message must be at least 10 characters long'),
  });

  return (
    <div className="contact-page">
      <h1>Contact</h1>
      <p>Get in touch with us by filling out the form below.</p>
      <Formik
        initialValues={{ name: '', email: '', message: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log('Form data:', values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="email">Email Address</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <Field as="textarea" name="message" rows="4" />
              <ErrorMessage name="message" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Send
            </button>
            <Link to="/" className="back-button">
              Back
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactPage;
