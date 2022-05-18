import axios from 'axios';

export const API = axios.create({baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req: any) => {
    const info = localStorage.getItem('profile')
    if(info) {
        req.headers.authorization = `Bearer ${info !== null ? JSON.parse(info).token : ''}`
    }
    return req
})
 
export const getCollectionsAPI = () => API.get(`/api/collection`)
export const getOneCollectionAPI = (id: string | undefined) => API.get(`/api/collection/${id}`)
export const createCollectionAPI = (data: any) => API.post('api/collection', data)
export const getCollectionOfUserAPI = (id: string | undefined) => API.get(`/api/collection/user/${id}`)
export const deleteCollectionAPI = (id: string | undefined) => API.delete(`/api/collection/${id}`)
export const getNameOfCollectionAPI = (id: string | undefined) => API.get(`/api/collection/name/${id}`)
export const getCollectionsLoadMoreAPI = (page: any) => API.get(`/api/collection/pagination?page=${page}`)
export const bigestCollectionsAPI = () => API.get('/api/collection/bigest')


export const getItemsAPI = (id: string | undefined, sort?: string) => API.get(`/api/item/${id}?sort=${sort}`)

export const createItemAPI = (data: any) => API.post('/api/item', data)
export const getOneItemAPI = (id: string | undefined) => API.get(`/api/item/one/${id}`)
export const likeItem = (id: string | undefined) => API.put(`/api/item/like/${id}`)
export const commentItemAPI = (id: string | undefined, data: any) => API.put(`/api/item/comment/${id}`, data) 
export const delereItemAPI = (id: string | undefined) => API.delete(`/api/item/${id}`)
export const updateItemAPI = (id: string | undefined, data: any) => API.put(`/api/item/update/${id}`, data)

export const searchItemsAPI = (searchData: string | undefined, page: number) => API.get(`/api/item/some/search?search=${searchData}&page=${page}`)
export const searchItemsByTagAPI = (tag: string, page: number) => API.get(`/api/item/tag/search?tag=${tag}&page=${page}`)

export const getLastItemsAPI = () => API.get('/api/item/all/last')
export const getLastItemsLoadMoreAPI = (page: any) => API.get(`/api/item/all/last/more?page=${page}`)


//user
export const registerAPI = (data: any) => API.post('/api/users/registration', data)
export const loginAPI = (data: any) => API.post('api/users/login', data)
export const loginWithFacebookAPI = (data: any) => API.post('/api/user/facebook', data)

export const getOneUserAPI = (id: string | undefined) => API.get(`/api/users/one/${id}`)
export const getUsersAPI = (page?: any) => API.get(`/api/users?page=${page}`)
export const blockeUsersAPI = (id: string | undefined) => API.put(`/api/users/block/${id}`)
export const activeUsersAPI = (id: string | undefined) => API.put(`/api/users/active/${id}`)
export const adminRightsAPI = (id: string | undefined) => API.put(`/api/users/admin/${id}`)
export const userRightsAPI = (id: string | undefined) => API.put(`/api/users/disadmin/${id}`)

export const deleteUserAPI = (id: string | undefined) => API.delete(`/api/users/delete/${id}`)

export const getTagsAPI = () => API.get('/api/tags')
