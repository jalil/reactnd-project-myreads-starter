import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class Search extends Component {

  state = {
    query: '',
    wantedBooks: []
  }

   static propTypes = {
         search: PropTypes.func.isRequired,
         MoveBook: PropTypes.func.isRequired
         }
  updateSearch(query) {
    const newSearch = query.trim()
    this.setState({query: newSearch})
    this.props.search(newSearch, 100).then((books) => {
      if (books.length > 0){
        this.setState({wantedBooks: books})
      } else {
        this.setState({wantedBooks: []})
      }
    })
  }

  render() {
    const { query, wantedBooks } = this.state
    const { MoveBook } = this.props

    console.log(this.props);
    console.log(this.state.wantedBooks);
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateSearch(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {wantedBooks.map((book) => (
            <li key={book.id}>
              <Book book={book} MoveBook={MoveBook} />
            </li>
          ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
