<template>
  <h3>Create new tag</h3>
  <Loading v-if="isLoading"></Loading>
  <p v-if="isSubmitted">New tag was created</p>
  <form id="newTagForm" v-on:submit="onSubmit">
    <div class="mb-1">
      <label for="newTagNameInput" class="form-label">New tag value</label>
      <input id="newTagNameInput" v-model="newTagValue" type="text" name="value" class="form-control" required>
    </div>
    <div class="mb-1">
      <label class="form-label" for="newTagTypeInput">Tag type</label>
      <select id="newTagTypeInput" v-model="newTagType" name="type" class="form-select" required>
        <option selected>person</option>
        <option>group</option>
        <option>general</option>
        <option>etc</option>
      </select>
    </div>
    <div class="mb-1">
      <label class="form-label" for="newTagLabelInput">Tag label</label>
      <input id="newTagLabelInput" v-model="newTagLabel" name="label" class="form-control" required>
    </div>
    <div class="mb-3">
      <label class="form-label" for="newTagDescriptionInput">Tag description</label>
      <textarea id="newTagDescriptionInput" v-model="newTagDescription" name="description" class="form-control" rows="3"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Create</button>
  </form>
</template>

<script>
import {postCreateTag} from "@/repository";
import Loading from "@/components/Loading";

export default {
  name: "TagManager",
  components: {Loading},
  data() {
    return {
      newTagValue: null,
      newTagType: "person",
      newTagLabel: null,
      newTagDescription: null,
      isLoading: false,
      isSubmitted: false
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.isLoading = true;
      let tagData = {
        value: this.newTagValue,
        type: this.newTagType,
        label: this.newTagLabel,
        description: this.newTagDescription
      };
      postCreateTag(tagData)
          .then(res => {
            console.log(res);
            this.isLoading = false;
            this.isSubmitted = true;
            location.reload();
          })
          .catch(err => {
            console.error(err.response.headers);
            alert(`Creating tag failed ${err.response.data}`);
          });
    }
  }
}
</script>

<style scoped>

</style>