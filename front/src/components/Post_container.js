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
            data: [],
            perPage: 8,
            currentPage: 0
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }
    receivedData() {
        axios.get(`http://localhost:5000/api/post/`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then(res => {

                const data = res.data;
                console.log(data)
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














// const post_container = () => {

//     fetch('http://localhost:5000/user/message')
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             }
//         })
//         .then(thread => {
//             console.log(thread)

//             for (const object of thread) {
//                 const post_main = document.querySelector('.post_main')
//                 const container = document.createElement('div')
//                 container.classList.add('container_post')

//                 const username = document.createElement('h4')
//                 username.classList.add('username')
//                 const username_data = object.User.username;
//                 username.innerText = username_data


//                 const title_thread = document.createElement('h2')
//                 title_thread.classList.add('title_post')
//                 title_thread.innerText = object.title;

//                 const message_thread = document.createElement('h3')
//                 message_thread.classList.add('content_post')
//                 message_thread.innerText = object.content;

//                 post_main.appendChild(container)
//                 container.appendChild(username)
//                 container.appendChild(title_thread)
//                 container.appendChild(message_thread)
//             }
//         })


//     return (
//         <div className='post_main'>
//             <div className="post_container">
//                 <div className="user_info_container">
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default post_container;