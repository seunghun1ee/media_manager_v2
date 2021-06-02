<template>
  <div>
    <h3 v-if="tagData.label">{{tagData.label}}</h3>
    <h4 v-if="tagData.value">{{tagData.value}}</h4>
    <p v-if="tagData.type">Type: {{tagData.type}}</p>
    <p v-if="tagData.description">{{tagData.description}}</p>
    <p class="text-end"><a v-bind:href="'/tag_manager/' + tagData.value">Edit this tag</a></p>
  </div>
</template>

<script>
export default {
  name: "TagTitle",
  props: {
    tagData: Object
  }
}
</script>

<style scoped>

</style>