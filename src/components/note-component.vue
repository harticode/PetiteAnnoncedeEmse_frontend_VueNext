<template>
    <div class="note shadow-2xl rounded-md">
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image">
              <img class='rounded-full' :src="note.user.photoUrl">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p><strong>{{note.user.username}}</strong> <small>{{timeSince(note.dateofPost)}}</small></p>
              <p>{{note.contentOfTheNote}}</p>
            </div>
          </div>
        </article>
        <div v-if="note.user.username === user.username"  class="deletebutton">
              <button 
            class="block text-center bg-red-400 border border-transparent rounded-full mx-2 py-1 px-3 text-white hover:bg-red-700" 
            type="button"
            @click="deleteNote">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </div>
      </div>
    </div>
</template>

<script>
import "./note-component.css";
import NotesServices from "../services/NotesServices.js"



export default {
    props: {
    note: Object,
    user: Object
  },
  methods: {
    deleteNote(){
      NotesServices.delete(this.note.id).then(() => {
      this.$router.go()
      });
    },
    timeSince(date) {
      var seconds = Math.floor((new Date() - (date*1000)) / 1000);
      var interval = seconds / 31536000;
      if (interval > 1) {
        return Math.floor(interval) + " years ago";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " months ago";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " days ago";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hours ago";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
      }
      return Math.floor(seconds) + " seconds ago";
    }
  },
}
</script>
