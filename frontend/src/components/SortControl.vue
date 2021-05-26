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
        {name: "Latest", url: "#"},
        {name: "Oldest", url: "#"},
        {name: "Score", url: "#"}
      ]
    }
  }
}
</script>

<style scoped>

</style>