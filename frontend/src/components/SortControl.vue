<template>
  <hr>
  <h4>Sort by</h4>
  <ul class="list-inline">
    <li class="list-inline-item" v-for="option in options" :key="option.name"><a v-bind:href="option.url">{{option.name}}</a></li>
  </ul>
</template>

<script>
export default {
  name: "SortControl",
  data() {
    return {
      options: [
        {name: "Latest", url: "?sortField=uploadDate&direction=-1"},
        {name: "Oldest", url: "?sortField=uploadDate&direction=1"},
        {name: "Score", url: "?sortField=score&direction=-1"},
        {name: "Favourite latest", url: "?sortField=favoriteDate&direction=-1"},
        {name: "Favourite oldest", url: "?sortField=favoriteDate&direction=1"}
      ]
    }
  }
}
</script>

<style scoped>

</style>