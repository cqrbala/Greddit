import React, { useState } from "react";
import './App.css';
import Login from './components/Login /login';
import Register from './components/Register/register';
import Profile from './components/Profile/profile';
import Followers from './components/Profile/Followers/followers';
import Following from './components/Profile/Following/following';
import Logout from "./components/Logout/logout";
import MySubGreddits from "./components/mySubGreddits/mysubgreddits";
import CreateSubGreddit from "./components/mySubGreddits/createSubGreddit/createsubgreddit";
import MySubGredditPage from "./components/mySubGreddits/mySubGredditPage/mySubGredditPage";
import MySubGredditUsers from "./components/mySubGreddits/mySubGredditPage/mySubGredditUsers";
import MySubGredditRequests from "./components/mySubGreddits/mySubGredditPage/mySubGredditRequests";
import MySubGredditReports from "./components/mySubGreddits/mySubGredditPage/mySubGredditReports";
import MySubGredditStats from "./components/mySubGreddits/mySubGredditPage/mySubGredditStats";
import Navbar from "./components/Navbar/navbar";
import SubGredditNavbar from "./components/mySubGreddits/mySubGredditPage/subgredditNavbar";
import SubGredditspage from "./components/SubGreddits/subgreddits";
import SubGredditpage from "./components/SubGreddits/SubGredditPage/subgredditpage";
import SavedPosts from "./components/SavedPosts/savedposts";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // const login_status = localStorage.getItem('variable');
  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="App">{
          currentForm === "login" ? <Login onFormSwitch={toggleForm}></Login> : <Register onFormSwitch={toggleForm} ></Register>
        }</div>}>
        </Route>
        <Route path="/" element={<Navbar />}>
          <Route path="/profile" element={<div className="App"><Profile></Profile></div>} />
          <Route path="/followers" element={<div className="App"><Followers></Followers></div>} />
          <Route path="/following" element={<div className="App"><Following></Following></div>} />
          <Route path="/logout" element={<Logout></Logout>} />
          <Route path="/mySubGreddits" element={<MySubGreddits></MySubGreddits>} />
          <Route path="/createSubGreddit" element={<CreateSubGreddit></CreateSubGreddit>} />
          <Route path="/SubGreddits" element={<SubGredditspage />} />
          <Route path="/savedposts" element={<SavedPosts />} />
        </Route>

        <Route path="/mySubGreddits/:name" element={<SubGredditNavbar />}>
          <Route index element={<MySubGredditPage />} />
          <Route path="users" element={<MySubGredditUsers />} />
          <Route path="requests" element={<MySubGredditRequests />} />
          <Route path="reports" element={<MySubGredditReports />} />
          <Route path="stats" element={<MySubGredditStats />} />
        </Route>

        <Route path="/SubGreddits/:name" element={<Navbar />}>
          <Route index element={<SubGredditpage />} />
        </Route>


      </Routes >
    </BrowserRouter >
  );
}

export default App;
