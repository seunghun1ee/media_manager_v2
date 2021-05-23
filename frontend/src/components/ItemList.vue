<template>
  <h2>{{pageName}}</h2>
  <hr>
  <article class="mb-3" v-for="item in items" :key="item.id">
    <h3><a class="text-decoration-none" v-bind:href="'/media/'+item.id">{{item.name}}</a></h3>
    <span>{{item.uploadDate}}</span>
    <span>Favorite: {{item.favorite}}</span>
    <p><a v-bind:href="'/files/'+item.files[0]"><img class="img-fluid" v-bind:src="'/files/'+item.files[0]" v-bind:alt="item.name"></a></p>
    <p class="mb-5">{{item.memo}}</p>
  </article>
</template>

<script>
import {getRandomMetadatas} from "@/repository";

export default {
  name: "ItemList",
  data() {
    return {
      pageName: "Random files",
      items: []
    }
  },
  created() {
    getRandomMetadatas(3).then(data => {
      this.items = data;
    }).catch(err => {
      alert(err);
      console.err(err);
    });
  }
}
</script>

<style scoped>

</style>