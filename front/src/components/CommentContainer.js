import React from 'react';
import Axios from 'axios'
import { useParams } from 'react-router-dom';

const CommentContainer = () => {

    const params = useParams();
    const postId = params.postId
    Axios.get('http://localhost:5000/api/post/' + postId)
        .then(res => {
            const data = res.data
            console.log(data)
            const dataPseudo = data.pseudo

            if (data) {
                const section = document.querySelector('.container_comment');
                const postContainer = document.createElement('div')
                postContainer.classList.add('message-container')
                const pseudoPost = document.createElement('p');
                pseudoPost.innerText = data.pseudo
                pseudoPost.classList.add('username')
                const title = document.createElement('p');
                title.innerText = data.title
                title.classList.add('title')
                const message = document.createElement('p');
                message.innerText = data.message
                message.classList.add('message')

                section.appendChild(postContainer)
                postContainer.appendChild(pseudoPost)
                postContainer.appendChild(title)
                postContainer.appendChild(message)
            }

            const dataComment = data.comments
            if (dataComment) {
                for (let object in dataComment) {
                    const comments = dataComment[object];
                    console.log(comments)

                    const section = document.querySelector('.container_comment');
                    const article = document.createElement('article');
                    const pseudoComment = document.createElement('h1');
                    pseudoComment.innerText = comments.commenterPseudo
                    const textComment = document.createElement('p');
                    textComment.innerText = comments.text

                    section.appendChild(article)
                    article.appendChild(pseudoComment)
                    article.appendChild(textComment)

                }
            }
        })
    return (
        <div>
            <div className="container_comment" >
            </div >
        </div >
    );
};

export default CommentContainer;    