<template>
  <p v-if="count">Number of items: {{count}}</p>
  <article class="mb-3" v-for="item in items" :key="item.id">
    <h3><a class="text-decoration-none" v-bind:href="'/items/'+item.id">{{item.name}}</a></h3>
    <p class="mb-1">{{Intl.DateTimeFormat("en-GB",dateTimeFormat).format(new Date(item.uploadDate))}}</p>
    <p class="mb-1">Favourite: {{item.favourite}}</p>
    <p>{{counterName}}: {{item.score}}</p>
    <div v-if="item.files.length < 3">
      <p v-for="(file, index) in item.files" v-bind:key="index">
        <a v-bind:href="'/files/'+ file"><img class="img-fluid" v-bind:src="'/files/'+ file" v-bind:alt="item.name"></a>
      </p>
    </div>
    <div v-else>
      <p>
        <a v-bind:href="'/files/'+item.files[0]"><img class="img-fluid" v-bind:src="'/files/'+item.files[0]" v-bind:alt="item.name"></a>
      </p>
      <div class="row">
        <div v-for="(file, index) in item.files.slice(1)" v-bind:key="index" class="col">
          <a v-bind:href="'/files/'+ file"><img class="img-fluid" v-bind:src="'/files/'+ file" v-bind:alt="item.name"></a>
        </div>
      </div>
    </div>
    <p class="mb-5">{{item.memo}}</p>
  </article>

</template>

<script>
export default {
  name: "ItemList",
  props: {
    items: Array,
    count: Number
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