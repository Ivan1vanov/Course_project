import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getBigestCollectionsAction } from '../../store/actions/collectionActions';
import Collection from '../Collections/collection/Collection';
import styles from './bigestCollections.module.scss'
import { Spinner } from 'react-bootstrap';

const BigestCollections = () => {
    const dispatch: any = useDispatch()


    const {bigestCollections, loading} = useSelector((state: any) => state.collections)


    useEffect(() => {
        dispatch(getBigestCollectionsAction())
    }, [])

    const {color} = useSelector((state: any) => state.settings)
    const isWhite: boolean = color === 'white'

  return (
    <div>
      

<div className={isWhite ? styles.bodyWhite : styles.bodyBlack}>
<h2 >Bigest collections TOP 5: </h2>
    <div className={isWhite ? styles.container : styles.containerBlack}>
    {bigestCollections?.map((collection: any, index: number) => (
            <Collection collection={collection} key={index}/>
            // <div>{index}</div>
        ))}

        {loading && (
             <Spinner animation="border" variant="primary" />
        )}
<div>
   
</div>
    </div>
    </div>
    </div>
  )
}

export default BigestCollections