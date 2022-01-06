import { BookmarkAltIcon, BookmarkIcon, ChatIcon, DotsHorizontalIcon, EmojiHappyIcon, EmojiSadIcon, HeartIcon, PaperAirplaneIcon } from "@heroicons/react/outline"

import {HeartIcon as HeartIconFilled, TrashIcon} from '@heroicons/react/solid'

import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";

import { db } from "../firebase";

import { useSession } from "next-auth/react"

import { useEffect, useState } from "react";

import Moment from "react-moment";

import { useRecoilState } from "recoil";
import { modalDeleteState } from "../atoms/modalAtom";
import ModalDelete from "./ModalDelete";

function Post({ id, username, userImg, uid, img, caption, timestamp }) {
  const {data: session} = useSession();

  // モーダル削除
  const [open, setOpen] = useRecoilState(modalDeleteState);

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  // コメント機能
  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment('');

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp()
    })
  }

  useEffect(()=> {
    onSnapshot(
      query(
        collection(db, 'posts', id, 'comments'),
        orderBy('timestamp', 'desc')
      ), (snapshot) => setComments(snapshot.docs)
    ),
    [db, id]
  })

  // いいね機能
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.id));
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session.user.id), {
        username: session.user.username,
        timestamp: serverTimestamp(),
      });
    }
  };

  useEffect(() =>
    onSnapshot(
      query(
        collection(db, 'posts', id, 'likes'),
        orderBy('timestamp', 'desc')
      ), (snapshot) => setLikes(snapshot.docs)
    ),
    [db, id]
  );

  useEffect(() => {
    setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.id) !== -1
    ),
    [likes]
  });

  const [loading, setLoading] = useState(null);

	const deletePost = async (id, res) => {
		setLoading(true);
    if ( confirm('この投稿を削除します')) {
      await deleteDoc(doc(db, "posts", id));
      setLoading(false);
    } else {
      alert('削除をキャンセルしました')
    }

	};

  return (
    <div className="relative bg-white my-7 border rounded-sm">

      {/* Header */}
      <div className="flex items-center p-5">
        <img className="h-12 w-12 rounded-full object-contain border p-1 mr-3" src={userImg} alt="" />
        <p className="flex-1 font-bold">{username}</p>
        {/* <Moment fromNow className="text-sm pr-5">
          {timestamp.toDate()}
        </Moment> */}
      </div>

      {/* Image */}
      <div className="flex items-center justify-center pt-6 pb-6 p-24 lg:p-44 lg:-mb-44 lg:-mt-44">
        <img className="" src={img} />
      </div>

      {/* IconsButton */}
      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4">
          {/* いいね */}
          {hasLiked? (
            <HeartIconFilled onClick={likePost} className="btn text-red-500"/>
          ) : (
            <HeartIcon onClick={likePost} className="btn"/>
          )}
          {/* コメント */}
          <ChatIcon className="btn"/>
          {/* 削除 */}
          {!session && (
            null
          )}
          {session && username === session.user.username && (
            <>
            <TrashIcon onClick={()=>deletePost(id)} className="btn"/>
            {/* <ModalDelete img={img} id={id} /> */}
            </>
          )}
        </div>
      </div>

      {/* Caption */}
        <div>
          <p className="p-5 truncate">
            {likes.length > 0 && (
              <p className="font-bold mb-1">{likes.length} likes</p>
            )}
            <span className="font-bold mr-1">{username}</span>
            {caption}
          </p>
        </div>

      {/* Comments Area */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment)=>(
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                className="h-7 rounded-full"
                src={comment.data().userImage} alt=""
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().username}</span>
                <span className="ml-3">{comment.data().comment}</span>
              </p>
              {/* 投稿日時
                Momentはmoment-react, moment二つ入れる(install)
               */}
              <Moment fromNow className="text-sm pr-5">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* Comment Input */}
        <form className="flex items-center p-2">
          <EmojiHappyIcon className="h-7" />
          <input value={comment} onChange={(e)=> setComment(e.target.value)} type="text" placeholder="Add a comment..." className="border-none flex-1 focus:ring-0 outline-none"/>
          <button type="submit" onClick={()=>sendComment()} className="font-semibold text-blue-400">Post</button>
        </form>
    </div>
  )
}

export default Post
