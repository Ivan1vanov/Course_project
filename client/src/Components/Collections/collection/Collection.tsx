import React from 'react'
import { Button, Card, CardImg } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ICollection } from '../../../store/types/collectionTypes'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCollectionAction } from '../../../store/actions/collectionActions';
import { CollectionLG } from '../../../SettingTypes/Language/collection';

import whiteMode from './collection.module.scss'
import darkMode from './collectionDarkMode.module.scss'

import defaultImage from '../../../public/3d8c2f2c82c1c9ef1e27be645cd1aa17.jpg'
 
interface ICollectionsProps {
    collection: ICollection
}

const Collection: React.FC<ICollectionsProps> = ({collection}) => {
    const dispatch: any = useDispatch()

    const info = localStorage.getItem('profile')
    const user = info !== null ? JSON.parse(info).user : ''

    const {lg} = useSelector((state: any) => state.settings)
    const text = lg === 'en' ? CollectionLG.en : CollectionLG.pl

    const {color} = useSelector((state: any) => state.settings)
    const isWhite: boolean = color === 'white'

    const styles = isWhite ? whiteMode : darkMode
    
  return (
    <Card className={styles.card} style={{width: "18rem"}}>
  <div className={styles.container}>
  <Card.Img variant='top' src={ collection.image ?
    `http://res.cloudinary.com/dcbpsfp9i/image/upload/${collection.image}` 
    :
    defaultImage} 
  alt="Snow" style={{width:"100%", height: '200px'}}/>

  <div className={styles.textWrap}>
  <div className={styles.centered}>{collection.name}</div>
  </div>
</div>
  
  <Card.Body>
    <Card.Title>{collection.format}</Card.Title>
    <p className="card-text">{collection.description.length > 50 ? collection.description.substring(0, 50) + '...' : collection.description}.</p>
    <Card.Text>{text.ITEMS}: {collection?.items && collection?.items}</Card.Text>
    <div className='d-flex justify-content-between'>
    <Link to={`/collection/${collection._id}`} className="btn btn-primary">{text.VIEV}</Link>
    {user._id === collection.creator || user.isAdmin === true ? (
        <Button variant='danger' onClick={() => dispatch(deleteCollectionAction(collection._id))}>{text.DELETE}</Button>
    ) : null}
    </div>
  </Card.Body>
    </Card>
  )
}

export default Collection