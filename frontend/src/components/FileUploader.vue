<template>
  <h1>Upload files</h1>
  <hr>
  <Loading v-if="isLoading"></Loading>
  <p v-if="uploadSuccess">{{name}} was successfully uploaded</p>
  <form id="fileUploader" enctype="multipart/form-data" v-on:submit="onSubmit">
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
      <textarea class="form-control" id="memoInput" name="memo" rows="3"></textarea>
    </div>
    <button class="btn btn-primary" type="submit">Upload</button>
  </form>
</template>

<script>
import {getAllTags, postUploadFiles} from "@/repository";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import Loading from "@/components/Loading";


export default {
  name: "FileUploader",
  components: {
    Loading,
    Multiselect
  },
  data() {
    return {
      name: null,
      filesToUpload: [],
      tags: [],
      memo: "",
      isLoading: false,
      uploadSuccess: false,

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
        })
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.isLoading = true;
      const fileUploadForm = document.getElementById("fileUploader");
      const formData = new FormData(fileUploadForm);
      formData.append("tags",JSON.stringify(this.tags));
      postUploadFiles(formData)
          .then(res => {
            console.log(res);
            this.isLoading = false;
            this.uploadSuccess = true;
            location.reload();
          })
          .catch(err => {
            console.error(err);
            alert(`File upload failed ${err}`);
          });
    }
  }
}
</script>

<style scoped>

</style>