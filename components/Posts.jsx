import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase"
import Post from "./Post"
// const posts = [
//   {
//     id: '123',
//     username: 'tommy',
//     userImg: 'https://links.papareact.com/3ke',
//     img: 'https://links.papareact.com/3ke',
//     caption: 'This is dummy This is dummy data data This is dummy data This is dummy data This is dummy data'
//   },
//   {
//     id: '123',
//     username: 'tommy',
//     userImg: 'https://links.papareact.com/3ke',
//     img: 'https://links.papareact.com/3ke',
//     caption: 'This is dummy This is dummy data data This is dummy data This is dummy data This is dummy data'
//   }
// ]
function Posts() {
  const [posts, setPosts] = useState([])

  useEffect(()=> {
    onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
      setPosts(snapshot.docs);
    })
  },[db])

  console.log(posts);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          uid={post.data().uid}
          caption={post.data().caption}
          timestamp={post.data().timestamp}
        />
      ))}
    </div>
  )
}

export default Posts
