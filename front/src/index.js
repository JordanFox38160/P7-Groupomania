import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/Index.css';
import App from './App';
import "./styles/Navigation.css"
import "./styles/FormStyle.css"
import "./styles/Portal.css"
import './styles/ProfilPage.css'
import './styles/PostContainer.css'
import './styles/ButtonCreatePost.css'
import './styles/ContainerCreatePost.css'
import './styles/Footer.css'
import './styles/BioContainer.css'
import './styles/CommentContainer.css'
import './styles/ButtonLike.css'


const root = ReactDOM.createRoot(document.getElementById('root')); //Ici on dit que toute notre application on la passe a root
root.render( //Ici on dit de faire un rendu de APP
  <App />
);