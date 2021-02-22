import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAPKDnd7-yV9_5o46PmXId1_1nz-JvDSP0",
    authDomain: "chat-box-76ac3.firebaseapp.com",
    databaseURL: "https://chat-box-76ac3-default-rtdb.europe-west1.firebasedatabase.app",
})

const base = Rebase.createClass(firebase.database())

export { firebaseApp }

export default base
