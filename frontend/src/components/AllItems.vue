<template>
  <h3 class="mb-3">All Items</h3>
  <SortControl v-on:sort="onSort"></SortControl>
  <hr>
  <Loading v-if="loading"></Loading>
  <ItemList v-bind="{items: items, pageData: pageData}"></ItemList>
  <div class="mb-5">
    <VPagination
        v-if="pageData"
        v-model="page"
        :pages="pageData.lastPage"
        :range-size="2"
        active-color="#87CEEB"
        @update:modelValue="onListChange"
    ></VPagination>
  </div>
</template>

<script>
import {getAllMetadatasWithPagination} from "@/repository";
import ItemList from "@/components/ItemList";
import SortControl from "@/components/SortControl";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import Loading from "@/components/Loading";

export default {
  name: "AllItems",
  components: {Loading, SortControl, ItemList, VPagination},
  data() {
    return {
      items: [],
      pageData: null,
      page: 1,
      sortField: "uploadDate",
      direction: -1,
      loading: true
    }
  },
  created() {
    getAllMetadatasWithPagination(0,"uploadDate",-1)
        .then(data => {
          this.loading = false;
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
      scroll(0,0);
      this.loading = true;
      getAllMetadatasWithPagination(this.page - 1,this.sortField,this.direction)
          .then(data => {
            this.loading = false;
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