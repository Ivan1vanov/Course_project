import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCollectionsOfUserAction } from '../../store/actions/collectionActions';
import Collection from '../../Components/Collections/collection/Collection';
import styles from './userPage.module.scss'
import { getOneUserAction } from '../../store/actions/userAction';

const UserPage = () => {

    const {id} = useParams()
    const dispatch: any = useDispatch()

    const {collections, loading} = useSelector((state: any) => state.collections)
    const {currentUserName} = useSelector((state: any) => state.user)
    console.log(collections)
    useEffect(() => {
        console.log(id)
        dispatch(getCollectionsOfUserAction(id))
        dispatch(getOneUserAction(id))
    }, [])

    const {color} = useSelector((state: any) => state.settings)
    const isWhite: boolean = color === 'white'

  return (
      <div className={isWhite ? styles.whiteBody : styles.darkBody}>
          
              <div className={styles.userName}>
           <h2>{currentUserName}</h2>
                 </div>

          <h3>Your collections:</h3>

      
      
    <div className={styles.container}>
        
        {loading && (
            <div>
                LOADING...
            </div>
        )}
        {collections?.map((collection: any, index: number) => (
            <Collection collection={collection} key={index} />
        ))}
    </div>
    </div>
  )
}

export default UserPage