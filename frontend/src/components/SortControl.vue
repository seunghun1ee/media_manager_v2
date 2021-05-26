<template>
  <hr>
  <h4>Sort by</h4>
  <ul class="list-inline">
    <li class="list-inline-item" v-for="option in options" :key="option.name"><button class="btn btn-primary" v-on:click="emitSort(option.field,option.direction)">{{option.name}}</button></li>
  </ul>
</template>

<script>
export default {
  name: "SortControl",
  data() {
    return {
      options: [
        {name: "Latest", field: "uploadDate", direction: -1},
        {name: "Oldest", field: "uploadDate", direction: 1},
        {name: "Score", field: "score", direction: -1},
        {name: "Favourite latest", field: "favoriteDate", direction: -1},
        {name: "Favourite oldest", field: "favoriteDate", direction: 1}
      ]
    }
  },
  methods: {
    emitSort(field,direction) {
      this.$emit("sort",field,direction);
    }
  }
}
</script>

<style scoped>

</style>