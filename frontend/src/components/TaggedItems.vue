<template>
  <div class="mb-3">
    <TagTitle v-bind:tag-data="tagData"></TagTitle>
  </div>
  <SortControl v-on:sort="onSort"></SortControl>
  <hr>
  <ItemList v-bind="{items: items}"></ItemList>
</template>

<script>
import ItemList from "@/components/ItemList";
import {getMetadatasByTags, getTagByValue} from "@/repository";
import SortControl from "@/components/SortControl";
import TagTitle from "@/components/TagTitle";

export default {
  name: "TaggedItems",
  components: {TagTitle, SortControl, ItemList},
  data() {
    return  {
      tagData: null,
      items: []
    }
  },
  created() {
    getTagByValue(this.$route.params.tag)
        .then(data => {
          this.tagData = data;
        })
        .catch(err => {
          alert(err);
          console.error(err);
        })
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