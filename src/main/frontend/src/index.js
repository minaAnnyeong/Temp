import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js'; // Make sure this points to your routing setup

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);





//
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import axios from "axios";
//
// const REACT_APP_SERVER_HOST = "http://localhost:8080";
//
// const client = axios.create({
//     baseURL: REACT_APP_SERVER_HOST,
// });
//
// export const fetchAllMembers = () => client.get("/api/members");
// export const createMember = (data) =>
//     client.post("/api/members", data, {});
//
// export const fetchMember = (id) => client.get("/api/members/"+id);






//import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
//
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
//
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
