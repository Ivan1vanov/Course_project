

interface ITag {
    tag: string,
    _id: string
}


export enum TagsENUM {
    GET_TAGS = 'GET_TAGS'
}

interface Get_Tags {
    type: TagsENUM.GET_TAGS,
    payload: ITag
}

export type TagTypes = Get_Tags