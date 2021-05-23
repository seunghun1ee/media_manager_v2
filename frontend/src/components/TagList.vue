<template>
  <h2>{{pageName}}</h2>
  <hr>
  <div>
    <h3>Groups</h3>
    <ul class="list-unstyled">
      <li v-for="tag in groupList" :key="tag.tag" class="ms-4">
        <a v-bind:href="'/tags/'+tag.tag">{{tag.tag}}</a>
      </li>
    </ul>
  </div>
  <div>
    <h3>People</h3>
    <ul class="list-unstyled">
      <li v-for="tag in personList" :key="tag.tag" class="ms-4">
        <a v-bind:href="'/tags/'+tag.tag">{{tag.tag}}</a>
      </li>
    </ul>
  </div>
  <div>
    <h3>General</h3>
    <ul class="list-unstyled">
      <li v-for="tag in generalList" :key="tag.tag" class="ms-4">
        <a v-bind:href="'/tags/'+tag.tag">{{tag.tag}}</a>
      </li>
    </ul>
  </div>
  <div>
    <h3>etc</h3>
    <ul class="list-unstyled">
      <li v-for="tag in etcList" :key="tag.tag" class="ms-4">
        <a v-bind:href="'/tags/'+tag.tag">{{tag.tag}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import {getTagsBuTypes} from "@/repository";

export default {
  name: "TagList",
  data() {
    return {
      pageName: "Tags",
      groupList: [],
      personList: [],
      generalList: [],
      etcList: []
    }
  },
  created() {
    getTagsBuTypes("group").then(data => this.groupList = data)
        .catch(err => {
          alert(err);
          console.error(err);
        });
    getTagsBuTypes("person").then(data => this.personList = data)
        .catch(err => {
          alert(err);
          console.error(err);
        });
    getTagsBuTypes("general").then(data => this.generalList = data)
        .catch(err => {
          alert(err);
          console.error(err);
        });
    getTagsBuTypes("etc").then(data => this.etcList = data)
        .catch(err => {
          alert(err);
          console.error(err);
        });
  }
}
</script>

<style scoped>

</style>