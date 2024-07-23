import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import toast, { Toaster } from "react-hot-toast";
function EditTask({ data, show }) {
  const handleClose = () => {
    show(false);
  };
  return (
    <div>
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
                // value={task}
                // onChange={(e) => setTask(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="dateInput">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                // value={date}
                // onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="statusSelect">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                // value={status}
                // onChange={(e) => setStatus(e.target.value)}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            //   onClick={handleClose}
          >
            Close
          </Button>
          <Button
            variant="primary"
            //   onClick={handleSubmit}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditTask;
