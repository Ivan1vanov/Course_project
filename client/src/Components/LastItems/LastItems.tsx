import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Item from '../Items/Item/Item';
import styles from './lastItems.module.scss'
import { Button, Spinner } from 'react-bootstrap';
import { getLastItemsLoadMoreAction, getLastItemsAction } from '../../store/actions/itemActions';

const LastItems = () => {
    const dispatch: any = useDispatch()
    const [page, setPage] = useState(2)
 

    const {color} = useSelector((state: any) => state.settings)
    const isWhite: boolean = color === 'white'

    const {items, loading, numberOfPages} = useSelector((state: any) => state.items)
    useEffect(() => {
        dispatch(getLastItemsAction())
    }, [])

    const loadMoreHandler = () => {
        dispatch(getLastItemsLoadMoreAction(page))
        setPage(page + 1)
    }



  return (
    <div className={isWhite ? styles.bodyWhite : styles.bodyBlack}>
    <h2>Last Items: </h2>     
    <div className={styles.container}>
        {items?.map((item: any, index: number) => (
                <Item key={index} item={item}/>
        )
        )}

        {loading && (
             <Spinner animation="border" variant="primary" />
        )}

    </div>
    <div className={styles.moreButton}>
        <Button disabled={page >= numberOfPages + 1} onClick={() => loadMoreHandler()}>More</Button>
    </div>
    </div>
  )
}

export default LastItems