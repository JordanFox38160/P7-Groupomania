import React, { Component } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import ButtonCreatePost from './button_post'

//Pagination des post
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            perPage: 8,
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }
    receivedData() {
        axios.get(`http://localhost:5000/api/post/`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then(res => {

                const data = res.data;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const postData = slice.map(pd => <React.Fragment>
                    <div className='message-container' id={pd.userId}>
                        <p className='username'>{pd.pseudo}</p>
                        <p className='title'>{pd.title}</p>
                        <p className='message'>{pd.message}</p>
                        <div className="comment">
                            <ButtonCreatePost />
                        </div>
                    </div>
                </React.Fragment>)

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),

                    postData
                })
            });
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };

    componentDidMount() {
        this.receivedData()
    }
    render() {
        return (
            <div className='pagination_post'>
                {this.state.postData}
                <ReactPaginate
                    previousLabel={"Précédent"}
                    nextLabel={"Suivant"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
            </div>

        )
    }
}