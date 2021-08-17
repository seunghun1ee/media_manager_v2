<template>
  <h3 class="mb-3">Favourite Items</h3>
  <SortControl v-on:sort="onSort"></SortControl>
  <hr>
  <Loading v-if="loading"></Loading>
  <ItemList v-if="!loading" v-bind="{items: items, count: pageData.itemCount}"></ItemList>
  <div class="mb-5">
    <VPagination
        v-if="pageData"
        v-model="page"
        :pages="pageData.lastPage"
        :range-size="2"
        active-color="#87CEEB"
        @update:modelValue="onPagination"
    ></VPagination>
  </div>
</template>

<script>
import {getFavouriteMetadatasWithPagination} from "@/repository";
import ItemList from "@/components/ItemList";
import SortControl from "@/components/SortControl";
import VPagination from "@hennge/vue3-pagination";
import Loading from "@/components/Loading";
import sortQueryConverter from "@/sortQueryConverter";

export default {
  name: "FavouriteItems",
  components: {Loading, SortControl, ItemList, VPagination},
  data() {
    return {
      items: [],
      pageData: null,
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      sortBy: this.$route.query.sort ? this.$route.query.sort : "favouriteLatest",
      sortField: "favouriteDate",
      direction: -1,
      loading: true
    }
  },
  created() {
    this.sortField = sortQueryConverter(this.sortBy).sortField;
    this.direction = sortQueryConverter(this.sortBy).direction;
    getFavouriteMetadatasWithPagination(this.page - 1,this.sortField,this.direction)
        .then(data => {
          this.items = data.metadatas;
          this.pageData = data.pageData;
          this.loading = false;
        })
        .catch(err => {
          alert(err);
          console.error(err);
        });
  },
  methods: {
    onSort(sortBy) {
      this.sortBy = sortBy;
      this.sortField = sortQueryConverter(sortBy).sortField;
      this.direction = sortQueryConverter(sortBy).direction;
      this.page = 1;
      this.onPagination();
    },
    onListChange() {
      scroll(0,0);
      this.loading = true;
      getFavouriteMetadatasWithPagination(this.page - 1,this.sortField,this.direction)
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
    onPagination() {
      this.$router.push({path: "/favourites", query: {page: this.page, sort: this.sortBy}});
      this.onListChange();
    }
  }
}
</script>

<style scoped>

</style>