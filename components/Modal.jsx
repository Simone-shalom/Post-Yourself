import React, { Fragment, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import { Dialog, Transition } from '@headlessui/react'
import { Camera } from '@phosphor-icons/react'
import {collection, addDoc, serverTimestamp, updateDoc, doc} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import {ref, getDownloadURL, uploadString} from 'firebase/storage'
import {db, storage} from '../firebase'

const Modal = () => {

  const [open, setOpen] = useRecoilState(modalState)
  const filePickerRef = useRef(null)
  const captionRef= useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(null)
  const {data: session} = useSession()

    const uploadPost = async () => {
        if(loading) return

        setLoading(true)

      // 1 create post add to firestore 'posts-ig
      // 2 get the post ID 
      // 3 upldoad Img to storage with post ID 
      // 4 get URL from storage and update post with img 

      const docRef = await addDoc(collection(db, 'posts-ig'), {
        username: session?.user.name,
        caption: captionRef.current.value,
        profileImg: session?.user.image,
        timestamp: serverTimestamp()
      })
     

      const imageRef = ref(storage, `posts-ig/${docRef.id}/image`)

      await uploadString(imageRef, selectedFile, 'data_url').then(async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef)
        await updateDoc(doc(db, 'posts-ig', docRef.id), {
          image: downloadURL
        })
      })
      setOpen(false)
      setLoading(false)
      setSelectedFile(null)
    }

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if(e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }
 


  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() =>setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xs transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-center text-gray-900"
                  >
                    Add Photo
                  </Dialog.Title>
                  {selectedFile ? (
                    <div className='flex justify-center'>
                      <img 
                        src={selectedFile} alt='' 
                        className=' w-full mt-3 rounded-xl object-contain cursor-pointer'
                        onClick={()=>setSelectedFile(null)}/>
                    </div>
                  ): (
                    <div className='flex justify-center mt-2'>
                    <div 
                      onClick={() => filePickerRef.current.click()}
                      className='flex justify-center items-center h-12 w-16 rounded-full bg-red-200 hover:bg-red-300 cursor-pointer  '>
                      <Camera size={32} color="#c12525" weight="bold" aria-hidden='true'/>
                    </div>
                  </div>
                  )}
                  
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <input 
                        ref={filePickerRef}
                        type='file'
                        hidden
                        onChange={addImageToPost}/>
                    </p>
                  </div>

                  <div className='mt-2 '>
                    <input 
                      className='border-none focus:outline-none w-full text-center'
                      type='text'
                      placeholder='Enter a caption...'
                      ref={captionRef}
                      />
                  </div>

                  <div className="mt-4 flex justify-center ">
                    <button
                      type="button"
                      disabled={!selectedFile}
                      className="flex items-center w-full justify-center rounded-md border border-transparent bg-red-400   py-2 text-sm font-medium text-black-900 hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={uploadPost}
                    >
                    {loading ? 'Loading' : 'Upload Post'}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Modal