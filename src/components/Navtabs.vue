
<template>
  <div class="header">
    <div class="">
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <DisclosureButton class="inline-flex items-center bg-gray-500 justify-center p-2 rounded-md  hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span class="sr-only">Open main menu</span>
              <div v-if="!open"  class="block h-6 w-6" aria-hidden="true" >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <div v-else class="block h-6 w-6" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              </div>
            </DisclosureButton>
          </div>
          <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex-shrink-0 flex items-center">
              <img class="block h-8 w-auto" src="../assets/logo.png" alt="Workflow" />
              <h2 class="hidden md:block px-2 text-lg font-extrabold tracking-tight text-gray-500 sm:text-lg">
                <span class="block text-white	">Petite Annonce de L'EMSE</span>
              </h2>
            </div>
            <div class="hidden sm:block sm:ml-6">
              <div class="flex space-x-4">
                <a href="/" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
                <a v-if="isLoggedIn" href="/downTown" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">DownTown</a>
                <a v-if="isLoggedIn" href="/requests" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Requests</a>
                <a v-if="isLoggedIn" href="/confessions" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Confessions</a>
                <a v-if="!isLoggedIn" href="/sign-in" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Login</a>
                <a v-if="!isLoggedIn" href="/register" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Register</a>
              </div>
            </div>
          </div>
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            <!-- Profile dropdown -->
            <Menu v-if="isLoggedIn" as="div" class="ml-3 relative">
              <div>
                <MenuButton class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" v-bind:src="image" alt="" />
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem v-if="isLoggedIn" v-slot="{ active }">
                  <p href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"><Strong>{{username}}</Strong></p>
                  </MenuItem>
                  <MenuItem v-if="isLoggedIn" v-slot="{ active }">
                    
                    <a @click="signOut" href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Sign out</a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel class="sm:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a href="/" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
          <a v-if="isLoggedIn" href="/downTown" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">DownTown</a>
          <a v-if="isLoggedIn" href="/requests" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Requests</a>
          <a v-if="isLoggedIn" href="/confessions" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Confessions</a>
          <a v-if="!isLoggedIn" href="/sign-in" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Login</a>
          <a v-if="!isLoggedIn" href="/register" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Register</a>
        </div>
      </DisclosurePanel>
    </Disclosure>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'; // used for conditional rendering
  import * as fireauth from 'firebase/auth';
  import { useRouter } from 'vue-router';
  import {getAuth} from 'firebase/auth';
  import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
  import { useCookie } from 'vue-cookie-next'
 

  const auth = getAuth();
  const router = useRouter();
  const isLoggedIn = ref(false);
  const cookie = useCookie()
  const image = ref('https://eu.ui-avatars.com/api/')
  const username = ref('')
  var userdata = cookie.getCookie("user")

  // runs after firebase is initialized
  fireauth.onAuthStateChanged(auth, function(user) {
      if (user) { 
        isLoggedIn.value = true // if we have a user
        image.value = userdata.photoUrl
        username.value = userdata.username
      } else {
        isLoggedIn.value = false // if we do not
      }
  })
  
  const signOut = () => {
    fireauth.signOut(auth)
    cookie.removeCookie("user")
    router.push('/')
  }
</script>

