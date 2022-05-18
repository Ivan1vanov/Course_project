import React, { useEffect, useState } from 'react'
import { useQuery } from '../../Hooks/useQuery';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ItemsSearch from '../../Components/ItemsSearch/ItemsSearch';

import styles from './searchPage.module.scss'
import { searchItemsAction } from '../../store/actions/itemActions';



const SearchPage = () => {
    const query = useQuery() 
    const search = query.get('search')
    const [page, setPage] = useState(1)

    const dispatch: any = useDispatch()
    const navigate = useNavigate()

    const {color} = useSelector((state: any) => state.settings)
    const isWhite: boolean = color === 'white'

    useEffect(() => {
        if(search) {
            dispatch(searchItemsAction(search, page))
        } else {
            navigate('/')
        }
    }, [search, page])

  return (
    <div className={isWhite? styles.whiteMode : styles.darkMode}>
        {search && (
            <ItemsSearch page={page} setPage={setPage}/>
        )}
    </div>
  )
}

export default SearchPage