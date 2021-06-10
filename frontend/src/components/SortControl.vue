<template>
  <h5>Sort by: {{current}}</h5>
  <ul class="list-inline">
    <li class="list-inline-item" v-for="option in options" :key="option.name"><button class="btn btn-primary" v-on:click="current = option.name;emitSort(option.value)">{{option.name}}</button></li>
  </ul>
</template>

<script>
export default {
  name: "SortControl",
  emits: ["sort"],
  data() {
    return {
      options: [
        {name: "Latest", field: "uploadDate", direction: -1, value: "latest"},
        {name: "Oldest", field: "uploadDate", direction: 1, value: "oldest"},
        {name: "Score", field: "score", direction: -1, value: "score"},
        {name: "Favourite latest", field: "favouriteDate", direction: -1, value: "favouriteLatest"},
        {name: "Favourite oldest", field: "favouriteDate", direction: 1, value: "favouriteOldest"}
      ],
      current: this.$route.query.sort ? this.$route.query.sort : "latest"
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