<template>
    <div class="note shadow-2xl rounded-md">
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image">
              <img class='rounded-full' src="https://eu.ui-avatars.com/api/?name=An&size=1000&background=8B0000">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p><strong>Confession N#{{note.id}}</strong> <small>{{timeSince(note.dateofPost)}}</small></p>
              <p>{{note.contentOfTheConfession}}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
</template>

<script>
import "./note-component.css";



export default {
    props: {
    note: Object,
  },
  methods: {
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
  }
}
</script>
