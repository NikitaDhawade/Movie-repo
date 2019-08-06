import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/Like";
import Pagination from "./common/Pagination";
import _ from 'lodash';
import ListGroup from "./common/ListGroup";
import {getGenres} from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: getMovies(),
    generes: getGenres(),
    currentState: false,
    selectedGenre: {_id:""},
    perPage: 3,
    currentPage: 1
  };

  handleDelete = (movie) => {
    const movies = movies.filter(m => m._id != movie._id);
    this.setState({movies})
  }

  // toggle = (movie) =>
  // {
  //   const black=currentState;
  //   const likedMovie = movies.filter(m=>m.title == movie.title)
  //   console.log(movie.title,likedMovie[0].title)
  //   if(likedMovie[0].title === movie.title)
  //     this.setState({currentState:!black})
    
  // }

  handleLike = (movie) =>  {
    const movies = [...movies];
    const index = movies.indexOf(movie);
    movies[index] = {...movie};
    movies[index].liked = !movies[index].liked;
    this.setState({movies});
    console.log(movies);
  }
  handleOnPageChange=(currentPage)=>
  {
    console.log(currentPage);
    this.setState({currentPage})
  }
  // handleGenres = (g) =>
  //    {
  //       console.log(g.name);
  //    }


  // onNext =(currentPage)=>
  // {
  //   this.setState({currentPage:this.state.currentPage+1})
  // }
  // onPrevious=(currentPage)=>
  // {

  // }

  handleGenres = selectedGenre => {
    // console.log(selectedGenre)
    this.setState({selectedGenre, currentPage:1})
  }

  render() {
    
    
    const {movies, currentPage, perPage, selectedGenre} = this.state;
    
    // console.log("tttt",totalMovies)
    
    const filtered = (selectedGenre && selectedGenre._id!='') ? movies.filter(m => m.genre._id == selectedGenre._id) : movies;
    console.log("Filtered : ", filtered, " : ", selectedGenre);

    const {length: totalMovies} = filtered;
    const startIndex = (currentPage-1) * perPage;
    const paginated = _(filtered).slice(startIndex).take(perPage).value();
    console.log(paginated)
    return (
      <>
      <div className="row">
      <div className="col-md-2"> 
      <ListGroup genres={this.state.generes} currentSelectedGenre={selectedGenre} handleGenres={this.handleGenres}></ListGroup>
      </div>
      <div className="col">

      {
          (totalMovies == 0) ? 
            <h4>There no movies available!</h4> :
            <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Genere</th>
                <th scope="col">Stock</th>
                <th scope="col">Rating</th>
                <th scope="col">Like</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(m => (
                <tr key={m._id}>
                  <td>{m.title}</td>
                  <td>{m.genre.name}</td>
                  <td>{m.numberInStock}</td>
                  <td>{m.dailyRentalRate}</td>
                  <td>
                    <Like liked={m.liked} onClick={() => this.handleLike(m)}></Like>
                  </td>
                  <td>
                      <button className="btn btn-danger" onClick={() => this.handleDelete(m)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> 
        }
               </div>


        
        </div>       
      <div className="row">
        <Pagination perPage={perPage} pageSize={totalMovies} currentPage={currentPage} onClick={this.handleOnPageChange}></Pagination>
      </div>
       </> 
    );
  }
}

export default Movies;
