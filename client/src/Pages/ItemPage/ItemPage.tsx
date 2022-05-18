import React, { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneItemAction, likeItemAction, likeItemPageAction } from '../../store/actions/itemActions';

import styles from './item.module.scss'
import {AiOutlineHeart, AiOutlineMessage} from "react-icons/ai";
import { Button, Container } from 'react-bootstrap';
import { IExtraField } from '../../store/types/itemsType';
import Comments from '../../Components/Comments/Comments';



const ItemPage = () => {

    

    const {id} = useParams()
    const dispatch: any = useDispatch()
    const navigate = useNavigate()

    const {item, loading} = useSelector((state: any) => state.items)

    const info = localStorage.getItem('profile')
    const user = info !== null ? JSON.parse(info).user : ''

    useEffect(() => {
        dispatch(getOneItemAction(id))
    }, [])

  

    const {color} = useSelector((state: any) => state.settings)
    const isWhite: boolean = color === 'white'
    

  return (
    <div className={isWhite ? styles.whiteMode : styles.darkMode}>
        {loading && (
            <div>
                LOADING...
            </div>
        )}

        <div className={styles.title}>
           <h2>{item?.name}</h2>
           <p className="card-text">{item?.tags?.split(' ').map((tag: string, index: number) => (
      <Link key={index} className={styles.tagItem} to={`/search/tags?tag=${tag}`}>
      #{tag}
      </Link>
            ))}</p>
        </div>

    <Container className={styles.fieldsContainer}>
        {item?.extraItemFields?.map((field: IExtraField, index: number) => (
            <div key={index} className={styles.extraField}>
                <strong>
                {field.extraItemName}
                </strong>
                : {field.extraItemData}
            </div>
        ))}
    </Container>
     
    <div className={styles.actionsPanel}>
          <div className={styles.actionIconBlock}>
          <Button className={item?.likes.find((id: string) => id === user._id) ? styles.likedIkon : styles.action} 
          disabled={!user ? true : false}
          onClick={() => dispatch(likeItemPageAction(item?._id, navigate))} variant={isWhite ? "light" : 'dark'}>

         <AiOutlineHeart 
         className={
             styles.iconAction
             }/> 
             {item?.likes?.length}
        </Button>

          </div>

          <div className={styles.actionIcon}>
            <AiOutlineMessage className={styles.iconAction}/> {item?.comments?.length}
          </div>
    </div>

    <div>
        {item && (
            <Comments comments={item?.comments} itemId={item?._id}/>
        )}
    </div>


    </div>
  )
}

export default ItemPage