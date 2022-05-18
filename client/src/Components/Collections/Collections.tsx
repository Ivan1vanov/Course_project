import React, { useEffect, useState } from 'react'
import Collection from './collection/Collection'
import styles from './collections.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getCollectionsAction, loadMoreAction } from '../../store/actions/collectionActions';
import { Button } from 'react-bootstrap';

const Collections = () => {

    const dispatch: any = useDispatch()
    const [currentPage, setCurrentPage] = useState(2)

    const {collections, loading, numberOfPages} = useSelector((state: any) => state.collections)

    const {color} = useSelector((state: any) => state.settings)
    const isWhite: boolean = color === 'white'

    useEffect(() => {
      dispatch(getCollectionsAction())
    }, [])


    const loadMoreHandler = () => {
        dispatch(loadMoreAction(currentPage))
        setCurrentPage(currentPage + 1)
    }

  return (
      <div className={isWhite ? styles.bodyWhite : styles.bodyBlack}>
    <h2>All collections</h2>     
    <div className={isWhite ? styles.container : styles.containerBlack}>
        {collections?.map((collection: any, index: number) => (
                <Collection key={index} collection={collection} />
        )
        )}

        {loading ? (
            <div>
                loading
            </div>
        ) : (
            <div>
                </div>
        )}

    </div>
    <div className={styles.moreButton}>
        <Button disabled={currentPage >= numberOfPages+1} onClick={() => loadMoreHandler()}>More</Button>
    </div>
    </div>
  )
}

export default Collections