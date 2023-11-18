import { Component } from "react";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi"
import axios from 'axios'

import './index.css'

class Home extends Component {
    state = {moviesData: [], openModal : false} 

    componentDidMount(){
        this.getMoviesData()
    }

    onClickButton = e =>{
        e.preventDefault()
        this.setState({openModal : true})
    }

    onCloseModal = ()=>{
        this.setState({openModal : false})
    }

    getMoviesData = async() =>{
        const url = 'https://hoblist.com/api/movieList'

        const response = axios.post(url, {
            category: 'movies',
            language: 'kannada',
            genre: 'all',
            sort: 'voting',
        });

        const data = await response
        // console.log(data.status)

        if(data.status === 200){
            this.setState({ moviesData : data.data.result})
        }
    }

    render(){
        const {moviesData} = this.state
        console.log(moviesData)

        const formatDate = (seconds) =>{
            const date = new Date(seconds * 1000);
            const options = { day: 'numeric', month: 'short' };
            const formattedDate = date.toLocaleDateString('en-US', options);

            return formattedDate
        }

        return(
            <div className="home-container">
                <nav className="menu-bar">
                    <button type='button' onClick={this.onClickButton} className="info-btn">Company Info</button>
                    <div>
                        <Modal open={this.state.openModal} onClose={this.onCloseModal}>
                            <p>Company: Geeksynergy Technologies Pvt Ltd</p>
                            <p>Address: Sanjayanagar, Bengaluru-56</p>
                            <p>Phone: XXXXXXXXX09</p>
                            <p>Email: XXXXXX@gmail.com</p>
                        </Modal>   
                    </div>
                </nav>
                <ul className="movies-list">
                    {moviesData.length > 0 ? (moviesData.map(item =>(
                        <>
                        <li key={item._id} className="list-item">
                            <div className="voting-section">
                                <BiSolidUpArrow />
                                {item.voting}
                                <BiSolidDownArrow />
                                <p>Votes</p>
                            </div>

                            <img src={item.poster} className="movie-poster" alt="movie" />

                            <div className="overview">
                                <p className="movie-title">{item.title}</p>
                                <p>Genre: {item.genre}</p>
                                <p>Director: {item.director[0]}</p>
                                <p>Starring: {item.stars[0]}</p>
                                <p>Mins|{item.language}|{ formatDate(item.releasedDate)}</p>
                                <p>{item.pageViews} Views| Voted by {item.voted.length} people</p>
                            </div>
                        </li><br />

                        <button type="button" className="trailer-btn">Watch Trailer</button>
                        <hr />
                        </>
                    ))) : null}
                </ul>
            </div>
        )
    }
}

export default Home