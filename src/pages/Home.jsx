import React, { useEffect, useState } from "react";
import { FiPlus, FiSearch, FiTrash2, FiEdit3, FiUser } from "react-icons/fi";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useSelector } from "react-redux";
const Home = () => {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");
  const [title, setTitle] = useState("");
  const [cartColor , setCartColor] = useState('bg-white')
  const db = getDatabase();
  // ----------------- getting user info from the rdux
  const currentUserInfo = useSelector((state)=>state.currentUser.value)
  // ----------------- add note 
  const handelAddCard = ()=>{
    console.log(noteInput , title , cartColor)
    set(push(ref(db , 'notes/')) , {
      creastorId: currentUserInfo.uid,
      title:title,
      noteDetails:noteInput,
      cardColor:cartColor
    }).then(()=>{
      console.log('note added')
    })
  }
  // ---------------- get all notes by user id 
  useEffect(()=>{
    onValue(ref(db , 'notes/') , (myNotes)=>{
      let myArr = []

      myNotes.forEach((item)=>{
        if(currentUserInfo.uid == item.val().creastorId){
          myArr.push({key:item.key , notes:item.val()})
        }
      })
      setNotes(myArr)
    })
  },[])

  // --------------- deelete data
   const handelDelete = (noteItems)=>{
    // remove(ref(db , 'notes/' + noteId))
    console.log(noteItems)
    set(ref(db , 'binNotes/'+ noteItems.key),noteItems.notes)


   }




  return (
    <div className="min-h-screen bg-[#f9fafb] text-gray-800 flex flex-col">


      {/* Add Note Section */}
      <div className="flex justify-center mt-8">
        <div className={`w-[90%] sm:w-[500px] ${cartColor} shadow-md rounded-xl p-5 flex flex-col gap-3`}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="border-b border-gray-200 focus:outline-none text-gray-700 font-medium"
          />
          <textarea
            rows="3"
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder="Take a note..."
            className="resize-none border-none focus:outline-none text-gray-600"
          />
          <div className="flex  justify-between">
          <div className="flex gap-2">
            <button onClick={(()=>setCartColor('bg-red-500'))} className="w-5 h-5 rounded-full bg-red-200"></button>
            <button onClick={(()=>setCartColor('bg-blue-500'))} className="w-5 h-5 rounded-full bg-blue-200"></button>
            <button onClick={(()=>setCartColor('bg-pink-500'))} className="w-5 h-5 rounded-full bg-pink-200"></button>
            <button onClick={(()=>setCartColor('bg-purple-500'))} className="w-5 h-5 rounded-full bg-purple-200"></button>
          </div>

          <button
          onClick={handelAddCard}
            className="self-end flex items-center gap-1 bg-[#48CFCB] text-white px-4 py-2 rounded-md hover:bg-[#3dbbb7] duration-200"
          >
            <FiPlus /> Add
          </button>
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="p-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {notes.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 mt-16">
            No notes yet. Start by adding one above!
          </div>
        ) : (
          notes.map((item) => (
            <div
              key={item.key}
              className={` rounded-xl shadow-md p-4 relative hover:shadow-lg duration-200 ${item.notes.cardColor }`}
            >
              <h2 className="font-semibold text-lg mb-2 text-gray-800">{item.notes.title}</h2>
              <p className="text-gray-600 text-sm whitespace-pre-wrap">{item.notes.noteDetails}</p>
              <div className="absolute bottom-3 right-3 flex gap-3 text-gray-400">
                <FiEdit3 className="cursor-pointer hover:text-[#48CFCB]" />
                <FiTrash2
                onClick={()=>handelDelete(item)}
                  className="cursor-pointer hover:text-red-500"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
