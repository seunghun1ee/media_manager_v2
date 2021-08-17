<template>
  <Loading v-if="isLoading"></Loading>
  <h2 :key="itemData.name">{{itemData.name}}</h2>
  <small>{{dateTime}}</small>
  <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" id="favouriteInput" v-on:click="onFavClicked" v-bind:checked="itemData.favourite">
    <label class="form-check-label" for="favouriteInput">Favourite</label>
  </div>
  <div>
    <div class="btn-group" role="group">
      <button id="incButton" type="button" class="btn btn-success" v-on:click="onScoreIncClicked">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
          <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
        </svg>
      </button>
      <button id="decButton" type="button" class="btn btn-danger" v-on:click="onScoreDecClicked">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
          <path d="M0 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1z"/>
        </svg>
      </button>
    </div>
    <span class="ms-3">{{counterName}}: {{itemData.score}}</span>
  </div>
  <p v-for="file in itemData.files" :key="file"><a v-bind:href="'/files/'+file"><img class="img-fluid" v-bind:src="'/files/'+file"></a></p>
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
  <a class="btn btn-primary" v-bind:href="'/edit/' + $route.params.id">Edit</a>

</template>

<script>
import {getMetadataById, toggleFavouriteById, incScoreById, decScoreById} from "@/repository";
import Loading from "@/components/Loading";

export default {
  name: "Item",
  components: {Loading},
  data() {
    return {
      itemData: {},
      dateTimeFormat: {
        dateStyle: "medium",
        timeStyle: "medium"
      },
      dateTime: null,
      counterName: process.env.VUE_APP_COUNTER_NAME,
      isLoading: true
    }
  },
  created() {
    getMetadataById(this.$route.params.id)
        .then(data => {
          this.itemData = data;
          this.dateTime = Intl.DateTimeFormat("en-GB",this.dateTimeFormat).format(new Date(this.itemData.uploadDate));
          this.isLoading = false;
        })
        .catch(err => {
          alert(err);
          console.error(err);
        });
  },
  methods: {
    onFavClicked() {
      toggleFavouriteById(this.itemData.id).then(isToggled => {
        if(isToggled) {
          this.itemData.favourite = !this.itemData.favourite;
        }
      }).catch(err => {
        alert(err);
        console.error(err);
      })
    },
    onScoreIncClicked() {
      incScoreById(this.itemData.id).then(isInced => {
        if(isInced) {
          this.itemData.score++;
        }
      }).catch(err => {
        alert(err);
        console.error(err);
      })
    },
    onScoreDecClicked() {
      decScoreById(this.itemData.id).then(isDeced => {
        if(isDeced) {
          this.itemData.score--;
        }
      }).catch(err => {
        alert(err);
        console.error(err);
      })
    }
  }
}
</script>

<style scoped>

</style>