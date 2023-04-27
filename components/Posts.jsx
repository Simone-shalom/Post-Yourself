import React, { useEffect, useState } from 'react'
import SinglePost from './SinglePost'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'

const posts1= [
    {
        id: '123',
        username: 'Simonee',
        img: '/123144798_197534335143744_2691551469647162634_n.jpg',
        postImg: '/336593398_1344083199473229_3955415878418490588_n.png',
        caption: 'whats you path my lonely young kiddy '
    }
]


const Posts = () => {

  const [posts, setPosts] = useState([])

  useEffect(() => {

   onSnapshot(query(collection(db, 'posts-ig'),orderBy('timestamp', 'desc')), snapshot => {
      setPosts(snapshot.docs)
    });

   

  },[db])

  





  return (
    <div>
        {/*Single Posts */}
        {posts.map((post) => (
             <SinglePost 
                key={post.id} 
                id={post.id} 
                username={post.data().username} 
                img={post.data().profileImg}
                postImg={post.data().image}
                caption={post.data().caption}
              />
        ))}
        {/*Single Posts */}
        {/*Single Posts */}

    </div>
  )
}

export default Posts