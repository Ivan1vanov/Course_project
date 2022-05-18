import React, { useEffect, useState } from 'react'
import styles from './comment.module.scss'
import { IComment } from '../../../store/types/itemsType';
import moment from 'moment'
import { getOneUserAPI } from '../../../api/api';

interface ICommentProps {
    comment: IComment | any,
    isNewCommemt?: boolean
}

const Comment: React.FC<ICommentProps> = ({comment, isNewCommemt}) => {

    const [creatorName, setCreatorName] = useState('')

    useEffect(() => {
       const getUserName = async () => {
           const {data} = await getOneUserAPI(comment?.commentCreator)
           setCreatorName(data.user)
       }
        getUserName()
      
      
    }, [])

  return (
    <div className={styles.card}>
  <div className={"card-header d-flex  justify-content-between"}>
      <div>
      <strong>{creatorName}</strong>
      </div>
      {isNewCommemt && (
      
        <div className="alert alert-success" role="alert">
            Right now!
        </div>
          
      )}
      <div>
      {moment(comment.createdAt).fromNow()}
      </div>
    
  </div>
  <div className="card-body">
    <div className="card-text">
        {comment.comment.split('\n').map((com: string, index: number) => (
            <div key={index}>{com}</div>
        ))}
    </div>
  </div>
</div>
  )
}

export default Comment