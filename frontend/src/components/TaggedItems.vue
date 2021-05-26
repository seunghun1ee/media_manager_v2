<template>
  <ItemList v-bind="{pageName: pageName, items: items}"></ItemList>
</template>

<script>
import ItemList from "@/components/ItemList";
import {getMetadatasByTags} from "@/repository";

export default {
  name: "TaggedItems",
  components: {ItemList},
  data() {
    return  {
      pageName: "",
      items: []
    }
  },
  created() {
    this.pageName = this.$route.params.tag
    getMetadatasByTags([this.$route.params.tag]).then(data => this.items = data)
        .catch(err => {
          alert(err);
          console.error(err);
        })
  }
}
</script>

<style scoped>

</style>