import "./App.css";
import app from "./config/firebase-config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
const axios = require('axios').default;

function App() {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    onAuthStateChanged(getAuth(app), async (userCred) => {
      if (userCred) {
        setAuth(true);
        if(token != '') {
          const res = await fetchData()
          console.log(res)
        }
      }
    });
  }, []);

  const LoginWithGoogle = async () => {
    const res = await signInWithPopup(getAuth(app), new GoogleAuthProvider());
    if (res) {
      setAuth(true);
      const token = await res.user.getIdToken();
      setToken(token);
    };
  };
  //#region 
  const SignUpWithEmail = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    try {
      const userCred = await createUserWithEmailAndPassword(
        getAuth(app),
        email,
        password
      );   
      // const userName = prompt("Enter you display name");
      // let user = auth.currentUser;
      // user.displayName = userName;
      // auth.updateCurrentUser(user)
      if (userCred) {
        userCred.user.getIdTokenResult().then(token => {
          setToken(token)
        })
        setEmail("");
        setPassword("");
        setAuth(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const SignInWithEmail = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(
        getAuth(app),
        email,
        password
      );
      if(userCred) {
        const token = await userCred.user.getIdTokenResult();
        console.log(userCred.user)
        setEmail("")
        setPassword("")
        setAuth(true)
      }
    } catch (error) {
      console.log(error);
    }
  };
  //#endregion
  
  const UpdateEmail = (e) => {
    setEmail(e.target.value);
  };

  const UpdatePw = (e) => {
    setPassword(e.target.value);
  };

  const SignOut = async () => {
    try {
      await signOut(getAuth(app));
      setAuth(false);
      console.log("Sign out!!")
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async() => {
    const res = await axios({
      method: 'post',
      url: 'http://localhost:5000/api/user',
      headers:{
        authorization: "Bearer " + token
      }
    })
    return res;
  }

  return (
    <div className="App">
      {auth ? (
        <div id="Protected-container">
          <h1>Authenticate successfully!</h1>
          <button id="Sign-out" onClick={SignOut}>
            Sign out
          </button>
        </div>
      ) : (
        <div id="auth-container">
          <h1>Authentication</h1>
          <button onClick={LoginWithGoogle}>Login with google</button>
        </div>
      )}
    </div>
  );
}

export default App;
