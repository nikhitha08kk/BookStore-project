import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import CreateBooks from './Pages/CreateBooks'
import ShowBook from './Pages/ShowBook'
import EditBooks from './Pages/EditBooks'
import DeleteBooks from './Pages/DeleteBooks'
const App = () => {
  return (
   <Routes>
   <Route path='/' element={<Home/>}/>
   <Route path='/books/create' element={<CreateBooks/>}/>
   <Route path='/books/details/:id' element={<ShowBook/>}/>
   <Route path='/books/edit/:id' element={<EditBooks/>}/>
   <Route path='/books/delete/:id' element={<DeleteBooks/>}/>
  </Routes>
  )
}

export default App
