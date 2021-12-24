<template>
  <div class="login">
    <!-- Container -->
    <div class="container mx-auto">
      <div class="flex justify-center px-6 my-5">
        <!-- Row -->
        <div class="w-full xl:w-3/4 lg:w-11/12 flex shadow-lg">
          <!-- Col -->
          <div
            class="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
            style="
              background-image: url('https://source.unsplash.com/HOkjo9_NcN4/600x800');
            "
          ></div>
          <!-- Col -->
          <div
            class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none"
          >
            <h3 class="pt-4 text-2xl text-center">Welcome Back!</h3>
            <div class="p-5">
              <h3 class="text-center mb-2 font-semibold">Sign in with</h3>
            </div>
              <div class="mb-4">
                <label
                  class="block px-4 mb-2 text-sm font-bold text-gray-700"
                  for="username"
                >
                  Email
                </label>
                <input
                  class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  required
                  v-model.trim="email"
                  placeholder="Username"
                />
              </div>
              <div class="mb-4">
                <label
                  class="block px-3 mb-2 text-sm font-bold text-gray-700"
                  for="password"
                >
                  Password
                </label>
                <input
                  class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  required
                  v-model.trim="password"
                  placeholder="******************"
                />
              </div>

              <div class="mb-6 text-center">
                <div class="grid grid-cols-3 gap-1">
                  <button
                    type="button" 
                    class="w-full col-span-3 px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    @click="signIn"
                  >
                    Sign In
                  </button>
                  <div v-if="isLoading">
                    <Loading class="m-3 font-extrabold text-center" />
                  </div>
                </div>
              </div>
              <hr class="mb-6 border-t" />
              <div class="text-center">
                <router-link to="/register"
                  ><a
                    class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  >
                    Create an Account!
                  </a></router-link
                >
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import * as fireauth from 'firebase/auth'
  import { useRouter } from 'vue-router' // import router
  import {getAuth} from 'firebase/auth'
  import Loading from "../components/Loading.vue";
  import { onBeforeUnmount } from 'vue'
  import UserServices from '../services/UserServices.js'
  import { useCookie } from 'vue-cookie-next'
  
  const auth = getAuth()
  const email = ref('')
  const password = ref('')
  var isLoading = ref(false)
  const errMsg = ref() // ERROR MESSAGE
  const router = useRouter() // get a reference to our vue router
  const cookie = useCookie()

  const signIn = () => {
    isLoading.value=true; // we also renamed this method
    fireauth
      .signInWithEmailAndPassword(auth, email.value, password.value) // THIS LINE CHANGED
      .then((data) => {
        console.log('Successfully logged in!');
        UserServices.get(data.user.email).then((result) => {
          cookie.setCookie('user', result.data)
        }).catch((err) => {
          console.log(err);
        });
        router.push('/home') // redirect to the feed
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/invalid-email':
              errMsg.value = 'Invalid email'
              break
          case 'auth/user-not-found':
              errMsg.value = 'No account with that email was found'
              break
          case 'auth/wrong-password':
              errMsg.value = 'Incorrect password'
              break
          default:
              errMsg.value = 'Email or password was incorrect'
              break
        }
        console.log(errMsg.value);
        alert(errMsg.value);
        isLoading.value=false;
      });
  }
  const authListener = fireauth.onAuthStateChanged(auth, function(user) {
      if (user) {
        router.push('/downTown')
      }
  })

  onBeforeUnmount(() => {
      // clear up listener
      authListener()
  })
</script>