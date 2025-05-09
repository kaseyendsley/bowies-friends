// import { Route, Outlet, Routes } from "react-router-dom";
// // import { NavBar } from "../components/nav/EmployeeNav.jsx";
// import { Welcome } from "../components/Welcome/welcome.jsx";
// import { EmployeeDetails } from "../components/employees/EmployeeDetails.jsx";
// import { EmployeeList } from "../components/employees/EmployeeList.jsx";
// import { CustomerList } from "../components/customers/CustomerList.jsx";
// import { CustomerDetails } from "../components/customers/CustomerDetails.jsx";
// import { TicketList } from "../components/tickets/TicketList.jsx";
// import { EmployeeForm } from "../components/forms/EmployeeForm.jsx";
// import { useEffect, useState } from "react";
// import { EmployeeViews } from "./EmployeeViews.jsx";
// import { CustomerViews } from "./CustomerViews.jsx";

// export const ApplicationViews = () => {
//   const [currentUser, setCurrentUser] = useState({});

//   useEffect(() => {
//     const localHoneyUser = localStorage.getItem("honey_user");
//     const honeyUserObject = JSON.parse(localHoneyUser);

//     setCurrentUser(honeyUserObject);
//     console.log(honeyUserObject);
//   }, []);

//   return currentUser.isStaff ? (
//   <EmployeeViews currentUser={currentUser}/> 
// ) : (
//   <CustomerViews currentUser={currentUser}/>
// )
// };
