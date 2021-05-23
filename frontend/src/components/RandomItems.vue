<template>
  <ItemList v-bind="{pageName: pageName, items: items}"></ItemList>
</template>

<script>
import ItemList from "@/components/ItemList";
import {getRandomMetadatas} from "@/repository";

export default {
  name: "RandomItems",
  components: {ItemList},
  data() {
    return  {
      pageName: "Random files",
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