import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { UserENUM } from '../../store/types/userTypes';
import styles from './navbar.module.scss'
import { BsGearWide, BsGlobe, BsChevronCompactRight, BsOctagonHalf } from "react-icons/bs";
import Flags from 'country-flag-icons/react/3x2'

import {BsCircleFill, BsCircle} from 'react-icons/bs'
import { SettingsENUM } from '../../store/types/settingsType';
import { NavbarLG } from '../../SettingTypes/Language/navbar';
 
const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const info = localStorage.getItem('profile')
  const user = info !== null ? JSON.parse(info).user : ''

  const logoutHndler = (e: React.MouseEvent<HTMLElement>) => {
    dispatch({type: UserENUM.LOGOUT})
    navigate('/auth')
  }

  const [searchData, setSearchData] = useState('')

  const [showMenuList, setShowMenuList] = useState<boolean>(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState<boolean>(false)
  const [showColorMenu, setShowColorMenu] = useState<boolean>(false)
  // const [lg, setLg] = useState('en')

  const {lg, color} = useSelector((state: any) => state.settings)
// console.log(lg)
// console.log('color: ', color)
// console.log(color)
  const showLanguageMenuHandler = () => {
      setShowLanguageMenu(!showLanguageMenu)
      setShowColorMenu(false)
  }

  const showColorMenuHandler = () => {
    setShowColorMenu(!showColorMenu)
    setShowLanguageMenu(false)
}

    //-----------color/language settings------//

  const setLanguageHandler = (language: string) => {
    localStorage.setItem('currentLanguage', JSON.stringify(language))
    dispatch({type: SettingsENUM.CHANGE_LANGUAGE, payload: language})
    // setLg(JSON.parse(localStorage.getItem('currentLanguage') || '{}'))
    // console.log('lg: ', lg)
  }

  const setColotHandler = (color: string) => {
      localStorage.setItem('currentColor', JSON.stringify(color))
      dispatch({type: SettingsENUM.CHANCHE_COLOR, payload: color})
  }

  const isWhite: boolean = color === 'white'
  console.log('isWhite: ', isWhite)

  const getLanguage = localStorage.getItem('currentLanguage')
  const currentLanguage = getLanguage !== null ? JSON.parse(getLanguage) : 'en'

  const getSomeColor = localStorage.getItem('currentColor')
  const currentColor = getSomeColor !== null ? JSON.parse(getSomeColor) : 'white'
  
  useEffect(() => {
    console.log('lg: ', currentLanguage)
    dispatch({type: SettingsENUM.CHANGE_LANGUAGE, payload: currentLanguage})
    dispatch({type: SettingsENUM.CHANCHE_COLOR, payload: currentColor})
  }, []) 

  const text = lg === 'en' ? NavbarLG.en : NavbarLG.pl

  
  return (
    <nav className={isWhite ? "navbar navbar-expand-lg navbar-dark bg-primary" : "navbar navbar-expand-lg navbar-dark bg-dark"}>
    <a className="navbar-brand" href="#">Cource Project</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
          <Link className="nav-link" to='#'>Source code</Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link" to='/'>{text.HOME}</Link>
        </li>
       
        {user && (
          <>
        <li className="nav-item active">
        <Link className="nav-link" to='/create'>{text.CREATE_COLLECTION}</Link>
      </li>

      <li className="nav-item active">
        <Link className="nav-link" to={`/hello/${user._id}`}>{text.MY_PAGE}</Link>
      </li>
      </>
        )}

      {user.isAdmin === true && (
      <li className="nav-item active">
      <Link className="nav-link" to='/admin'>{text.ADMIN_PAGE}</Link>
      </li>        
      )}
     
      </ul>
      
      {user && (
        <div className="text-light mr-3">
        {text.HELLO}, <strong>{user?.name}</strong>
      </div>
      )}

      {/* ----- settings menu --------- */}
    <div className={styles.menuBlock}>
        <Button onClick={() => setShowMenuList(!showMenuList)} className={styles.buttonMenu} variant={isWhite ? 'primary' : 'dark'}>
          <BsGearWide/>
        </Button>
          {showMenuList && (
          <div className={styles.menuList}>
          <div>
            <Button onClick={() => showLanguageMenuHandler()} className={styles.actionButton} variant={isWhite ? 'light' : 'dark'} >
              <BsGlobe/> {text.LANGUAGE} <BsChevronCompactRight/>
              </Button>
              
              {showLanguageMenu && (
                 <div className={styles.languagesMenu}>

                 <div>
                 <Button onClick={() => setLanguageHandler('en')} className={styles.actionButton} variant={isWhite ? 'light' : 'dark'}>
                 <Flags.GB className={styles.someFlag}/> English 
               </Button>
                 </div>

                 <div>
                 <Button onClick={() => setLanguageHandler('pl')} className={styles.actionButton} variant={isWhite ? 'light' : 'dark'}>
                 <Flags.PL className={styles.someFlag}/> Polski 
               </Button>
                 </div>

             </div>
              )}
             
          </div>

          <div>
            <Button onClick={() => showColorMenuHandler()} className={styles.actionButton} variant={isWhite ? 'light' : 'dark'}>
              <BsOctagonHalf/> {text.COLOR} <BsChevronCompactRight/>
              </Button>

              {showColorMenu && (
                <div className={styles.colorMenu}>
                <div>
                <Button onClick={() => setColotHandler('white')} className={styles.actionButton} variant={isWhite ? 'light' : 'dark'}>
               <BsCircle/> {text.WHITE} 
              </Button>
                </div>

                <div>
                <Button onClick={() => setColotHandler('black')} className={styles.actionButton} variant={isWhite ? 'light' : 'dark'}>
                <BsCircleFill/> {text.BLACK}
              </Button>
                </div>
              </div>
              )}
          </div>
          </div>

          )}
       
       </div>
      <form className="form-inline my-2 my-lg-0 mr-3">
        <input className="form-control mr-sm-2" onChange={e => setSearchData(e.target.value)} 
        type="search" placeholder={text.SEARCH} aria-label="Search"
        />
        <Button className="btn btn-outline-light my-2 my-sm-0" 
        onClick={(e) => navigate(`/search?search=${searchData}`)}>
          {text.SEARCH}
          </Button>
      </form>
      {user ? (
        <Button onClick={logoutHndler} type="submit" >{text.LOGOUT}</Button>
      ): (
        <Button onClick={() => navigate('/auth')} type="submit">Login</Button>
      )}
    </div>
  </nav>
  )
}

export default Navbar