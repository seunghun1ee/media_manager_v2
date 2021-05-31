<template>
  <h1>Upload files</h1>
  <form id="fileUploader" method="post" enctype="multipart/form-data">
    <div class="mb-3">
      <label class="form-label" for="fileInput">Attach files</label>
      <input class="form-control" id="fileInput" type="file" name="filesToUpload" required multiple>
    </div>
    <div class="mb-3">
      <label class="form-label" for="nameInput">Name</label>
      <input v-model="name" class="form-control" id="nameInput" type="text" name="name" required>
    </div>
    <div class="mb-3">
      <div>
        <label class="form-label">Tags</label>
        <Multiselect style="background: white"
                     v-model="tags"
                     v-bind="multiselectProps"
        ></Multiselect>
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label" for="memoInput">Memo (optional)</label>
      <textarea v-model="memo" class="form-control" id="memoInput" name="memo" rows="3"></textarea>
    </div>
    <button class="btn btn-primary" type="submit">Upload</button>
  </form>
</template>

<script>
import {getAllTags} from "@/repository";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";


export default {
  name: "FileUploader",
  components: {
    Multiselect
  },
  data() {
    return {
      name: null,
      filesToUpload: [],
      tags: [],
      memo: "",

      tagOptions: [],

      multiselectProps: {
        mode: 'tags',
        value: ['test'],
        options: null,
        searchable: true,
        createTag: false,
        required: true,
        placeholder: "Add tags",
        object: true
      }
    }
  },
  created() {
    getAllTags()
        .then(data => {
          data.map(tag => {
            let option = {value: tag.tag, label: tag.tag};
            this.tagOptions.push(option);
          });
          this.multiselectProps.options = this.tagOptions;
        })
  }
}
</script>

<style scoped>

</style>