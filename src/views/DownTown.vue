<template>
  <div class="bg-gray-50">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:text-center lg:justify-center">
      <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        <span class="block text-indigo-600">DownTown</span>
        <span v-if="!isLoggedIn" class="block text-indigo-600">This page is for users only</span>
      </h2>
    </div>
  </div>
  <div class="view block px-7  border-b border-teal-500 py-2">
    <textarea class="resize rounded-md appearance-nonemy-3 bg-white border-none w-full text-gray-700 mr-3 py-3 px-2 leading-tight focus:outline-none"
     type="text" 
     placeholder="Feel free to say what you want"
     id="noteDownTown"
     required
     v-model.trim="noteDownTown"
     aria-label="Full name"/>
    <button 
    class="inline-block text-center bg-indigo-400 border border-transparent rounded-md mx-3 py-2 px-8 font-medium text-white hover:bg-indigo-700" 
    type="button"
    @click="addNote">
      Post
    </button>
  </div>
  <div class="view">
    <notecomponent v-for="note in apidata" :note="note" :user="userdata" :key="note.id"/>
  </div>
</template>

<script setup>
  import * as fireauth from 'firebase/auth'
  import { ref } from 'vue' // used for conditional rendering
  import { useRouter } from 'vue-router'
  import { onBeforeUnmount, onMounted } from 'vue'
  import {getAuth} from 'firebase/auth'
  import notecomponent from "../components/note-component.vue"
  import NotesServices from "../services/NotesServices.js"
  import { useCookie } from 'vue-cookie-next'

  const cookie = useCookie()
  var userdata = cookie.getCookie("user")
  const auth = getAuth()
  const apidata = ref([])
  const router = useRouter()
  const isLoggedIn = ref(false)
  const noteDownTown = ref('')

  const authListener = fireauth.onAuthStateChanged(auth, function(user) {
      if (user) {
        isLoggedIn.value = true // if we have a user
      } else {
        isLoggedIn.value = false // if we do not
         router.push('/')
          alert('you must be logged in to view this. redirecting to the home page')
      }
  })
  onBeforeUnmount(() => {
      // clear up listener
      authListener()
  })

  onMounted(() => {
    NotesServices.findByType(0).then((response) => {
        apidata.value = response.data;
      });
  })

  const addNote = () => {
    const data = {"contentOfTheNote": noteDownTown.value,
                  "dateofPost": Math.round(+new Date()/1000),
                  "type": 0,
                  "user": userdata
                  }
    NotesServices.create(data).then(() => {
      router.go()
    });

  }
</script>