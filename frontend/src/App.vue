<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <Navigation></Navigation>
      </div>
      <div class="col-md-8">
        <div class="mt-5">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Navigation from "@/components/Navigation";
export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>

<style>

</style>
