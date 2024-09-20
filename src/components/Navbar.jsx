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

export const Navbar = () => {
  const { username, logout } = useContext(UserNameContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.div 
     initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      exit={{ opacity: 0, y: window.innerHeight, transition: { duration: 0.05 } }}
    className='position-fixed z-2 top-0'>
      <nav className="navbar navbar-expand-sm navbar-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/user">
            Task <span className="navbar-brand-sub">Manager</span>
          </a>
          <div>
            {username ? (
              <>
                <p className='pfp avatar' title={username}>
                  {username[0].toUpperCase()}
                </p>
                <button onClick={handleLogout} className="btn btn-link text-light">Logout</button>
              </>
            ) : (
              <p className='pfp m-0 shadow-none text-light' title={username} style={{ fontSize: "42px" }}>
                <i className="bi bi-person-circle"></i>
              </p>
            )}
          </div>
        </div>
      </nav>
    </motion.div>
  );
};
