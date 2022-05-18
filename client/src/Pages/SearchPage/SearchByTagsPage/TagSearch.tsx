import React, { useEffect, useState } from 'react'
import { useQuery } from '../../../Hooks/useQuery'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchItemByTagsAction } from '../../../store/actions/itemActions';
import ItemsSearch from '../../../Components/ItemsSearch/ItemsSearch';

import styles from './searcgTags.module.scss'

const TagSearch = () => {
    const query = useQuery() 
    const dispatch: any = useDispatch()
    const navigate = useNavigate()
    const [page, setPage] = useState(1)


    const tag = query.get('tag')
    console.log(tag)

    useEffect(() => {
        if(tag) {
            dispatch(searchItemByTagsAction(tag, page))
        } else {
            navigate('/')
        }
    }, [tag, page])

    const {color} = useSelector((state: any) => state.settings)
    const isWhite: boolean = color === 'white'
  return (
    <div className={isWhite ? styles.whiteMode : styles.darkMode}>
        <ItemsSearch page={page} setPage={setPage}/>
    </div>
  )
}

export default TagSearch