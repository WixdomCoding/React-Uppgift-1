import { Component } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      title: '',
      year: '',
      rating: '',
      poster: '',
      editIndex: -1
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target

    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { title, year, rating, poster, movies, editIndex } = this.state

    if (title && year && rating && poster) {
      const newMovie = { title, year, rating, poster }
      const newMovies = [...movies]

      if (editIndex > -1) {
        newMovies[editIndex] = newMovie
        this.setState({ editIndex: -1 })
      } else {
        newMovies.push(newMovie)
      }

      this.setState({
        movies: newMovies,
        title: '',
        year: '',
        rating: '',
        poster: ''
      })
    }
  }

  handleDelete = (index) => {
    const newMovies = [...this.state.movies]
    newMovies.splice(index, 1)
    this.setState({ movies: newMovies })
  }

  handleEdit = (index) => {
    const movie = this.state.movies[index]
    this.setState({
      title: movie.title,
      year: movie.year,
      rating: movie.rating,
      poster: movie.poster,
      editIndex: index
    })
  }

  handleEditPoster = (index) => {
    const newMovies = [...this.state.movies]
    const newPoster = prompt('Ange en ny URL till filmaffischen')
    if (newPoster) {
      newMovies[index].poster = newPoster
      this.setState({ movies: newMovies })
    }
  }
  
  render() {
    const { title, year, rating, poster, movies } = this.state

    return (
      <>
        <div className="logo">
          <img src={reactLogo} alt="react logo" />
          <span>+</span>
          <img src={viteLogo} alt="vite logo" />
        </div>
        <div className="container">
          <h1>Filmdatabas med React</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <label htmlFor="title">Titel</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={this.handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="year">År</label>
              <input
                type="number"
                id="year"
                name="year"
                value={year}
                onChange={this.handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="rating">Betyg</label>
              <select
                id="rating"
                name="rating"
                value={rating}
                onChange={this.handleChange}
              >
                <option value="">Välj betyg</option>
                <option value="1">★☆☆☆☆</option>
                <option value="2">★★☆☆☆</option>
                <option value="3">★★★☆☆</option>
                <option value="4">★★★★☆</option>
                <option value="5">★★★★★</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="poster">Filmaffisch</label>
              <input
                type="text"
                id="poster"
                name="poster"
                value={poster}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit">
              {this.state.editIndex > -1 ? 'Uppdatera' : 'Lägg till'}
            </button>
          </form>
          <div className="card-container">
            {movies.map((movie, index) => (
              <div className="card" key={index}>
                <img src={movie.poster} alt={movie.title} />
                <div className="card-content">
                  <h2>{movie.title}</h2>
                  <p>År: {movie.year}</p>
                  <p>Betyg: {movie.rating}</p>
                  <div className="card-actions">
                    <button onClick={() => this.handleEdit(index)}>Redigera</button>
                    <button onClick={() => this.handleDelete(index)}>Radera</button>
                    <button onClick={() => this.handleEditPoster(index)}>Redigera filmaffisch</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }
}

export default App