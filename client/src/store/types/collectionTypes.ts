

export interface ISpecifyFields {
    fieldName: string,
    fieldType: string,
    _id: string,
}

export interface ICollection {
    _id: string,
    name: string,
    description: string,
    format: string,
    creator: string,
    image: string,
    items?: number
    specifiedFields?: ISpecifyFields[]
}

interface IGetCollectionsPayload {
    collections: ICollection | ICollection[],
    numberOfPages: number,
    currentPage: number,
}

export enum CollectionsENUM {
    GET_COLLECTIONS = 'GET_COLLECTIONS',
    LOADING='LOADING',
    GET_ONE_COLLECTION='GET_ONE_COLLECTION',
    CREATE_COLLECTION='CREATE_COLLECTION',
    DELETE_COLLECTION='DELETE_COLLECTION',
    LOAD_MORE='LOAD_MORE',
    BIGEST_COLLECTIONS='BIGEST_COLLECTIONS',
}


interface Get_Collections {
    type: CollectionsENUM.GET_COLLECTIONS,
    payload: IGetCollectionsPayload
}

interface Loading {
    type: CollectionsENUM.LOADING
}

interface Get_One_Collection {
    type: CollectionsENUM.GET_ONE_COLLECTION,
    payload: ICollection
}

interface Create_Collection {
    type: CollectionsENUM.CREATE_COLLECTION,
    payload: ICollection
}

interface Delete_Collection {
    type: CollectionsENUM.DELETE_COLLECTION, 
    payload: ICollection
}

interface Load_more {
    type: CollectionsENUM.LOAD_MORE, 
    payload?: any
}

interface Bigest_Collections {
    type: CollectionsENUM.BIGEST_COLLECTIONS,
    payload: ICollection[] | ICollection
}



export type CollectionActionType = Get_Collections | Loading | Get_One_Collection | Create_Collection | 
                                    Delete_Collection | Load_more | Bigest_Collections 