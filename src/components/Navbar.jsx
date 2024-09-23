// import React, { useContext } from 'react';
// import userName from '../context/UsernameContext';

// export const Navbar = () => {
//   const { username } = useContext(userName);
//   return (
//     <div className=' position-fixed z-2 top-0'>
//       <nav className="navbar navbar-expand-sm navbar-dark fixed-top">
//         <div className="container">
//           <a className="navbar-brand" href="/user">
//             Task <span className="navbar-brand-sub">Manager</span>
//           </a>
//           <div>
//           {username ? (
//             <p className='pfp avatar' title={username}>
//               {username[0].toUpperCase()}
//             </p>
//           ) : (
//             <p className='pfp m-0 shadow-none text-light' title={username} style={{fontSize:"42px"}}><i className ="bi bi-person-circle"></i></p>
//           )}
//         {/* <ul className='pfp-drop'>
//           <li>{username}</li>
//           <li>Logout</li>
//         </ul> */}
//         </div>
//         </div>
//       </nav>
//     </div>
//   );
// };



import React, { useContext } from 'react';
import UserNameContext from '../context/UsernameContext';
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const nav = useNavigate()
  const { username, logout } = useContext(UserNameContext);

  const handleLogout = () => {
    logout();
    nav('/login')
  };

  return (
    <motion.div 
     initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 0.05 } }}
      className='position-fixed z-2 top-0'>
      <nav className="navbar navbar-expand-sm navbar-dark fixed-top">
        <div className="container">
        <div className='d-flex justify-content-around align-items-baseline'>
          <a className="navbar-brand" href="/user">
            Task <span className="navbar-brand-sub">Manager</span>
          </a>
          <div>
            {username ? (
              <>
                <p className=' ms-auto pfp avatar' title={username}>
                  @{username}
                </p>
              </>
            ) : (
              <p className='pfp m-0 shadow-none text-light' title={username} style={{ fontSize: "42px" }}>
                <i className="bi bi-person-circle"></i>
              </p>
            )}
          </div>
          </div>
                <button onClick={handleLogout} className="btn logout text-light">Logout</button>
        </div>
      </nav>
    </motion.div>
  );
};
