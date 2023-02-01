import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";

import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Stack from "@mui/material/Stack";
import WebCookies from "../../components/common/Cookies/cookies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductAddModal = (props) => {
  const { open, toggle, getProductData } = props;

  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(dayjs(new Date()));
  const [currentUser, setCurrentUser] = useState("");

  let [state, setState] = useState({
    product: {
      producerId: currentUser && currentUser._id,
      name: "",
      basePrice: "",
      bidStartDate: "",
      bidEndDate: "",
      imageUrl: "",
    },
  });

  useEffect(() => {
    getUserInCookie();
  }, []);

  const getUserInCookie = () => {
    let cookie = WebCookies.GetCookie("userin");
    setCurrentUser(JSON.parse(cookie));
  };

  // Handle user fields value
  let updateChange = (event) => {
    setState((state) => ({
      product: {
        ...state.product,
        producerId: currentUser && currentUser._id,
        [event.target.name]: event.target.value,
      },
    }));
  };

  const checkValidation = (data, callBack) => {
    let currentDate = Date.parse(new Date());
    let startDate = Date.parse(data && data.product.bidStartDate);
    let endDate = Date.parse(data && data.product.bidEndDate);

    if ( endDate === (startDate || currentDate)) {
      toast("End date must greater than start date");
      callBack(false);
    } else {
      callBack(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let values = state;
    values.product.bidStartDate = startDate ? startDate.$d : startDate;
    values.product.bidEndDate = endDate ? endDate.$d : endDate;
    checkValidation(values, (valid) => {
      if (valid) {
        getProductData(values);
      }
    });
  };

  return (
    <Fragment>
      <ToastContainer />
      <Modal
        show={open}
        onHide={toggle}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Product
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="show-grid">
            <Container>
              <Row>
                <Col xs={12} md={6}>
                  <FormGroup controlId="name" className="mb-3">
                    <FormLabel>Product Name *</FormLabel>
                    <FormControl
                      name="name"
                      type="text"
                      placeholder="Product"
                      required
                      onChange={updateChange}
                    />
                  </FormGroup>
                </Col>
                <Col xs={12} md={6}>
                  <FormGroup controlId="basePrice" className="mb-3">
                    <FormLabel>Basic Price*</FormLabel>
                    <FormControl
                      name="basePrice"
                      type="number"
                      placeholder="Price"
                      required
                      onChange={updateChange}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={6}>
                  <FormGroup controlId="bidStartDate" className="mb-3">
                    <FormLabel>Start Date *</FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={2}>
                        <DateTimePicker
                          name="bidStartDate"
                          renderInput={(params) => <TextField {...params} />}
                          value={startDate}
                          onChange={(newValue) => {
                            setStartDate(newValue);
                          }}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </FormGroup>
                </Col>
                <Col xs={12} md={6}>
                  <FormGroup controlId="bidEndDate" className="mb-3">
                    <FormLabel>End Date *</FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={2}>
                        <DateTimePicker
                          renderInput={(params) => <TextField {...params} />}
                          value={endDate}
                          onChange={(newValue) => {
                            setEndDate(newValue);
                          }}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12}>
                  <Form.Label htmlFor="basic-url">Image URL</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">
                      https://
                    </InputGroup.Text>
                    <Form.Control
                      name="imageUrl"
                      id="basic-url"
                      aria-describedby="basic-addon3"
                      onChange={updateChange}
                    />
                  </InputGroup>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Row>
              <Col xs={4} md={4}>
                <Button onClick={toggle}>Close</Button>
              </Col>
              <Col xs={8} md={8}>
                <Button type="submit" variant="success">
                  Add Product
                </Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default ProductAddModal;
