import React, { useState } from 'react'
import {graphql} from 'react-apollo'
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails'
const BookList = ({data}) => {
    const [selected, setSelected] = useState(null)
    const displayBooks=()=>{
        var res =data;
        if(res.loading){
            return (<li>Loadings Books</li>)
        }
        else{
            return res.books.map((book)=>(<li key={book.id} onClick={e=>{setSelected(book.id)}}>{book.name}</li>))
        }
    }
  return (
    <div><ul id='book-list'>
        {displayBooks()}
        </ul> 
        <BookDetails bookId={selected}/>
        </div>
  )
}

export default graphql(getBooksQuery)(BookList)