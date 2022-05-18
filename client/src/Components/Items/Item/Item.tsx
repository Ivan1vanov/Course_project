import React, {useEffect, useState} from 'react'
import { IItem } from '../../../store/types/itemsType'
import {AiOutlineHeart, AiOutlineMessage, AiFillDelete} from "react-icons/ai";
import { Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { likeItemAction, deleteItemAction } from '../../../store/actions/itemActions';
import {BsThreeDotsVertical, BsFillPencilFill} from 'react-icons/bs'
import { itemLG } from '../../../SettingTypes/Language/item';

import whiteMode from './item.module.scss'
import darkMode from './itemDark.module.scss'
import { getNameOfCollectionAPI } from '../../../api/api';


interface IItemProps {
  item: IItem,
  creatorId?: string,
  setCurrentItemId?: any
}

const Item: React.FC<IItemProps> = ({item, creatorId, setCurrentItemId}) => {
  const navigate = useNavigate()
  const dispatch: any = useDispatch()

  const [collectionName, setCollectionName] = useState('')

  const info = localStorage.getItem('profile')
  const user = info !== null ? JSON.parse(info).user : ''

  const [isActionList, setIsActionList] = useState<boolean>(false)

  const {lg} = useSelector((state: any) => state.settings)
  const text = lg === 'en' ? itemLG.en : itemLG.pl

  const {color} = useSelector((state: any) => state.settings)
    const isWhite: boolean = color === 'white'

  const styles = isWhite ? whiteMode : darkMode

  useEffect(() => {
    const getName = async () => {
        const {data} = await getNameOfCollectionAPI(item?.collectionId)
        setCollectionName(data.name)
    }
    getName()
  }, [])

  return (
    <Card className={styles.card} style={{width: "18rem"}}>
  <div className="card-body">
    <div className={styles.itemTop}>
    <div className={styles.cardTitle}>
    <div>
    <h5 className="card-title">{item.name} </h5>
    </div>
    {user._id === creatorId || user.isAdmin === true ? (
      <div>
      <Button onClick={() => setIsActionList(!isActionList)} variant={isWhite ? 'light' : 'dark'}>
      <BsThreeDotsVertical/>
      </Button>
      <div className={isActionList ? styles.actionList : styles.actionListHiden}>
        
        <div>
        <Button 
        className={styles.action} variant={isWhite ? 'light' : 'dark'}
        onClick={() => setCurrentItemId(item._id)}
        >
        <BsFillPencilFill/> {text.UPDATE}
      </Button>
        </div>

        <div>
        <Button onClick={() => dispatch(deleteItemAction(item._id))} 
        className={styles.action} variant={isWhite ? 'light' : 'dark'}>
        <AiFillDelete/> {text.DELETE}
      </Button>

        </div>
      </div>
    </div>
    ): null}
    </div>

    <div>
    <strong>Collection: </strong>
    <Link to={`/collection/${item?.collectionId}`}>
    {collectionName}
    </Link>
    </div>

    </div>

  
    <div>
      {item.extraItemFields?.map((item: any, index: number) => (
        <div key={index}>
          <strong>{item.extraItemName}:  </strong>{item.extraItemData}
        </div>
      ))}
    </div>

    <p className="card-text">{item.tags.split(' ').map((tag: string, index: number) => (
      <span key={index} className="mr-1">
        <Link to={`/search/tags?tag=${tag}`}>
        #{tag}
        </Link>   
            </span>
    ))}</p>

  
    <div className={styles.actionContainer}>

      <div>
      <Button onClick={() => dispatch(likeItemAction(item._id, navigate))} 
      className={ item?.likes.find((id: string) => id === user._id) ? styles.likedIkon : styles.actionBottom} 
      variant={isWhite ? 'light' : 'dark'}
      disabled={!user ? true : false}>
      <AiOutlineHeart className={styles.iconAction}/> {item.likes.length}
      </Button>
      </div>

      <Button onClick={() => navigate(`/item/${item._id}`)} 
      className={styles.actionBottom} 
      variant={isWhite ? 'light' : 'dark'}
      >
        <AiOutlineMessage className={styles.iconAction}/> {item.comments.length}
      </Button>

      {/* {user._id === creatorId && (
        <Button onClick={() => dispatch(deleteItemAction(item._id))} 
        className={styles.action} variant="danger">
  
        <AiFillDelete/> 
      </Button>
      )} */}

    </div>
  </div>
</Card>
  )
}

export default Item