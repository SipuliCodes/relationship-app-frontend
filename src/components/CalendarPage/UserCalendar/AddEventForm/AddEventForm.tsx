import { ChangeEvent, FormEvent, useState } from "react";
import { Alert, Form, Button } from "react-bootstrap";
import { Event } from "react-big-calendar";

interface AddEventProps {
  handleElementChange: () => void;
  addEvent: (event: Event) => void;
  id: number;
}

const AddEventForm: React.FC<AddEventProps> = ({
  handleElementChange,
  addEvent,
  id,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { startDate, endDate } = formData;

    if (new Date(endDate).getTime() <= new Date(startDate).getTime()) {
      setError("End date must be later than start date.");
      return;
    }

    setError(null);
    const newEvent: Event = {
      title: formData.title,
      start: new Date(formData.startDate),
      end: new Date(formData.endDate),
      resource: {
        id: id,
      },
    };
    addEvent(newEvent);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter event title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formStartDate">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="datetime-local"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEndDate">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="datetime-local"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <div className="d-flex flex-row justify-content-between">
        <Button onClick={handleElementChange} variant="danger" type="button">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default AddEventForm;
