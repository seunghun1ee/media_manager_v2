<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <Navigation></Navigation>
      </div>
      <div class="col-md-8">
        <div class="mt-5">
          <ItemList></ItemList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Navigation from "@/components/Navigation";
import ItemList from "@/components/ItemList";
export default {
  name: 'App',
  components: {
    ItemList,
    Navigation
  }
}
</script>

<style>

</style>
