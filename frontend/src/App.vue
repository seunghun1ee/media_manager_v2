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
  },
  beforeCreate() {
    document.title = process.env.VUE_APP_WEBSITE_TITLE;
  }
}
</script>

<style>
body {
  color: white;
  background: #252525;
  margin-bottom: 15%;
}

a {
  color: lightskyblue;
}

/*override btn btn-primary*/
.btn.btn-primary {
  color: #252525;
  background-color: skyblue;
  border-color: skyblue;
}

.btn.btn-primary:hover {
  color: #252525;
  background-color: deepskyblue;
  border-color: deepskyblue;
}

/*override btn btn-secondary*/
.btn.btn-secondary {
  color: white;
}

.btn.btn-secondary:hover {
  color: white;
}

.page-link {
  color: #252525;
}

.page-link:hover {
  color: black;
}

.page-item.active .page-link {
  color: #252525;
  background-color: lightskyblue;
  border-color: lightskyblue;
}
</style>
