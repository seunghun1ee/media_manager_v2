<template>
  <h1>Edit item</h1>
  <hr>
  <Loading v-if="isLoading"></Loading>
  <p v-if="isSaved">Saved changes</p>
  <div v-if="itemData">
    <p v-for="file in itemData.files" :key="file"><img class="img-fluid" v-bind:src="'/files/'+file"></p>
    <form id="fileUploader" enctype="multipart/form-data" v-on:submit="onSubmit">
      <div class="mb-3">
        <label class="form-label" for="nameInput">Name</label>
        <input v-model="itemData.name" class="form-control" id="nameInput" type="text" name="name" required>
      </div>
      <div class="mb-3">
        <div>
          <label class="form-label">Tags</label>
          <Multiselect style="background: white"
                       v-model="itemData.tags"
                       v-bind="multiselectProps"
          ></Multiselect>
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label" for="memoInput">Memo (optional)</label>
        <textarea v-model="itemData.memo" class="form-control" id="memoInput" name="memo" rows="3"></textarea>
      </div>
      <button class="btn btn-primary" type="submit">Save</button>
    </form>
    <div class="form-check form-switch mt-3">
      <label class="form-check-label" for="flexSwitchCheckDefault" style="color: red">Danger zone</label>
      <input v-model="isDanger" class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
    </div>
    <div v-if="isDanger">
      <hr>
      <button class="btn btn-danger" v-on:click="onDelete">Delete this item</button>
      <p class="mt-1" style="color: red">WARNING! This action CANNOT be undone</p>
    </div>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import Loading from "@/components/Loading";
import {getAllTags, getMetadataById, postDeleteItem, postEditItem} from "@/repository";

export default {
  name: "ItemEditor",
  components: {Multiselect, Loading},
  data() {
    return {
      itemData: null,
      isLoading: true,
      isSaved: false,
      isDanger: false,

      tagOptions: [],

      multiselectProps: {
        mode: 'tags',
        value: null,
        options: null,
        searchable: true,
        createTag: false,
        required: true,
        placeholder: "Add tags",
        object: false
      }
    }
  },
  created() {
    this.multiselectProps.value = this.tags;
    getAllTags()
        .then(data => {
          data.map(tag => {
            let option = {value: tag.value, label: tag.value};
            this.tagOptions.push(option);
          });
          this.multiselectProps.options = this.tagOptions;
        });
    getMetadataById(this.$route.params.id).then(data => {
      this.itemData = data;
      this.isLoading = false;
    }).catch(err => {
      alert(err);
      console.error(err);
    });
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.isLoading = true;
      let changes = {
        name: this.itemData.name,
        tags: JSON.stringify(this.itemData.tags),
        memo: this.itemData.memo
      }
      console.log(changes);
      postEditItem(this.$route.params.id, changes).then(() => {
        this.isLoading = false;
        this.isSaved = true;
        this.$router.push(`/items/${this.$route.params.id}`);
      }).catch(err => {
        alert(err);
        console.error(err);
      });
    },
    onDelete() {
      postDeleteItem(this.$route.params.id).then(() => {
        this.$router.push("/");
      }).catch(err => {
        alert(err);
        console.error(err);
      });
    }
  }
}
</script>

<style scoped>
  .form-check-input:checked {
    background-color: red;
    border-color: red;
  }

  .form-check-input:focus {
    border-color: #ffc0cb;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(255 192 203 / 25%)
  }
</style>