<template>
  <SortControl v-on:sort="onSort"></SortControl>
  <ItemList v-bind="{pageName: pageName, items: items}"></ItemList>
</template>

<script>
import ItemList from "@/components/ItemList";
import {getMetadatasByTags} from "@/repository";
import SortControl from "@/components/SortControl";

export default {
  name: "TaggedItems",
  components: {SortControl, ItemList},
  data() {
    return  {
      pageName: "",
      items: []
    }
  },
  created() {
    this.pageName = this.$route.params.tag
    getMetadatasByTags([this.$route.params.tag],"uploadDate",-1).then(data => this.items = data)
        .catch(err => {
          alert(err);
          console.error(err);
        });
  },
  methods: {
    onSort(field, direction) {
      getMetadatasByTags([this.$route.params.tag],field,direction)
          .then(data => this.items = data)
          .catch(err => {
            alert(err);
            console.error(err);
          });
    }
  }
}
</script>

<style scoped>

</style>