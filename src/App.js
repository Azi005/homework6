import {useState, useEffect} from 'react';

import AddPost from './components/addPost';
import Post from './components/post';

function App() {
  const [posts, setPosts] = useState([]);
  
  const fetchPosts = () => {
    fetch("https://cataas.com/api/cats?limit=10&skip=0")
      .then((response) => response.json())
      .then((data) => setPosts(data))
  }
 
 useEffect(() => {
      fetchPosts()
   }, []);
   
  const addPost = (title, body) => {
    fetch('https://cataas.com/api/cats', {
      method: 'POST',
      body: JSON.stringify({
          title: title,
          body: body,
          userId: Math.random()
      }),
       headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setPosts((prevPosts) => [data, ...prevPosts])
    })
  };
   
  const deletePost = (id) => {
    fetch(`https://cataas.com/api/cats/${id}`, {
      method: 'DELETE'
    })
    .then((response) => {
      if(response.status === 10) {
        setPosts(
          posts.filter((post) => {
            return post._id !== id;
          })
        )
      }
    })
  };
   
  return (
    <main>
    <h1>Consuming REST api tutorial</h1>
      <AddPost addPost={addPost}/>
      <section className="posts-container">
      <h2>Posts</h2>
        {posts.map((post) => 
          <Post 
            key={post._id} 
            id={post._id}
            title={post.tags} 
            body={post.body} 
            deletePost={deletePost}
          />
        )}
      </section>
   </main>
  )
}

export default App;