<template>
  <h2>{{pageName}}</h2>
  <hr>
  <article class="mb-3" v-for="item in items" :key="item.id">
    <h3><a class="text-decoration-none" v-bind:href="'/items/'+item.id">{{item.name}}</a></h3>
    <span>{{item.uploadDate}}</span>
    <span>Favorite: {{item.favorite}}</span>
    <p><a v-bind:href="'/files/'+item.files[0]"><img class="img-fluid" v-bind:src="'/files/'+item.files[0]" v-bind:alt="item.name"></a></p>
    <p class="mb-5">{{item.memo}}</p>
  </article>
</template>

<script>

export default {
  name: "ItemList",
  props: {
    pageName: String,
    items: Array
  }
}
</script>

<style scoped>

</style>