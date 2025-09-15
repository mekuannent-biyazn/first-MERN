import React, { useEffect, useState } from "react";
import MainScreen from "../../component/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, updateNoteAction } from "../../action/noteActions";
import ErrorMessage from "../../component/ErrorMessage";
import Loading from "../../component/Loading";
import ReactMarkdown from "react-markdown";
import { data, useNavigate, useParams } from "react-router-dom";

const SingleNote = ({ match, history }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [data, setDate] = useState("");

  const { id } = useParams();

  const dispatch = useDispatch();
  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelelte } = noteDelete;
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      dispatch(deleteNoteAction(id));
    }
    navigate("/mynotes");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAT);
    };
    fetching();
  }, [id, data]);

  const navigate = useNavigate();

  const resetHandler = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    navigate("/mynotes");
  };

  return (
    <MainScreen title={"Edit Note"}>
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelelte && (
              <ErrorMessage variant="danger">{error}</ErrorMessage>
            )}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title."
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content."
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}
            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the category."
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Update Note
            </Button>
            <Button
              className="mx-2"
              onClick={() => deleteHandler(id)}
              variant="danger"
            >
              Delete Note
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Updated On: {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default SingleNote;
