import React, { useEffect, useState } from 'react'
import { Button, FormControlProps } from 'react-bootstrap'
import axios from 'axios';
import styles from './createItem.module.scss'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createItemAction } from '../../store/actions/itemActions';
import { createItemLG } from '../../SettingTypes/Language/CreateItem';
import { ISpecifyFields } from '../../store/types/collectionTypes';
import validator from 'validator';
import { getTagsAction } from '../../store/actions/tagActions';


interface ICreateProps {
    specifiedFields?: ISpecifyFields[] | any,
}

const CreateItem: React.FC<ICreateProps> = ({specifiedFields}) => {

    const {id} = useParams()
    const dispatch: any = useDispatch()


    const [extraItemFields, setExtraItemFields]: any = useState([])
    const [validationError, setValidationError] = useState<string>('')

    const [selectedTags, setSelectedTags] = useState<any>([])
    const [suggections, setSuggestions] = useState<any>([])
    const [tagValue, setTagValue] = useState('')

    const [itemData, setItemData]: any = useState({
        name: '',
        tags: '',
        collectionId: id,
        extraItemFields: []
    })

    const {tags} = useSelector((state: any) => state.tags)

    useEffect(() => {
        dispatch(getTagsAction())
    }, [])

    const onChangeStaticDataItem = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemData({
            ...itemData,
            [e.target.name]: e.target.value
        })
    }

    const addTagHandler = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        // console.log(e.key)
        if(e.key === ' ' || e.key === 'Spacebar') {
            if(tagValue) {

                setSelectedTags([...selectedTags, tagValue])
            setTagValue('')
            }    
        
        }
        // console.log(selectedTags.join(' '))

    }

    const onChangeTAG = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentValue = e.target.value
        setTagValue(e.target.value)

        let matches: any = []
    if(currentValue.length >= 0) {

      matches = tags
      if(currentValue.length > 1) {
        matches = tags?.filter((tag: any) => { 
          const regex = new RegExp(`${currentValue}`, 'gi')
          return tag.tag.match(regex)
        })
      }
    }
    // console.log(matches)
    setSuggestions(matches)
    }

    const selectTagFromList = (tag: string) => {
        setTagValue(tag)
        setSuggestions([])
    }

    useEffect(() => {
        // console.log('fileds: ', specifiedFields)

        const someFIelds = specifiedFields?.reduce((obj: any, item: ISpecifyFields) => (
            item.fieldType === 'checkbox' ?
            {
            ...obj,
            [item.fieldName]: 'false' 
        } : item.fieldType === 'number' ? {
            ...obj,
            [item.fieldName]: 0
        } : item.fieldType === 'date' ? {
            ...obj,
            [item.fieldName]: 'Unknown date'
        } : {
            ...obj,
            [item.fieldName]: ''
        }
        ), {})

        // console.log('someFields: ', someFIelds)
        setExtraItemFields(someFIelds)
    }, [specifiedFields])

    const onChangeHandler = (value: string, name: string) => {
        // console.log(value, name)
    setExtraItemFields({
            ...extraItemFields,
            [name]: value
    })
    setItemData({
        ...itemData,
        extraItemFields: extraItemFields,
    })
    }

    useEffect(() => {
        // console.log('chenged', extraItemFields)
        // console.log('data: ', itemData)
        setItemData({
            ...itemData,
            extraItemFields: extraItemFields,
        })
    }, [extraItemFields])

    useEffect(() => {
        // console.log('///')
        setItemData({
            ...itemData,
            tags: selectedTags.join(' '),
        })
    }, [selectedTags])

    const checkBoxHandler = (name: any) => {
        if(extraItemFields[name] === "true") {
            onChangeHandler('false', name)
        } else {
            onChangeHandler('true', name)
        }
        
    }
 
    const createItemHanler = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        setItemData({
            ...itemData,
            extraItemFields: extraItemFields,
        })

        // console.log(extraItemFields)
        // console.log(itemData)
        if(validator.isEmpty(itemData.name) || validator.isEmpty(itemData.tags)) {
            setValidationError('Filesd "Name" and "Tags" are required')
        } else {
            dispatch(createItemAction(itemData))
        }
    }

    const {lg} = useSelector((state: any) => state.settings)
    const text = lg === 'en' ? createItemLG.en : createItemLG.pl
  return (
    <div style={{width: '90%'}}>
         <form>
        <div className="form-group">
            <label htmlFor="formGroupExampleInput">{text.NAME}*</label>
            <input onChange={onChangeStaticDataItem} type="text" className="form-control" id="formGroupExampleInput" name='name' 
            placeholder={text.NAME}/>
        </div>
        <div className="form-group">
            <label htmlFor="formGroupExampleInput">{text.TAGS}* - Just enter tag and click "space"</label>
<div className={styles.tagsInputContainer}>
        <div className={styles.tagsInput}>

                {selectedTags?.map((tag: string, index: number) => (
                <div key={index} className={styles.tagItem}>#{tag}</div>
                ))}

            <div className={styles.decorativeTag}>#</div>
            <input 
            onKeyDown={addTagHandler} 
            onChange={onChangeTAG}
            value={tagValue.trim()}
            type="text" 
            className="form-control" 
            id="formGroupExampleInput" 
            name='tags' 
            placeholder={text.TAGS}
            onBlur={() => setTimeout(() => {
                setSuggestions([])
              }, 1000)}
            />
        </div>
        <div className={styles.suggestionBlock}>
        {suggections && suggections.map((sug: any, index: number) => (
        <div onClick={() => selectTagFromList(sug.tag)} className={styles.suggestion} key={index}>
          {sug.tag}
        </div>
        ))}
        </div>
            {/* <input onChange={onChangeStaticDataItem} type="text" className="form-control" id="formGroupExampleInput" name='tags' 
            placeholder={text.TAGS}/> */}
        </div>
</div>

        <hr/>
        {specifiedFields?.map((field: any, index: number) => (
            <React.Fragment key={index}>
                {field.fieldType === 'multilineText' ? (
                <div key={index}>
                    <label htmlFor="formGroupExampleInput">{field.fieldName}</label>
                <textarea className="form-control" rows={3}
             onChange={(e) => onChangeHandler(e.target.value, e.target.name)} id="formGroupExampleInput" 
             name={field.fieldName} placeholder={field.fieldName}
             ></textarea>
                </div>   
                ) : field.fieldType === 'checkbox' ? (
                    <div key={index}>
                        <label htmlFor="formGroupExampleInput"
                        defaultValue='false'>{field.fieldName}</label>
                        <div>
                            <input type="checkbox" name={field.fieldName} 
                            onChange={(e) => checkBoxHandler(e.target.name)} 
                            // checked={extraItemFields[field.fieldName] === 'true'}
                            />
                    </div>
              
                    </div>
                ) : (
                <div key={index}>
                    <label htmlFor="formGroupExampleInput">{field.fieldName}</label>
                    <input onChange={(e) => onChangeHandler(e.target.value, e.target.name)} type={field.fieldType} className="form-control" name={field.fieldName} placeholder={field.fieldName}/>
                </div>
                )}
        
            </React.Fragment>
        ))}
        {validationError && (
            <div className="alert alert-danger" role="alert">
            {validationError}
          </div>
        )}
        <Button className={styles.createButton} onClick={createItemHanler}>{text.CREATE}</Button>
        </form>
    </div>
  )
}

export default CreateItem