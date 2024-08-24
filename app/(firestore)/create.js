import {addDoc, getFirestore} from 'firebase/firestore'
import app from './../../firebaseConfig'


const db = getFirestore(app)
const habitsCollections  = (db,'habits')

const createHabit = async(data) => {
    return await addDoc(habitsCollections)
}