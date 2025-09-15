import React, { useEffect } from "react";
import MainScreen from "../../component/MainScreen";
import "./MyNotes.css";
import { Link, useNavigate } from "react-router-dom";
import { Accordion, Badge, Button, Nav, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../action/noteActions";
import Loading from "../../component/Loading";
import ErrorMessage from "../../component/ErrorMessage";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const noteList = useSelector((state) => state.noteList);
  const {
    loading,
    error,
    notes = [],
  } = useSelector((state) => state.noteList) || {};

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelelte,
    success: successDelete,
  } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  console.log(notes);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    successCreate,
    navigate,
    userInfo,
    successUpdate,
    successDelete,
  ]);

  return (
    <MainScreen title={`Welcome back to ${userInfo?.name} ...`}>
      <Nav.Link as={Link} to="/createnote">
        <Button style={{ marginTop: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Nav.Link>
      {errorDelelte && (
        <ErrorMessage variant="danger">{errorDelelte}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {notes
        ?.slice()
        .reverse()
        .filter((filteredNote) =>
          filteredNote.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((note, index) => (
          <Accordion key={note._id}>
            <Card style={{ margin: 10 }}>
              <Card.Header style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    alignSelf: "center",
                    fontSize: 18,
                    cursor: "pointer",
                  }}
                >
                  <Accordion.Button
                    as={Card.Text}
                    variant="Link"
                    eventKey="0"
                    className="text-decoration-none"
                    key={note._id}
                  >
                    {note.title}
                  </Accordion.Button>
                </span>
                <div className="mx-1">
                  <Link to={`/note/${note._id}`}>
                    <Button variant="primary">Edit</Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="mx-1"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>

              <Accordion.Body eventKey={String(index)}>
                <Card.Body>
                  <h4>
                    <Badge bg="success">{note.category}</Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>
                  </blockquote>
                  <footer className="blockquote-footer">
                    Created on ..Date{" "}
                    <cite title="Source Title">
                      {note.createdAt.substring(0, 10)}
                    </cite>
                  </footer>
                </Card.Body>
              </Accordion.Body>
            </Card>
          </Accordion>
        ))}
    </MainScreen>
  );
};

export default MyNotes;
