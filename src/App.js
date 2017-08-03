import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import Search from './Search'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {

 constructor(props) {
    super(props)

    this.MoveBook = this.MoveBook.bind(this)
    this.fetchState = this.fetchState.bind(this)
    this.SearchBooks = this.SearchBooks.bind(this)
  }

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
  }

    componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  MoveBook(book, shelf) {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }))
    })
  }

  /* No sure if this is the right way to do this.  but it works :) */
  fetchState(bookId) {
    const book = this.state.books.filter(b => b.id === bookId)
    if (book.length === 1){
      return book[0].shelf
    }else{
      return 'none'
    }
  }

 SearchBooks(query, limit) {
    return new Promise((res, reject) => {
      BooksAPI.search(query, limit).then(books => {
        if (books){
          const newBooks = books.map(book => {
            book.shelf = this.fetchState(book.id)
            return book
          })
          res(newBooks)
        }else{
          res([])
        }
      })
    })

  } 

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books} MoveBook={this.MoveBook} />
        )} />

        <Route path="/search" render={() => (
          <Search search={this.SearchBooks} MoveBook={this.MoveBook} />
        )} />
      </div>
    )
  }
}

export default BooksApp
