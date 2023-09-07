import { BookmarkSimple, ChatCircleDots,  DotsThree, HeartStraight, PaperPlaneTilt, Smiley } from '@phosphor-icons/react'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import Moment from 'react-moment'

const SinglePost = ({id, username, img, postImg, caption}) => {

  const {data: session} = useSession()
  const [comment, setComment] =  useState('')
  const [comments, setComments] =  useState([])
  const [likes, setLikes] =  useState([])
  const [hasLiked, setHasLiked]= useState(false)


  useEffect(() => {

    onSnapshot(query(collection(db, 'posts-ig', id, 'comments'), orderBy('timestamp', 'desc')), 
    snapshot => {setComments(snapshot.docs)
  })

},[id])

  useEffect(() => {
    onSnapshot(collection(db, 'posts-ig', id, 'likes'), snapshot => {
      setLikes(snapshot.docs)
    })
  },[id])


  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === session?.user.uid) !==-1)

  },[likes, session?.user.uid])



  const likesToPost = async () => {
    if(hasLiked){
      await deleteDoc(doc(db, 'posts-ig', id, 'likes', session.user.uid))
    }else {
      await setDoc(doc(db, 'posts-ig', id, 'likes', session.user.uid), {
        user: session.user.name,
  
        })
    }
    
  }


  const sendComment = async (e) => {
    e.preventDefault()

      const commentToSend = comment
      setComment('')

      await addDoc(collection(db, 'posts-ig', id, 'comments'), {
        comment: commentToSend,
        username: session.user.name,
        userImg: session.user.image,
        timestamp: serverTimestamp()
      })
  } 




  return (
    <div className='bg-white my-7 border rounded-e-sm'>
      {/*Header */}
      <div className='flex items-center p-5 '>
        <img src={img} className='w-12 h-12 rounded-full object-contain border p-1 mr-3'/>
        <p className='text-black flex-1 font-bold'>{username}</p>
        <DotsThree size={32} color="#1a1a1a" weight="bold" />

      </div>

      {/*img */}
      <img src={postImg} className='object-cover w-full h-[500px]'/>

      {/*Buttons */}
      {session && (
        <div className='flex justify-between px-4 pt-4'>
          <div className='flex space-x-4 '>
            {hasLiked ? (
              <HeartStraight 
              onClick={likesToPost}
              size={32} color="#FF0000" weight="fill" className='btn' />
            ) : (
              <HeartStraight 
              onClick={likesToPost}
              size={32} color="#1a1a1a" weight="bold" className='btn' />
            )}
           
            <ChatCircleDots size={32} color="#1a1a1a" weight="bold"  className='btn'/>
            <PaperPlaneTilt size={32} color="#1a1a1a" weight="bold" className='btn'/>
          </div>
          <BookmarkSimple size={32} color="#1a1a1a" weight="bold" className=' btn'/>
        </div>
      )}
      

      {/*Captions */}
      <div className='p-5 truncate flex flex-col items-left '>
        {likes.length > 0 && (
          <p className='font-bold text-sm  '>{likes.length} Likes</p>
        )}
        <div className='flex items-left'>
          <div className='font-bold text-md mr-3 mt-6'>{username}</div>
          <div className='mt-6'>{caption}</div>
        </div>
       
      </div>

      {/*Comments */}
      {comments.length > 0 && (
        <div className='ml-3 md:ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
          {comments.map((com) => { 
           return <div key={com.id} className='flex items-center space-x-2 mb-3'>
              <img src={com.data().userImg} className='h-7 rounded-full' alt=''/>
                  <p className='font-semibold'>{com.data().username}</p>{''}
                  <div>
                  <p className='mt-5 '>{com.data().comment}</p>
              
                  <Moment fromNow className='text-sm text-gray-600'>
                    {com.data().timestamp?.toDate()}
                  </Moment>
                  </div>
                 
            </div>
          })}
        </div>
      )}

      {/*input box*/}
      {session && (
        <form className='flex items-center p-4'>
        <Smiley size={32} color="#1a1a1a" weight="bold" className='cursor-pointer' />
        <input 
          value={comment}
          onChange={e => setComment(e.target.value)}
          type='text' placeholder='Add a comment... '
          className='border-none flex-1 focus:outline-none ml-3'/>
        <button 
          type='submit'
          disabled={!comment.trim()}
          onClick={sendComment}
          className='font-semibold text-blue-900 hover:scale-125'>Post</button>
      </form>
      )}
      

    </div>
  )
}

export default SinglePost