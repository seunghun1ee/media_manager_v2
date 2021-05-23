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
    <ul>
      <li v-for="tag in tagList" :key="tag.tag" class="ms-4">
        <a v-bind:href="'/tags/'+tag.tag">{{tag.tag}}</a>
      </li>
    </ul>
  </div>
  <div>
    <h3>General</h3>
    <ul>
      <li v-for="tag in generalList" :key="tag.tag" class="ms-4">
        <a v-bind:href="'/tags/'+tag.tag">{{tag.tag}}</a>
      </li>
    </ul>
  </div>
  <div>
    <h3>etc</h3>
    <ul>
      <li v-for="tag in etcList" :key="tag.tag" class="ms-4">
        <a v-bind:href="'/tags/'+tag.tag">{{tag.tag}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TagList",
  data() {
    return {
      pageName: "Tags",
      groupList: [],
      tagList: [],
      generalList: [],
      etcList: []
    }
  }
}
</script>

<style scoped>

</style>