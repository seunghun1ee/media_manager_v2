<template>
  <h1><a class="text-decoration-none" href="/">{{title}}</a></h1>
  <h3 v-for="menu in menus" :key="menu.name"><a class="text-decoration-none" v-bind:href="menu.path">{{menu.name}}</a></h3>
  <form class="mb-3" method="get" action="/search">
    <div class="mb-3">
      <input class="form-control" type="text" name="keyword" required placeholder="Search">
    </div>
    <button class="btn btn-success">Search</button>
  </form>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      title: "Title",
      menus: [
        {name: "All", path: "/all"},
        {name: "Tag list", path: "/tags"},
        {name: "Tag manager", path: "/tag_manager"},
        {name: "Upload files", path: "/upload"},
        {name: "Favourites", path: "/favourites"},
      ]
    }
  },
  created() {
    this.title = process.env.VUE_APP_WEBSITE_TITLE;
  }
}
</script>

<style scoped>

</style>