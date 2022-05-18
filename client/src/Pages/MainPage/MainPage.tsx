import React, { useEffect } from 'react'
import BigestCollections from '../../Components/BigestCollections/BigestCollections'
import Collections from '../../Components/Collections/Collections'
import { useSelector } from 'react-redux';
import styles from './mainPage.module.scss'
import LastItems from '../../Components/LastItems/LastItems';

const MainPage = () => {

  return (
    <div>
      <div>
        <BigestCollections/>
      </div>
      <div>
        <LastItems/>
      </div>
      <div>
      <Collections/>
      </div>
      
    </div>
  )
}

export default MainPage