<template>
  <h3 class="mb-3">Favourite Items</h3>
  <SortControl v-on:sort="onSort"></SortControl>
  <hr>
  <ItemList v-bind="{items: items}"></ItemList>
</template>

<script>
import {getFavouriteMetadatas} from "@/repository";
import ItemList from "@/components/ItemList";
import SortControl from "@/components/SortControl";

export default {
  name: "FavouriteItems",
  components: {SortControl, ItemList},
  data() {
    return {
      items: []
    }
  },
  created() {
    getFavouriteMetadatas("favouriteDate",-1)
        .then(data => this.items = data)
        .catch(err => {
          alert(err);
          console.error(err);
        });
  },
  methods: {
    onSort(field, direction) {
      getFavouriteMetadatas(field,direction)
          .then(data => this.items = data)
          .catch(err => {
            alert(err);
            console.error(err);
          })
    }
  }
}
</script>

<style scoped>

</style>