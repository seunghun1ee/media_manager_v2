<template>
  <SortControl></SortControl>
  <ItemList v-bind="{pageName: pageName, items: items}"></ItemList>
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
  }
}
</script>

<style scoped>

</style>