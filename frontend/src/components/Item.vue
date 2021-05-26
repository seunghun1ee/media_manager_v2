<template>
  <h2 :key="itemData.name">{{itemData.name}}</h2>
  <small>{{dateTime}}</small>
  <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" id="favouriteInput">
    <label class="form-check-label" for="favouriteInput">Favourite</label>
  </div>
  <div>
    <span class="me-3">{{counterName}}: {{itemData.score}}</span>
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-outline-success">+</button>
      <button type="button" class="btn btn-outline-danger">-</button>
    </div>
  </div>
  <p>Item</p>


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