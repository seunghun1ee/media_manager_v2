<template>
  <SortControl v-on:sort="onSort"></SortControl>
  <ItemList v-bind="{pageName: pageName, items: items}"></ItemList>
</template>

<script>
import {getAllMetadatas, getAllMetadatas2} from "@/repository";
import ItemList from "@/components/ItemList";
import SortControl from "@/components/SortControl";

export default {
  name: "AllItems",
  components: {SortControl, ItemList},
  data() {
    return {
      pageName: "All Items",
      items: []
    }
  },
  created() {
    getAllMetadatas()
        .then(data => this.items = data)
        .catch(err => {
          alert(err);
          console.error(err);
        })
  },
  methods: {
    onSort(field, direction) {
      getAllMetadatas2(field,direction)
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