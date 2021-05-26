<template>
  <ItemList v-bind="{pageName: pageName, items: items}"></ItemList>
</template>

<script>
import {getFavouriteMetadatas} from "@/repository";
import ItemList from "@/components/ItemList";

export default {
  name: "FavouriteItems",
  components: {ItemList},
  data() {
    return {
      pageName: "Favourites",
      items: []
    }
  },
  created() {
    getFavouriteMetadatas()
        .then(data => this.items = data)
        .catch(err => {
          alert(err);
          console.error(err);
        });
  }
}
</script>

<style scoped>

</style>