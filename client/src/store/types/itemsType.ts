

export interface IExtraField {
    extraItemData: string,
    extraItemName: string,
    _id: string
}
export interface IComment {
    comment: string
    commentCreator: string
    createdAt: Date
    _id: string
}

export interface IItem {
    _id: string,
    name: string,
    tags: string,
    collectionId: string,
    likes: any,
    extraItemFields?: any,
    comments: IComment[]
}

interface ISearchItems {
    items: IItem[] | IItem | any,
    currentPage?: number,
    numberOfPages?: number
}


export enum ItemENUM {
    GET_ITEMS = 'GET_ITEMS',
    LOADING='LOADING',
    CREATE_ITEM='CREATE_ITEM',
    GET_ONE_ITEM='GET_ONE_ITEM',
    LIKE_ITEM='LIKE_ITEM',
    LIKE_ITEM_PAGE='LIKE_ITEM_PAGE',
    COMMENT_ITEM='COMMENT_ITEM',
    DELETE_ITEM='DELETE_ITEM',
    UPDATE_ITEM='UPDATE_ITEM',
    SEARCH_ITEMS='SEARCH_ITEMS',
    GET_LAST_ITEMS='GET_LAST_ITEMS',
    GET_LAST_ITEMS_LOAD_MORE='GET_LAST_ITEMS_LOAD_MORE'
}


interface Get_Items {
    type: ItemENUM.GET_ITEMS,
    payload?: IItem[] | IItem 
}

interface Loading {
    type: ItemENUM.LOADING
}

interface Create_Item {
    type: ItemENUM.CREATE_ITEM,
    payload?: IItem 
}

interface Get_Item {
    type: ItemENUM.GET_ONE_ITEM,
    payload?: IItem 
}

interface Like_Item {
    type: ItemENUM.LIKE_ITEM,
    payload: IItem
}

interface Like_Item_Page {
    type: ItemENUM.LIKE_ITEM_PAGE,
    payload: IItem
}

interface Comment_Item {
    type: ItemENUM.COMMENT_ITEM,
    payload: IItem
}

interface Delete_Item {
    type: ItemENUM.DELETE_ITEM,
    payload: IItem
}

interface Update_Item {
    type: ItemENUM.UPDATE_ITEM,
    payload: IItem
}

interface Search_Item {
    type: ItemENUM.SEARCH_ITEMS,
    payload: ISearchItems
}

interface Get_Last_Items {
    type: ItemENUM.GET_LAST_ITEMS,
    payload: ISearchItems
}

interface Get_Last_Items_Load_More {
    type: ItemENUM.GET_LAST_ITEMS_LOAD_MORE,
    payload: ISearchItems
}

export type ItemTypes = Get_Items | Loading | Create_Item | Get_Item | Like_Item | Like_Item_Page | 
                        Comment_Item | Delete_Item | Update_Item | Search_Item | Get_Last_Items |
                        Get_Last_Items_Load_More

