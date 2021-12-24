<template>
  <div class="register overflow-hidden">
    <!-- Register component -->
    <!-- Container -->
    <div class="container mx-auto">
      <div class="flex justify-center px-6 my-5">
        <!-- Row -->
        <div class="w-full xl:w-3/4 lg:w-11/12 flex shadow-lg">
          <!-- Col -->
          <div
            class="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
            style="
              background-image: url('https://cdn-s-www.leprogres.fr/images/F54B1B92-3189-4FA1-840B-D9A7D0AD40C7/NW_raw/en-cinq-ans-mines-saint-etienne-a-augmente-de-37-ses-ressources-provenant-de-contrats-de-recherche-et-d-actions-de-transfert-vers-l-industrie-photo-d-archives-progres-yves-flammin-1631110980.jpg');
            "
          ></div>
          <!-- Col -->
          <div
            class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none"
          >
            <h3 class="pt-4 text-2xl text-center">Create Account</h3>
            <div class="p-5">
              <h3 class="text-center mb-2 font-semibold">Register with</h3>
            </div>
              <div class="mb-4">
                <label
                  class="block mb-2 text-sm font-bold text-gray-700"
                  for="username"
                >
                  Username
                </label>
                <input
                  class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  required
                  v-model="username"
                  placeholder="Username"
                />
              </div>
              <div class="mb-4">
                <label
                  class="block mb-2 text-sm font-bold text-gray-700"
                  for="email"
                >
                  Email
                </label>
                <input
                  class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  required
                  v-model="email"
                  placeholder="Email"
                />
              </div>
              <div class="mb-4">
                <label
                  class="block mb-2 text-sm font-bold text-gray-700"
                  for="password"
                >
                  Password
                </label>
                <input
                  class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  required
                  v-model="password"
                  placeholder="******************"
                />
              </div>

              <div class="mb-6 text-center">
                <div class="grid grid-cols-3 gap-1">
                  <button
                    type="button" 
                    class="w-full col-span-3  px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    @click="register"
                  >
                    Register Account
                  </button>
                  <div v-if="isLoading">
                    <Loading class="m-3 font-extrabold text-center" />
                  </div>
                </div>
              </div>
              <hr class="mb-6 border-t" />
              <div class="text-center">
                <router-link to="/sign-in"
                  ><a
                    class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  >
                    Already have an account? Login
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
  //import * as firebase from 'firebase/app'
  import * as fireauth from 'firebase/auth'
  import {getAuth} from 'firebase/auth'
  import Loading from "../components/Loading.vue";
  import { onBeforeUnmount } from 'vue'
  import { useRouter } from 'vue-router' // import router
  import UserServices from "../services/UserServices";
  import { useCookie } from 'vue-cookie-next'
  
  const auth = getAuth();
  const username = ref('');
  const email = ref('')
  const password = ref('')
  var isLoading = ref(false)
  const router = useRouter() // get a reference to our vue router
  const cookie = useCookie()
  



  const register = () => {
      isLoading.value = true;
      fireauth.createUserWithEmailAndPassword(auth, email.value, password.value) // need .value because ref()
      .then((data) => {
        console.log('Successfully registered!',data);
        const photoUrl = "https://eu.ui-avatars.com/api/?name="+username.value+"&size=1000";
        const user = {
          email:email.value,
          photoUrl: photoUrl,
          username:username.value
        };
        cookie.setCookie('user', user)
        UserServices.create(user).then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
        router.push('/home') // redirect to the home 
      })
      .catch(error => {
        console.log(error.code)
        alert(error.message);
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