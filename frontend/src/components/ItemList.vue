<template>
  <h2>{{pageName}}</h2>
  <hr>
  <article class="mb-3" v-for="item in items" :key="item.id">
    <h3><a class="text-decoration-none" v-bind:href="'/media/'+item.id">{{item.name}}</a></h3>
    <span>{{item.date}}</span>
    <span>Favorite: {{item.favorite}}</span>
    <p><a v-bind:href="'/files/'+item.file"><img class="img-fluid" v-bind:src="'/files/'+item.file" v-bind:alt="item.name"></a></p>
    <p class="mb-5">{{item.memo}}</p>
  </article>
</template>

<script>
export default {
  name: "ItemList",
  data() {
    return {
      pageName: "Random files",
      items: [
        {id: 0, name: "first", file:"asldkfj.jpg", memo:"first file", favorite: true, date: Date.now()},
        {id: 1, name: "Second", file:"asldkfj.jpg", memo:"second file", favorite: false, date: Date.now()}
      ]
    }
  },
  created() {

  }
}
</script>

<style scoped>

</style>