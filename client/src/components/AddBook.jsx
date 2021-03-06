import React from 'react'
import { useState } from 'react'
import {flowRight as compose} from 'lodash';
import { graphql } from 'react-apollo';
import { getAuthorsQuery ,addBookMutation, getBooksQuery} from '../queries/queries'

const AddBook = (props) => {
    const [name, setName] = useState('')
    const [genre, setGenre] = useState('')
    const [authorId, setAuthorId] = useState('')
    const displayAuthors=()=>{
        console.log(props)
        var res=props.getAuthorsQuery
        if(res.loading){
            return( <option disabled>Loading authors</option> );
        } else {
            return res.authors.map(author => {
                return( <option key={ author.id } value={author.id}>{ author.name }</option> );
            });
        }
    }
    const submitForm=(e)=>{
        e.preventDefault()
        props.addBookMutation({
            variables: {
                name: name,
                genre: genre,
                authorId:authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        });
    }
  return (
    <form id="add-book" onSubmit={submitForm}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={(e)=>setName(e.target.value)} />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={(e)=>setGenre(e.target.value)} />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={(e)=>setAuthorId(e.target.value)}>
                        <option>Select author</option>
                        { displayAuthors() }
                    </select>
                </div>
                <button>+</button>

            </form>
  )
}

export default compose(
     graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);