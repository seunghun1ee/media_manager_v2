<template>
  <h2>{{pageName}}</h2>
  <SortControl></SortControl>
  <hr>
  <article class="mb-3" v-for="item in items" :key="item.id">
    <h3><a class="text-decoration-none" v-bind:href="'/items/'+item.id">{{item.name}}</a></h3>
    <p class="mb-1">{{Intl.DateTimeFormat("en-GB",dateTimeFormat).format(new Date(item.uploadDate))}}</p>
    <p class="mb-1">Favorite: {{item.favorite}}</p>
    <p>{{counterName}}: {{item.score}}</p>
    <p><a v-bind:href="'/files/'+item.files[0]"><img class="img-fluid" v-bind:src="'/files/'+item.files[0]" v-bind:alt="item.name"></a></p>
    <p class="mb-5">{{item.memo}}</p>
  </article>
</template>

<script>

import SortControl from "@/components/SortControl";
export default {
  name: "ItemList",
  components: {SortControl},
  props: {
    pageName: String,
    items: Array
  },
  data() {
    return {
      dateTimeFormat: {
        dateStyle: "medium",
        timeStyle: "medium"
      },
      counterName: process.env.VUE_APP_COUNTER_NAME
    }
  }
}
</script>

<style scoped>

</style>