import React, { useEffect, useState } from 'react'
import { Button, Container, Spinner } from 'react-bootstrap';
import styles from './create.module.scss'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { createCollectionAction } from '../../store/actions/collectionActions';
import { useNavigate } from 'react-router-dom';
import { createCollectionLG } from '../../SettingTypes/Language/createCollection';
import validator from 'validator';


const formats = [
    {
        name: 'Books'
    },
    {
        name: 'Alcohol'
    },
    {
        name: 'Post Stamps'
    },
    {
        name: 'Music'
    },
    {
        name: 'Other...'
    },
]

const CreateCollectionPage = () => {
 
    const dispatch: any = useDispatch()
    const navigate = useNavigate()

    const info = localStorage.getItem('profile')
    const user = info !== null ? JSON.parse(info).user : ''

    const [extraFieldName, setExtraFieldName]: any = useState({
        fieldName: '',
        fieldType: ''
    })

    const [collectionData, setCollectionData]: any = useState({
    name: "",
    description: "", 
    format: "",
    extraFileds: [],
    image: null
    })

   

    const [extraFieldsError, setExtraFieldsError] = useState('')
    const [validationError, setValidationError] = useState('')

    const [image, setImage] = useState<any>(null)

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setCollectionData({
            ...collectionData,
            [e.target.name]: e.target.value
        })
    }


    const createCollectionHandler = (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault()
      
        if(validator.isEmpty(collectionData.name) || validator.isEmpty(collectionData.description) || validator.isEmpty(collectionData.format)){
            setValidationError('Required fields should not be enpty')
        } else {
            // console.log(collectionData)
            dispatch(createCollectionAction(collectionData, navigate))
        }

         
    }


    const addAditionalField = (e: React.MouseEvent<HTMLElement>) => {
        if(validator.isEmpty(extraFieldName.fieldName) || validator.isEmpty(extraFieldName.fieldType)) {
            setExtraFieldsError('Pleace, enter field name and select type')
        } else {
            setExtraFieldsError('')
            setCollectionData({
                ...collectionData,
                extraFileds: [
                    ...collectionData.extraFileds,
                    extraFieldName
                ]
            })
            setExtraFieldName({
                fieldName: '',
                fieldType: ''
            })
        }
       
    }

    useEffect(() => {
       if(image) {
        const reader = new FileReader()
        reader.readAsDataURL(image)

        reader.onload = (e: any) => {
          setCollectionData({
              ...collectionData,
              image: e.target.result,
          })
        }
       }
    }, [image])

    const handleProductImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		setImage(e.target.files?.[0])
	};

    const {lg} = useSelector((state: any) => state.settings)
    const text = lg === 'en' ? createCollectionLG.en : createCollectionLG.pl

    const {color} = useSelector((state: any) => state.settings)
    const isWhite: boolean = color === 'white'

    const {loading} = useSelector((state: any) => state.collections)

    const isNumberFields = collectionData.extraFileds.filter((field: any) => field.fieldType === 'number')
    const isTextFields = collectionData.extraFileds.filter((field: any) => field.fieldType === 'text')
    const isMultilineTextFields = collectionData.extraFileds.filter((field: any) => field.fieldType === 'multilineText')
    const isDateFields = collectionData.extraFileds.filter((field: any) => field.fieldType === 'date')
    const isCheckBoxFields = collectionData.extraFileds.filter((field: any) => field.fieldType === 'checkbox')
 
  return (
      <div className={isWhite ? styles.whiteBody : styles.darkBody}>
    <Container>
        <form>
        <div className="form-group">
    
            <label htmlFor="formGroupExampleInput">{text.NAME}*</label>
            <input type="text" onChange={onChangeHandler} className="form-control" id="formGroupExampleInput" name='name' 
            placeholder={text.NAME}/>
        </div>

        <div className="form-group">
            <label htmlFor="formGroupExampleInput">{text.DESCRIPTION}*</label>
            {/* <input type="text" onChange={onChangeHandler} className="form-control" id="formGroupExampleInput" name='description' 
            placeholder={text.DESCRIPTION}/> */}
             <textarea className="form-control" rows={3}
             onChange={onChangeHandler} id="formGroupExampleInput" name='description' 
             placeholder={text.DESCRIPTION}
             ></textarea>
        </div>

        <div className="form-group">
            <label htmlFor="formGroupExampleInput">{text.FORMAT}*</label>
            {/* <input type="text" onChange={onChangeHandler} className="form-control" id="formGroupExampleInput" name='format' 
            placeholder={text.FORMAT}/> */}
            <select onChange={onChangeHandler} className="form-control" id="formGroupExampleInput" name='format'>
            <option value=''></option>
                {formats.map((format: any, index: any) => (
                    <option value={format.name}>{format.name}</option>
                ))}
                
            </select>
        </div>

        <div className="form-group">
            <label htmlFor="formGroupExampleInput">{text.IMAGE}</label>
            <input type="file" onChange={handleProductImage}
            id="formGroupExampleInput" name='image' 
            />
        </div>

        <div className={styles.extraField}>
        <label htmlFor="formGroupExampleInput">{text.ADD_FIELD}</label>
        <div>{text.FIELDS_INFO}</div>
        <div className="d-flex align-items-center justify-content-between">

            <div style={{width: '95%'}}>

            <input type="text" 
            onChange={(e) => setExtraFieldName({
                ...extraFieldName,
                fieldName: e.target.value
            })} 
            value={extraFieldName.fieldName}
            className="form-control" id="formGroupExampleInput" name='fieldName' placeholder={text.NAME}/>
            </div>
            <div className='p-1'>

            <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Type</label><br/><br/>
            <select onChange={(e) => setExtraFieldName({
                ...extraFieldName,
                fieldType: e.target.value 
            })} 
            className="form-control" value={extraFieldName.fieldType} id="exampleFormControlSelect1">
            <option value=''></option>
            {isTextFields.length < 3 && (
                    <option value='text'>text</option>
            )}

            {isMultilineTextFields.length < 3 && (
                    <option value='multilineText'>multiline text</option>
            )}
         

            {isNumberFields.length < 3 && (
                    <option value='number'>number</option>
            )}
            {isDateFields.length < 3 && (
                    <option value='date'>date</option>
            )}

            {isCheckBoxFields.length < 3 && (
                    <option value='checkbox'>checkbox</option>
            )}
            
            
            </select>

            </div>

            <Button variant='success' disabled={collectionData.extraFileds.length >= 15} onClick={addAditionalField} >
                {text.ADD}
            </Button>
           
            </div>
            
        </div>
        <strong>{text.OPTIONAL_FIELDS}: </strong>
        {extraFieldsError && (
                <div className="alert alert-danger" role="alert">
                {extraFieldsError}
            </div>
            )}
        <div>
            {
                collectionData.extraFileds?.map((field: {fieldName: string, fieldType: string}, index: number) => (
                    <div key={index}>
                        {field.fieldName} : {field.fieldType}
                    </div>
                ))
            }
        </div>

        </div>
        {validationError && (
                <div className="alert alert-danger" role="alert">
                {validationError}
            </div>
            )}
        <Button disabled={loading} onClick={createCollectionHandler}  type='submit'>{text.CREATE}</Button>
        </form>
        {loading && (
            <div>
                 <Spinner animation="border" variant="primary" />
            </div>
        )}
        
    </Container>

    </div>
  )
}

export default CreateCollectionPage