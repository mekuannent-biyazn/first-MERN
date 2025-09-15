import "./App.css";
import "./bootstrap.main.css";

import Footer from "./component/Footer/Footer";
import Header from "./component/Header/Header";
import LandingPage from "./screens/landing/landingPage";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";
import RegisterScreen from "./RegisterScreen/RegisterScreen";
import LoginScreen from "./LoginScreen/LoginScreen";
import CreateNote from "./screens/createNote/CreateNote";
import SingleNote from "./screens/singleNote/SingleNote";
import { useState } from "react";
import ProfileScreen from "./screens/profileScreen/ProfileScreen";

const App = () => {
  const [search, setSearch] = useState("");
  console.log(search);

  return (
    <>
      <BrowserRouter>
        <Header setSearch={setSearch} />
        <main style={{ minHeight: "93vh" }}>
          <Routes>
            <Route path="/" Component={LandingPage} exaxt />
            <Route path="/register" Component={RegisterScreen} exaxt />
            <Route path="/login" Component={LoginScreen} exaxt />
            <Route path="/profile" Component={ProfileScreen} exaxt />
            <Route path="/createnote" Component={CreateNote} exaxt />
            <Route path="/note/:id" Component={SingleNote} exaxt />
            <Route
              path="/mynotes"
              Component={() => <MyNotes search={search} />}
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
