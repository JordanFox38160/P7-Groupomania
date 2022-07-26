import React from 'react';
import Axios from 'axios'
import { useParams } from 'react-router-dom';

const CommentContainer = () => {

    const params = useParams();
    const postId = params.postId
    Axios.get('http://localhost:5000/api/post/' + postId)
        .then(res => {
            const data = res.data

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

                const imgContainer = document.createElement('img')
                imgContainer.classList.add('img_div_comment')
                imgContainer.src = data.picture


                section.appendChild(postContainer)
                postContainer.appendChild(pseudoPost)
                postContainer.appendChild(title)
                postContainer.appendChild(message)
                postContainer.appendChild(imgContainer)
            }

            const dataComment = data.comments
            if (dataComment) {
                for (let object in dataComment) {
                    const comments = dataComment[object];

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
            <section className="container_comment" >

            </section >
        </div >
    );
};

export default CommentContainer;    