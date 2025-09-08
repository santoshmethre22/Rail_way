import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Container } from "../index.js"
import { useSelector } from "react-redux";
import { LogOutBtn } from "../index.js"
import { useDispatch } from "react-redux";
import authService from '../../server/auth';
import { logout } from "../../store/authSlice.js";

function Header({ user}) {
  const authStatus = useSelector((state) => state.auth.status);
  const userData=useSelector((state)=>state.auth.userData);
  const role=userData?.role=="admin"?true:false;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    authService.logout();
    dispatch(logout)
    setDropdownOpen(false);
    navigate("/login")
  }

  useEffect(() => {

    if (authStatus == false) navigate("/login")
  }, [])


  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active:authStatus==false,
    },
    {
      name: "Signup",
      slug: "/signup",
      active:authStatus==false,
    },
   
  {
      name:"Contact",
      slug:"/Contact"
      ,active:true
    },
    {
      name:"AddTrain",
      slug:"/add-train",
      active:role
    }
  ]




  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          {/* <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'   />

              </Link>
          </div> */}
          <ul className='flex ml-auto'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >{item.name}</button>
                </li>
              ) : null
            )}


            {authStatus==true && (
              <li>
                <LogOutBtn />
              </li>
            )}


            {
              (authStatus == true) && (<div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center focus:outline-none"
                >
                  <img
                    src={user?.image || "https://i.pravatar.cc/40"}
                    alt="profile"
                    className="w-9 h-9 rounded-full border-2 border-indigo-400"
                  />
                  <svg
                    className="w-4 h-4 ml-1 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-slate-800 rounded shadow-lg">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleClick}
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>)}
          </ul>
        </nav>
      </Container>
    </header>


  );
}

export default Header;
