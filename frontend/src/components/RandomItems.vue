<template>
  <h3 class="mb-3">Random Items</h3>
  <ItemList v-bind="{items: items}"></ItemList>
</template>

<script>
import ItemList from "@/components/ItemList";
import {getRandomMetadatas} from "@/repository";

export default {
  name: "RandomItems",
  components: {ItemList},
  data() {
    return  {
      items: []
    }
  },
  created() {
    getRandomMetadatas(3).then(data => this.items = data)
        .catch(err => {
          alert(err);
          console.error(err);
        })
  }
}
</script>

<style scoped>

</style>