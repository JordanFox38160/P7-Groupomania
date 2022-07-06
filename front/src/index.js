import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import "./styles/navigation.css"
import "./styles/style_form.css"
import "./styles/portal.css"
import './styles/profil_page.css'
import './styles/post_container.css'
import './styles/buttonCreatePost.css'
import './styles/container_create_post.css'
import './styles/footer.css'
import './styles/bio_container.css'

const root = ReactDOM.createRoot(document.getElementById('root')); //Ici on dit que toute notre application on la passe a root
root.render( //Ici on dit de faire un rendu de APP
  <React.StrictMode>
    <App />
  </React.StrictMode>
);