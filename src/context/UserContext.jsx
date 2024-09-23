// import React, { createContext, useState, useEffect } from 'react';

// // Create UserContext
// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [userDetails, setUserDetails] = useState(null);

//   // Fetch user details or use a placeholder for now
//   useEffect(() => {
//     // Fetch user details from API or local storage
//     const fetchUserDetails = async () => {
//       // Example of fetching user details, adjust as needed
//       const response = await fetch('/api/user'); // Modify with your API endpoint
//       const data = await response.json();
//       setUserDetails(data);
//     };

//     fetchUserDetails();
//   }, []);

//   return (
//     <UserContext.Provider value={{ userDetails, setUserDetails }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
