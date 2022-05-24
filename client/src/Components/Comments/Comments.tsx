import React, { useEffect, useRef, useState } from 'react'
import Comment from './Comment/Comment'
import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { commentItemAction } from '../../store/actions/itemActions';
import { IComment } from '../../store/types/itemsType';
import { itemLG } from '../../SettingTypes/Language/item';

import * as io from 'socket.io-client'
import { useNavigate } from 'react-router-dom';

interface ICommentProps {
    itemId: string | undefined,
    comments: IComment[]
}

const socket = io.connect('https://course-ih.herokuapp.com')

const Comments: React.FC<ICommentProps> = ({itemId, comments}) => {
    const dispatch: any = useDispatch()
    const navigate = useNavigate()

    const info = localStorage.getItem('profile')
    const user = info !== null ? JSON.parse(info).user : ''

    const [newComments, setNewComments] = useState<any>([])

    const commetsEnd = useRef<HTMLDivElement>(null)

    const [commentData, setCommentData] = useState({
        comment: '',
        createdAt: new Date(),
        commentCreator: user._id,
        itemId: itemId
    })

    useEffect(() => {
        socket.emit('join_item', itemId)
    }, [])

    useEffect(() => {
        socket.on('receive_comment', (data) => {
            // console.log(data)
            setNewComments((prev: any) => [...prev, data])
        })
        
    }, [socket]) 

    useEffect(() => {
        commetsEnd.current?.scrollIntoView({ behavior: "smooth" })
    }, [newComments])


    const createCommentHandler = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        await socket.emit('comment_item', commentData)
        setNewComments((prev: any) => [...prev, commentData])
        dispatch(commentItemAction(itemId, commentData, navigate))
        setCommentData({
            ...commentData, 
            comment: ''
        })
       
    }

    const {lg} = useSelector((state: any) => state.settings)
    const text = lg === 'en' ? itemLG.en : itemLG.pl

  return ( 
    <Container>
        <h2>{text.COMMENTS}: </h2>
    <div>
        {comments?.map((comment: any, index: number) => (
            <Comment comment={comment} key={index}/>
        ))}
        {newComments && (
            newComments.map((comment: any, index: number) => (
                <div  key={index} ref={commetsEnd}>
                <Comment 
                comment={comment} 
                isNewCommemt={true}
                />
                </div>
            ))
        )}
    </div>

    {user ? (
        <div className="form-group mt-3">
        <textarea value={commentData.comment} onChange={(e) => setCommentData({...commentData, comment: e.target.value})} 
        className="form-control mt-2 mb-2" id="exampleFormControlTextarea1" placeholder={text.CREATE_COMMENT} rows={3}></textarea>
        <Button onClick={createCommentHandler}>{text.CREATE}</Button>
      </div>
    ) : (
      
        <div className="alert alert-light" role="alert">
            Login to create a comment
        </div>
    
    )}

    </Container>
  )
}

export default Comments