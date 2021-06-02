<template>
  <h3 class="mb-3">All Items</h3>
  <SortControl v-on:sort="onSort"></SortControl>
  <hr>
  <ItemList v-bind="{items: items}"></ItemList>
</template>

<script>
import {getAllMetadatas} from "@/repository";
import ItemList from "@/components/ItemList";
import SortControl from "@/components/SortControl";

export default {
  name: "AllItems",
  components: {SortControl, ItemList},
  data() {
    return {
      items: []
    }
  },
  created() {
    getAllMetadatas("uploadDate",-1)
        .then(data => this.items = data)
        .catch(err => {
          alert(err);
          console.error(err);
        })
  },
  methods: {
    onSort(field, direction) {
      getAllMetadatas(field,direction)
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