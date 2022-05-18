import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { itemLG } from '../../SettingTypes/Language/item';
import Item from './Item/Item';
import styles from './items.module.scss';


interface ItemProps {
  id?: string | undefined,
  creatorId?: string,
  setCurrentItemId?: any,
  setSortBy?: any,
  setCollectionSCVitems?: any
}

const Items: React.FC<ItemProps> = ({creatorId, setCurrentItemId, setSortBy, setCollectionSCVitems}) => {
//filename
  
    const dispatch: any = useDispatch()

    const {items, loading} = useSelector((state: any) => state.items)

    useEffect(() => {
      console.log('saved')
      setCollectionSCVitems(items)
    }, [items])
    
    const {lg} = useSelector((state: any) => state.settings)
    const text = lg === 'en' ? itemLG.en : itemLG.pl

  return (
    <div className={styles.mainContainer}>
      <div className={styles.sortActions}>
      <h2>{text.SORT_BY}: </h2>
      <select className={styles.selectForm} onChange={(e) => setSortBy(e.target.value)}>
      <option value='date_from_early'>{text.date_from_early}</option>
      <option value='date_from_the_latest'>{text.date_from_the_latest}</option>
      <option value='likes_from_the_most_popular'>{text.likes_from_the_most_popular}</option>
      <option value='likes_from_the_smallest'>{text.likes_from_the_smallest}</option>
      </select>
      </div>
    <div className={styles.container}>

  

      {loading && (
        <div>
          LOADONG...
        </div>
      )}
        {items?.map((item: any, index: number) => (
          <Item setCurrentItemId={setCurrentItemId} key={index} item={item} creatorId={creatorId}/>
        ))}
        {items?.length === 0 && (
          <div>
            Here is no any items...
          </div>
        )}
      
    </div>
    </div>
  )
}

export default Items