import React, { useEffect } from 'react'
import { Button, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchItemsAction } from '../../store/actions/itemActions';
import Item from '../Items/Item/Item';

import styles from './itemsSearch.module.scss'

interface IItemsSearch {
    setPage: any,
    page: number
}

const ItemsSearch: React.FC<IItemsSearch> = ({setPage, page}) => {

    const {items, loading, numberOfPages} = useSelector((state: any) => state.items)

  return (
    <div className={styles.container}>
    {loading && (
        <div>
          <Spinner animation="border" variant="primary" />
        </div>
      )}
        {items?.map((item: any, index: number) => (
          <Item key={index} item={item}/>
        ))}
        {items?.length === 0 && (
          <div>
            Here is no any items...
          </div>
        )}
        <div className={styles.paginationContainer}>
            <div className={styles.paginationWrapper}>
            <Button onClick={() => setPage(page -1)} disabled={page <= 1}>
                Back
            </Button>
                <div>
                    1/{numberOfPages}
                </div>
            <Button onClick={() => setPage(page +1)} disabled={page >= numberOfPages}>
                Next
            </Button>
            </div>
        </div>
    </div>
  )
}

export default ItemsSearch