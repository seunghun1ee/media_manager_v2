<template>
  <h3 class="mb-3">All Items</h3>
  <SortControl v-on:sort="onSort"></SortControl>
  <hr>
  <ItemList v-bind="{items: items, pageData: pageData}"></ItemList>
  <VPagination
    v-if="pageData"
    v-model="page"
    :pages="pageData.lastPage"
    :range-size="2"
    active-color="#87CEEB"
    @update:modelValue="onListChange"
  ></VPagination>
</template>

<script>
import {getAllMetadatasWithPagination} from "@/repository";
import ItemList from "@/components/ItemList";
import SortControl from "@/components/SortControl";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default {
  name: "AllItems",
  components: {SortControl, ItemList, VPagination},
  data() {
    return {
      items: [],
      pageData: null,
      page: 1,
      sortField: "uploadDate",
      direction: -1
    }
  },
  created() {
    getAllMetadatasWithPagination(0,"uploadDate",-1)
        .then(data => {
          this.items = data.metadatas;
          this.pageData = data.pageData;
        })
        .catch(err => {
          alert(err);
          console.error(err);
        })
  },
  methods: {
    onSort(field, direction) {
      this.sortField = field;
      this.direction = direction;
      this.page = 1;
      this.onListChange();
    },
    onListChange() {
      getAllMetadatasWithPagination(this.page - 1,this.sortField,this.direction)
          .then(data => {
            this.items = data.metadatas;
            this.pageData = data.pageData;
          })
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