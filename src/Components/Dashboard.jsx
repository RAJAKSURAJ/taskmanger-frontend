import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import Modal from "react-bootstrap/Modal";
import Navbar from "./Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import toast, { Toaster } from "react-hot-toast";
import BASE_URL from "../constant";
import axios from "axios";
import EditModal from "./modal/EditTask";
function Dahboard() {
  const [show, setShow] = useState(false);
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [data, setData] = useState("");
  const [showEditModal, setEditModal] = useState(false);
  const [EditData, setEditData] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = async () => {
    const response = await axios.get(`${BASE_URL}/api/task/all`);
    const responseData = response.data;

    setData(responseData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task || !date || !status) {
      toast.error("All field are mandatory");
    }
    const data = {
      task: task,
      date: date,
      status: status,
    };
    axios
      .post(BASE_URL + "/api/task/add", data)
      .then(() => {
        toast.success("Task added successfully");
        handleClose();
      })
      .catch((error) => {
        toast.error("Failed to add task");
      });
    setTask("");
    setDate("");
    setStatus("");
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Toaster />
      <EditModal />
      <Navbar />
      <div className="p-4">
        <div
          className="d-flex justify-content-end"
          style={{
            fontSize: "larger",
            marginRight: "65px",
          }}
          onClick={handleShow}
        >
          <IoMdAddCircle
            style={{
              fontSize: "larger",
              marginRight: "5px",
              marginTop: "3px",
            }}
          />{" "}
          <span>Add</span>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Task</th>
              <th>Completion Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.task}</td>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>{item.status}</td>
                  <td>
                    <MdEdit className="me-5" />
                    <MdDelete />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="taskInput">
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add your task"
                autoFocus
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="dateInput">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="statusSelect">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <EditModal data={EditData} show={EditModal} /> */}
    </>
  );
}

export default Dahboard;
