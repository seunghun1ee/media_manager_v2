<template>
  <h1><a class="text-decoration-none" href="/">{{title}}</a></h1>
  <h3 v-for="menu in menus" :key="menu.name"><a class="text-decoration-none" v-bind:href="menu.path">{{menu.name}}</a></h3>
  <SearchBar></SearchBar>
</template>

<script>
import SearchBar from "@/components/SearchBar";
export default {
  name: "Navigation",
  components: {SearchBar},
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