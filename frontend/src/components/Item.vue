<template>
  <h2 :key="itemData.name">{{itemData.name}}</h2>
  <small>{{dateTime}}</small>
  <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" id="favouriteInput">
    <label class="form-check-label" for="favouriteInput">Favourite</label>
  </div>
  <div>
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-success">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
          <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
        </svg>
      </button>
      <button type="button" class="btn btn-danger">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
          <path d="M0 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1z"/>
        </svg>
      </button>
    </div>
    <span class="ms-3">{{counterName}}: {{itemData.score}}</span>
  </div>
  <p v-for="file in itemData.files" :key="file"><a v-bind:href="'/files/'+file"><img v-bind:src="'/files/'+file"></a></p>
  <p>{{itemData.memo}}</p>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags-fill me-1" viewBox="0 0 16 16">
    <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
    <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z"/>
  </svg>
  <a>Tags</a>
  <ul class="list-inline">
    <li v-for="tag in itemData.tags" :key="tag" class="list-inline-item">
      <a v-bind:href="'/tags/'+tag">{{tag}}</a>
    </li>
  </ul>
  <a class="btn btn-primary">Edit</a>

</template>

<script>
import {getMetadataById} from "@/repository";

export default {
  name: "Item",
  data() {
    return {
      itemData: {},
      dateTimeFormat: {
        dateStyle: "medium",
        timeStyle: "medium"
      },
      dateTime: null,
      counterName: process.env.VUE_APP_COUNTER_NAME
    }
  },
  created() {
    getMetadataById(this.$route.params.id)
        .then(data => {
          this.itemData = data;
          this.dateTime = Intl.DateTimeFormat("en-GB",this.dateTimeFormat).format(new Date(this.itemData.uploadDate));
        })
        .catch(err => {
          alert(err);
          console.error(err);
        });

  }
}
</script>

<style scoped>

</style>