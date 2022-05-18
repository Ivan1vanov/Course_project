import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import styles from './update.module.scss'
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateItemAction } from '../../store/actions/itemActions';

interface ICreateProps {
    specifiedFields?: any,
    curretnItemId?: string,
    setCurrentItemId?: any
}

const UpdateIcon: React.FC<ICreateProps> = ({curretnItemId, specifiedFields, setCurrentItemId}) => {


    const {id} = useParams()
    const dispatch: any = useDispatch()
    const navigate = useNavigate()

    const item = useSelector((state: any) => curretnItemId ? state.items.items.find((post: any) => post._id === curretnItemId) : null)
    // console.log('Update item: ', item)
    const [extraItemFields, setExtraItemFields]: any = useState([])
    const [itemData, setItemData]: any = useState({
        name: '',
        tags: '',
        collectionId: id,
        extraItemFields: []
    })

    const onChangeStaticDataItem = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemData({
            ...itemData,
            [e.target.name]: e.target.value
        })
    }

    
    useEffect(() => {
        setItemData({
            name: item?.name,
            tags: item?.tags,
            collectionId: id,
        })

        const someFields = item?.extraItemFields?.map((field: any, index: number) => {
            setExtraItemFields((prev: any) =>({ 
                ...prev,
                [field.extraItemName]: field.extraItemData
            })
            )
        })
  
    }, [curretnItemId])


    useEffect(() => {
        // console.log('cgange')
        setItemData((prev: any) =>( {
            ...prev,
            extraItemFields: extraItemFields,
        })
        )
    }, [extraItemFields])


    const checkBoxHandler = (name: any) => {
        if(extraItemFields[name] === "true") {
            onChangeHandler('false', name)
        } else {
            onChangeHandler('true', name)
        }
        
    }

    const onChangeHandler = (value: string, name: string) => {
    setExtraItemFields({
            ...extraItemFields,
            [name]: value
    })
    setItemData({
        ...itemData,
        extraItemFields: extraItemFields,
    })
    }

    const createItemHanler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        // console.log(itemData)
        dispatch(updateItemAction(curretnItemId, itemData, navigate))
    }



  return (
      <div className={styles.modalBg}>
    <div className={styles.modalBody}>
        <div style={{width: '90%'}}>
         <form>
        <div className="form-group">
            <label htmlFor="formGroupExampleInput">Name</label>
            <input onChange={onChangeStaticDataItem} type="text" className="form-control" id="formGroupExampleInput" name='name' placeholder="Name"
            defaultValue={item?.name}
            />
        </div>
        <div className="form-group">
            <label htmlFor="formGroupExampleInput">Tags</label>
            <input onChange={onChangeStaticDataItem} type="text" className="form-control" id="formGroupExampleInput" name='tags' placeholder="Format"
            defaultValue={item?.tags}
            />
        </div>
        <hr/>
        {item?.extraItemFields?.map((field: any, index: number) => (
            <React.Fragment>
                { field.extraItemData === 'true' || field.extraItemData === 'false' ? (
                    <div>
                        <label>{field.extraItemName}</label>
                    <input type="checkbox" name={field.extraItemName} 
                    onChange={(e) => checkBoxHandler(e.target.name)} 
                    checked={extraItemFields[field.extraItemName] === 'true'}
                    />
                   </div>
                ) : !field.extraItemData ? (
                    <div key={index}>
                    <label htmlFor="formGroupExampleInput">{field.extraItemName}</label>
                    <textarea className="form-control" rows={3}
                     onChange={(e) => onChangeHandler(e.target.value, e.target.name)} id="formGroupExampleInput" 
                     name={field.extraItemName} placeholder={field.extraItemName}  defaultValue={field.extraItemData}
                     ></textarea>
                            </div>
                ) : !isNaN(field.extraItemData) || field.extraItemData === "0" ? (
                    <div key={index}>
                        <label htmlFor="formGroupExampleInput">{field.extraItemName}</label>
                        <input onChange={(e) => onChangeHandler(e.target.value, e.target.name)} 
                        // type={!isNaN(field.extraItemData) ? 'number' 
                        // :  Date.parse(field.extraItemData) ? 
                        // 'date' :
                        // 'text'} 
                        type='number' 
                        className="form-control" name={field.extraItemName} placeholder="Name"
                        defaultValue={field.extraItemData}
                        />
                    </div>
                    )  : field.extraItemData === 'Unknown date' || Date.parse(field.extraItemData) > 0 ? (
                    <div key={index}>
                    <label htmlFor="formGroupExampleInput">{field.extraItemName}</label>
                    <input onChange={(e) => onChangeHandler(e.target.value, e.target.name)} 
                    type='date' 
                    className="form-control" name={field.extraItemName} placeholder="Name"
                    defaultValue={field.extraItemData}
                    />
                    </div>
                ) : isNaN(field.extraItemData) ? (
                    <div key={index}>
                    <label htmlFor="formGroupExampleInput">{field.extraItemName}</label>
                    <textarea className="form-control" rows={3}
                     onChange={(e) => onChangeHandler(e.target.value, e.target.name)} id="formGroupExampleInput" 
                     name={field.extraItemName} placeholder={field.extraItemName}  defaultValue={field.extraItemData}
                     ></textarea>
                            </div>
                ) : (
                    <div key={index}>
                    <label htmlFor="formGroupExampleInput">{field.extraItemName}</label>
                    <input onChange={(e) => onChangeHandler(e.target.value, e.target.name)} 
                    // type={!isNaN(field.extraItemData) ? 'number' 
                    // :  Date.parse(field.extraItemData) ? 
                    // 'date' :
                    // 'text'}
                    type='date'  
                    className="form-control" name={field.extraItemName} placeholder="Name"
                    defaultValue={field.extraItemData}
                    />
                </div>
                )}
            </React.Fragment>
        ))}
        </form>
        <div>
        <Button className={styles.createButton} onClick={createItemHanler}>Update</Button>
        <Button variant='danger' className={styles.createButton} onClick={() => setCurrentItemId('')}>Cancel</Button>
        </div>
    </div>
    </div>
    </div>
  )
}

export default UpdateIcon
