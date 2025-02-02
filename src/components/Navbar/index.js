'use client'

import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions } from "@/utils";
import { Fragment, useContext, useEffect } from "react";
import CommonModel from "../CommonModel";
import Cookies from "js-cookie";
import { redirect, usePathname, useRouter } from "next/navigation";
import CartModal from "../CartModal";

const NavItems = ({ isModelView = false, isAdminView, router }) => {

  return (
    <div className={`items-center justify-between w-full md:flex md:w-auto ${isModelView ? '' : 'hidden'} `} id="nav-items">
      <ul className={`flex flex-col p-4 md:p-0 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${isModelView ? 'border-none' : 'border border-gray-100'}`}>
        {
          isAdminView ?
            adminNavOptions.map((item) =>
              <li
                key={item.id}
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:px-0"
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>) :
            navOptions.map((item) =>
              <li
                key={item.id}
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:px-0"
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>)
        }
      </ul>
    </div>
  )
}

const Navbar = () => {

  const { showNavModel, setShowNavModel } = useContext(GlobalContext);
  const { user,
    isAuthUser,
    setIsAuthUser,
    setUser,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal
  } = useContext(GlobalContext);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (pathName !== '/admin-view/add-product' && currentUpdatedProduct !== null) {
      setCurrentUpdatedProduct(null);
    }
  }, [pathName])

  const handleLogout = () => {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove('token');
    localStorage.clear();
    router.push('/')
  }

  const isAdminView = pathName.includes('admin-view');

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div onClick={() => router.push('/')} className="flex items-center cursor-pointer">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Ecommercery</span>
          </div>
          <div className="flex md:order-2 gap-2">
            {
              !isAdminView && isAuthUser ?
                <Fragment>
                  <button
                    onClick={() => router.push('/account')}
                    className='mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'
                  >Account</button>
                  <button
                    onClick={() => router.push('/cart')}
                    className='mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'
                  >Cart</button>
                </Fragment>
                : null
            }
            {
              user?.role === 'admin' ?
                isAdminView
                  ?
                  <button
                    onClick={() => router.push('/')}
                    className='mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'
                  >Client View</button>
                  :
                  <button
                    onClick={() => router.push('/admin-view')}
                    className='mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'
                  >Admin View</button>
                : null
            }
            {
              isAuthUser
                ?
                <button onClick={handleLogout} className='mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'>Logout</button>
                :
                <button onClick={() => router.push('/login')} className='mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'>Login</button>
            }
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setShowNavModel(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <NavItems isAdminView={isAdminView} router={router} />
        </div>
      </nav>
      <CommonModel
        show={showNavModel}
        setShow={setShowNavModel}
        showModelTitle={false}
        mainContent={<NavItems isModelView={true} isAdminView={isAdminView} router={router} />}
      />
      {
        showCartModal && <CartModal />
      }
    </>

  )
}

export default Navbar