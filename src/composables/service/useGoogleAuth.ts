import { useAuthStore } from "@/stores/auth";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "vue-router";

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
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;
        const user = result.user;
        return user
        
      })
      .then(async user => {
        if(user){
          setUser(user)
          localStorage.setItem('user_id', user.uid)
          await router.replace({name: 'home'})
          
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.log(error);
    });
  };


  return {
    authViaGoogle,
  }
};
