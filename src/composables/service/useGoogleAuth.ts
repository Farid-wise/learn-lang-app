import {useAuthStore} from "@/stores/auth";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useRouter} from "vue-router";

/**
 * A composable function that provides a method to authenticate the user with Google.
 *
 * It provides the `authViaGoogle` method which returns a promise that resolves with the user
 * object if the authentication is successful. If the authentication fails, it rejects with an
 * error object.
 *
 * @return {Object} Object containing the `authViaGoogle` method.
 **/
export const useGoogleAuth = () => {
  const { setUser } = useAuthStore();
  const provider = new GoogleAuthProvider();
  const router = useRouter()


  const authViaGoogle = async () => {
    const auth = getAuth();

    try {
      const result = await signInWithPopup(auth, provider)
      if(result.user){
        setUser(result.user)
        localStorage.setItem('user_id', result.user.uid)
        await router.replace({name: 'home'})
      }
    }
    catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      
      console.log(error);
    }
   
    
  
  
     
  };


  return {
    authViaGoogle,
  }
};


