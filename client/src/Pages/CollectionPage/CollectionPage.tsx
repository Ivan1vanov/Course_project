import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneCollectionAction, deleteCollectionAction } from '../../store/actions/collectionActions';
import { Container, Button } from 'react-bootstrap';
import CreateItem from '../CreateItem/CreateItem';
import {AiOutlinePlusCircle, AiOutlineVerticalAlignBottom} from 'react-icons/ai'
import Items from '../../Components/Items/Items';
import { getOneUserAction } from '../../store/actions/userAction';
import UpdateIcon from '../../Components/UpdateModalIcon/UpdateIcon';
import { CollectionPageLG } from '../../SettingTypes/Language/collectionPage';

import whiteMode from './collectionPage.module.scss'
import darkMode from './collPageDark.module.scss'

import MarkDown from 'react-markdown'
import { getItemAction } from '../../store/actions/itemActions';

import defaultImage from '../../public/3d8c2f2c82c1c9ef1e27be645cd1aa17.jpg'

import { CSVLink } from "react-csv";

const CollectionPage = () => {


    const {id} = useParams()

    const dispatch: any = useDispatch()
    const navigate = useNavigate()

    const [showCreateForm, setShowCreateForm] = useState<boolean>(false)
    const [curretnItemId, setCurrentItemId] = useState<string>('')
    const [sortBy, setSortBy] = useState('')
    const [collectionSCVitems, setCollectionSCVitems] = useState<any>([])

    console.log(collectionSCVitems)

    const info = localStorage.getItem('profile')
    const user = info !== null ? JSON.parse(info).user : ''
    
    
    const {currentUserName} = useSelector((state: any) => state.user)

    
    useEffect(() => {
        dispatch(getOneCollectionAction(id))
        dispatch(getItemAction(id, sortBy))
    }, [id, sortBy])
    const {collection} = useSelector((state: any) => state.collections)


    useEffect(() => {
        if(collection) {
            dispatch(getOneUserAction(collection?.creator))
        }
        
    }, [collection])


    const deleteCollectonHandler = (e: React.MouseEvent<HTMLElement>) => {
        dispatch(deleteCollectionAction(collection?._id))
        navigate('/')

    }

    const {lg} = useSelector((state: any) => state.settings)
    const text = lg === 'en' ? CollectionPageLG.en : CollectionPageLG.pl

    const {color} = useSelector((state: any) => state.settings)
    const isWhite: boolean = color === 'white'

    const styles = isWhite ? whiteMode : darkMode

    // const [mainData, setMainData] = useState([
    //     {name: collection?.name, format: collection?.format, items: collection?.items, creator: collection?.creator,
    //         allItemsID: collectionSCVitems?.map((item: any) => {
    //             return [item._id]
        
    //     })}
    // ])

 
    
    const cvsCollectionData =  collectionSCVitems?.map((item: any) => {
        return {name: '', format: '', items: '', creator: '',
            allItemsID: item._id
        }
    })
    const cvsMainData = [
        {name: collection?.name, format: collection?.format, items: `${collection?.items} items`, creator: collection?.creator,
            allItemsID: collectionSCVitems[0]?._id},
        ...cvsCollectionData.slice(1)
    ]

    const cvsCollectionHeaders = [
        { label: "Name", key: "name" },
        { label: "Format", key: "format" },
        { label: "Items", key: "items" },
        { label: "Author ID", key: "creator" },
        { label: "Items IDs", key: "allItemsID" },   
    ]

    const scvReport = {
        filename: `${collection?.name}.csv`,
        headers: cvsCollectionHeaders,
        data: cvsMainData
    }

  return (
      <div>
          {curretnItemId && (
              <UpdateIcon setCurrentItemId={setCurrentItemId}  specifiedFields={collection?.specifiedFields} curretnItemId={curretnItemId}/>
          )}

    
    <div className={styles.collectionBody}>
<div className={styles.collectionTop} style={
    collection?.image ? {backgroundImage: `url(http://res.cloudinary.com/dcbpsfp9i/image/upload/${collection.image})`} : 
   {backgroundImage: `url(${defaultImage})`}
    
    }>
    <div className={styles.blackBackground}>

        <div className={styles.title}>
           <h2>{collection?.name}</h2>

           <div>
            <span>{text.FORMAT}: <strong>{collection?.format}</strong></span>
        </div>

        <div>
            <span>{text.AUTHOR}: <strong>{currentUserName}</strong></span>
        </div>
        </div>

    </div>
</div>
    <div className={styles.itemContainer}>
        <div className={styles.description}>
            <MarkDown>{collection?.description}</MarkDown>

            {collection?.creator === user?._id || user.isAdmin === true ? (
                <div className='d-flex justify-content-between'>
                <Button className={styles.buttonCreate} variant="outline-primary"
                onClick={() => setShowCreateForm(!showCreateForm)}
                > 
                <AiOutlinePlusCircle className='mr-1'/> 
                 {text.CREATE}
                </Button>
                <Button variant='danger' 
                className={styles.buttonCreate}
                onClick={deleteCollectonHandler}
                >
                    {text.DELETE}
                    </Button>
                </div>
            ) : null}

            <CSVLink 
            {...scvReport}
            >
                <Button className={styles.buttonCSCexport}>
                    <AiOutlineVerticalAlignBottom className={styles.exportIcon}/> {text.EXPORT_CVS}
                </Button>
        </CSVLink>

        <div className='d-flex justify-content-between'>
        
        </div>
        </div>

        <Container className={showCreateForm ? styles.showForm : styles.hidenForm}>
        <CreateItem specifiedFields={collection?.specifiedFields} />
        </Container>    

        <div>
          
                <Items setCurrentItemId={setCurrentItemId} id={id} creatorId={collection?.creator} setSortBy={setSortBy}
                setCollectionSCVitems={setCollectionSCVitems}
                />
          
        </div>
       
    </div>
    </div>
    </div>
  )
}

export default CollectionPage