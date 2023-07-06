import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { Fragment, useContext } from 'react'
import Link from 'next/link'
import AuthContext from '@/context/AuthContext'
import styles from '../styles/Header.module.css'
import Search from './Search'

const Header = () => {
  const { user, logout } = useContext(AuthContext)

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>DJ Events</a>
        </Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href='/events'>
              <a>Events</a>
            </Link>
          </li>
          {user ? (
            // If logged in
            <Fragment>
              <li>
                <Link href='/events/add'>
                  <a>Add Event</a>
                </Link>
              </li>
              <li>
                <Link href='/account/dashboard'>
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <button 
                  className='btn-secondary btn-icon' 
                  onClick={logout}
                >
                  <FaSignOutAlt />
                </button>
              </li>
            </Fragment>
          ) : (
            // If logged out
            <Fragment>
              <li>
                <Link href='/account/login'>
                  <a className='btn-secondary btn-icon'>
                    <FaSignInAlt /> Login
                  </a>
                </Link>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header