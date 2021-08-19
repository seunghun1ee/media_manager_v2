<template>
  <div class="mb-3">
    <TagTitle v-if="tagData" v-bind:tag-data="tagData"></TagTitle>
  </div>
  <SortControl v-on:sort="onSort"></SortControl>
  <hr>
  <Loading v-if="loading"></Loading>
  <ItemList v-bind="{items: items, count: pageData.itemCount}"></ItemList>
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
import ItemList from "@/components/ItemList";
import {
  getTagByValue,
  getMetadatasByTagsWithPagination,
} from "@/repository";
import SortControl from "@/components/SortControl";
import TagTitle from "@/components/TagTitle";
import VPagination from "@hennge/vue3-pagination";
import Loading from "@/components/Loading";
import sortQueryConverter from "@/sortQueryConverter";

export default {
  name: "TaggedItems",
  components: {Loading, TagTitle, SortControl, ItemList, VPagination},
  data() {
    return  {
      tagData: null,
      items: [],
      pageData: null,
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      sortBy: this.$route.query.sort ? this.$route.query.sort : "latest",
      sortField: "uploadDate",
      direction: -1,
      loading: true
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
    getMetadatasByTagsWithPagination(this.page - 1,[this.$route.params.tag],"uploadDate",-1)
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
  watch: {
    $route() {
      this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1;
      this.onListChange();
    }
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
      getMetadatasByTagsWithPagination(this.page - 1,[this.$route.params.tag],this.sortField,this.direction)
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
      this.$router.push({path: "/tags/" + this.$route.params.tag, query: {page: this.page, sort: this.sortBy}});
      this.onListChange();
    }
  }
}
</script>

<style scoped>

</style>