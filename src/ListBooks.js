import React, { Component } from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'

class ListBooks extends Component {

  render() {

    const { MoveBook } = this.props

    let want    = this.props.books.filter((book) => book.shelf === 'wantToRead')
    let current = this.props.books.filter((book) => book.shelf === 'currentlyReading')
    let read    = this.props.books.filter((book) => book.shelf === 'read')

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {current.map((book) => (
                    <li key={book.id}>
                      <Book book={book} MoveBook={MoveBook} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {want.map((book) => (
                    <li key={book.id}>
                      <Book book={book} MoveBook={MoveBook} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {read.map((book) => (
                    <li key={book.id}>
                      <Book book={book} MoveBook={MoveBook} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
