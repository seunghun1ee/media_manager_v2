<template>
  <form class="mb-3" v-on:submit="onSubmit">
    <div class="mb-3">
      <input class="form-control" type="text" name="keyword" required placeholder="Search" v-model="tagStrings">
    </div>
    <button type="submit" class="btn btn-success">Search</button>
  </form>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      tagStrings: "",
      tags: []
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.tags = this.tagStrings.toLowerCase().split(" ");
      this.$router.push({ path: "/search", query: { tags: this.tags}});
    }
  }
}
</script>

<style scoped>

</style>