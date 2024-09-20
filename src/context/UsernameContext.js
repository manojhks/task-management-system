// import { createContext, useState } from "react";
// const userName=createContext()
// export const UsernameProvider = ({ children }) => {
//     const [username, setUsername] = useState("");
  
//     return (
//       <userName.Provider value={{ username, setUsername }}>
//         {children}
//       </userName.Provider>
//     );
//   };
// export default userName




import React, { createContext, useState, useEffect } from 'react';

const UserNameContext = createContext();

export const UserNameProvider = ({ children }) => {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || null;
  });

  const login = (name) => {
    setUsername(name);
    localStorage.setItem('username', name); // Store in local storage
  };

  const logout = () => {
    setUsername(null);
    localStorage.removeItem('username'); // Remove from local storage
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <UserNameContext.Provider value={{ username, login, logout }}>
      {children}
    </UserNameContext.Provider>
  );
};

export default UserNameContext;
