import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import MainPage from './Pages/MainPage/MainPage';
import CreateCollectionPage from './Pages/CreateCollection/CreateCollectionPage';
import CreateItem from './Pages/CreateItem/CreateItem';
import CollectionPage from './Pages/CollectionPage/CollectionPage';
import ItemPage from './Pages/ItemPage/ItemPage';
import AuthPage from './Pages/AuthPage/AuthPage';
import UserPage from './Pages/UserPage/UserPage';
import AdminPage from './Pages/AdminPage/AdminPage';
import { useSelector } from 'react-redux';
import SearchPage from './Pages/SearchPage/SearchPage';
import TagSearch from './Pages/SearchPage/SearchByTagsPage/TagSearch';


function App() {  

  const {color} = useSelector((state: any) => state.settings)
  const isWhite: boolean = color === 'white'

  return (
    <div>
     <BrowserRouter>
     <Navbar/>
     <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/create' element={<CreateCollectionPage/>}/>
        <Route path='/item/create' element={<CreateItem/>}/>
        <Route path='/collection/:id' element={<CollectionPage/>}/>
        <Route path='/item/:id' element={<ItemPage/>}/>
        <Route path='/auth' element={<AuthPage/>}/>
        <Route path='/hello/:id' element={<UserPage/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/search' element={<SearchPage/>}/>
        <Route path='/search/tags' element={<TagSearch/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
