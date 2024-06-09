import { useEffect, useState } from "react";
import Card from "./components/Card";
import NavigationBar from "../../shared/NavigationBar";
import "../dashboard/Dashboard.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [descrip, setDescrip] = useState([]);
  const [feed, setFeed] = useState([]);
  const [query, setQuery] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3000/users");
    const data = await response.json();
    setUsers(data);
    console.log(data);
  };

  // const fetchDescrip = async () => {
  //   const response = await fetch("http://localhost:3000/descripcion");
  //   const data = await response.json();
  //   setDescrip(data);
  //   console.log(data);
  // };

  // const fetchFeed = async () => {
  //   const response = await fetch("http://localhost:3000/feedback");
  //   const data = await response.json();
  //   setFeed(data);
  //   console.log(data);
  // };

  useEffect(() => {
    fetchUsers();
    // fetchDescrip();
    // fetchFeed();
  }, []);
  return (
    <>
      {/* <h1>Usuarios</h1>
      {users.map((user) => (
        <ul key={user.id}>
          <li>
            <h2>Name: {user.name}</h2>
          </li>

          <li>ID: {user.id}</li>
          <li>Email: {user.email}</li>
        </ul>
      ))}
      <h1>Descripcion</h1>
      {descrip.map((descri) => (
        <ul key={descri.id}>
          <li>descripcion: {descri.descripcion}</li>
          <li>USER ID: {descri.user_id}</li>
        </ul>
      ))}
      <h1>Feedbacks</h1>
      {feed.map((feedback) => (
        <ul key={feedback.id}>
          <li>feedback: {feedback.feedback}</li>
          <li>USER ID: {feedback.user_id}</li>
        </ul>
      ))} */}
      <NavigationBar setQuery={setQuery}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px", // Adjust the gap between items
          }}
        >
          {users != [] ? (
            users
              .filter((user) => user.name.includes(query))
              .map((userd) => (
                <div
                  key={userd.id}
                  style={{
                    margin: "5px",
                    padding: "1%",
                    flex: "1 0 2%", // Adjust the percentage to control the number of columns
                    display: "flex",
                    justifyContent: "start",
                    boxSizing: "border-box",
                  }}
                >
                  <Card user={userd} />
                </div>
              ))
          ) : (
            <div
              style={{
                width: "100%",
                height: "500px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "50px",
              }}
            >
              No users yet
            </div>
          )}
        </div>
      </NavigationBar>
    </>
  );
};

export default Dashboard;

//users.filter((user)=> uyser.name includes(query)).map((user))
