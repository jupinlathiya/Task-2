import React, { useEffect, useState } from "react";
import "./userForm.css";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createUser,
  fetchUserDetails,
  updateUser,
} from "../../actions/userActions";
import { toast } from "react-toastify";
import moment from "moment";

const UserForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = new URLSearchParams(location.search).get("userId");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

  const { userDetails } = useSelector((state) => state.getUser);
  const { loading, error } = useSelector((state) => state.createUser);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    dateOfBirth: "",
    occupation: "",
    mobileNo: "",
  });

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserDetails(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userDetails) {
        setFormData({
            ...userDetails,
            dateOfBirth: moment(userDetails.dateOfBirth).format("YYYY-MM-DD"),
          });
    }
  }, [userDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = "First name is required";
    if (!formData.lastname) newErrors.lastname = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.age) newErrors.age = "Age is required";
    else if (isNaN(formData.age) || formData.age < 0)
      newErrors.age = "Age must be a positive number";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of Birth is required";
    if (!formData.mobileNo) newErrors.mobileNo = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobileNo))
      newErrors.mobileNo = "Mobile number must be 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGoBack = () => {
    navigate("/home");
    setFormData({
        firstname: "",
        lastname: "",
        email: "",
        age: "",
        dateOfBirth: "",
        occupation: "",
        mobileNo: "",
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      if (userId) {
        console.log("formData",formData)
        dispatch(updateUser(userId, formData));
        toast.success("User updated successfully!", {
          position: "bottom-right",
        });
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          age: "",
          dateOfBirth: "",
          occupation: "",
          mobileNo: "",
        });
        navigate("/home");
      } else {
        dispatch(createUser(formData));
        toast.success("User registered successfully!", {
          position: "bottom-right",
        });
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          age: "",
          dateOfBirth: "",
          occupation: "",
          mobileNo: "",
        });
        navigate("/home");
      }
    } catch (error) {
      toast.error(error, {
        position: "top-left",
      });
    }
  };

  return (
    <Container>
      <h1 className="my-4">{userId ? "Update User" : "Create User"}</h1>
      {success && <Alert variant="success">{success}</Alert>}
      {errors.api && <Alert variant="danger">{errors.api}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            isInvalid={!!errors.firstname}
            className="custom-placeholder-left"
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstname}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formLastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            isInvalid={!!errors.lastname}
            className="custom-placeholder-left"
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            className="custom-placeholder-left"
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            isInvalid={!!errors.age}
            className="custom-placeholder-left"
          />
          <Form.Control.Feedback type="invalid">
            {errors.age}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formDateOfBirth">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            isInvalid={!!errors.dateOfBirth}
            className="custom-placeholder-left"
          />
          <Form.Control.Feedback type="invalid">
            {errors.dateOfBirth}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formOccupation">
          <Form.Label>Occupation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="custom-placeholder-left"
          />
        </Form.Group>

        <Form.Group controlId="formMobileNo">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter mobile number"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            isInvalid={!!errors.mobileNo}
            className="custom-placeholder-left"
          />
          <Form.Control.Feedback type="invalid">
            {errors.mobileNo}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-2">
          {userId ? "Update" : "Create"}
        </Button>

        <Button className="mt-2 ml-2" onClick={handleGoBack}>
          Back
        </Button>
      </Form>
    </Container>
  );
};

export default UserForm;
