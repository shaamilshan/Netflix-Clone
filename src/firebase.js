
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut}  from "firebase/auth"
import {addDoc, collection, getFirestore}  from "firebase/firestore"
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDJ8phxgI474Qx-U8JOUXmArtxdM63IyEo",
  authDomain: "netflix-clone-52b49.firebaseapp.com",
  projectId: "netflix-clone-52b49",
  storageBucket: "netflix-clone-52b49.appspot.com",
  messagingSenderId: "225017324685",
  appId: "1:225017324685:web:679b8bfb6c4e1ed6806ec4"
};


const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db=getFirestore(app)

const signup = async (name, email, password)=>{
     try{
       const res  = await createUserWithEmailAndPassword(auth,email,password)
        const user = res.user
        await addDoc(collection(db, "user"),{
          uid:user.uid,
          name,
          authProvider : "local",
          email,
        })
     }catch(error){
      console.log(error)
      toast.error(error.code.split('/')[1].split('-').join(" "))
     }
}


const login = async (email,password)=>{
  try{
    await signInWithEmailAndPassword(auth,email,password)
  }catch(error){
    console.log(error)
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
}

const logout = ()=>{
  signOut(auth)
}

export {auth,db,login,signup,logout}