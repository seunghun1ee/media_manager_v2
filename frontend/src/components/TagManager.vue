<template>
  <h3>Create new tag</h3>
  <form id="newTagForm" v-on:submit="onSubmit">
    <div class="mb-1">
      <label for="newTagNameInput" class="form-label">New tag name</label>
      <input id="newTagNameInput" v-model="newTagName" type="text" name="name" class="form-control" required>
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
      <label class="form-label" for="newTagLabelInput">Tag title</label>
      <input id="newTagLabelInput" v-model="newTagTitle" name="title" class="form-control" required>
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

export default {
  name: "TagManager",
  data() {
    return {
      newTagName: null,
      newTagType: "person",
      newTagTitle: null,
      newTagDescription: null
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let tagData = {
        tag: this.newTagName,
        type: this.newTagType,
        title: this.newTagTitle,
        description: this.newTagDescription
      };
      postCreateTag(tagData)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            alert(`Creating tag failed ${err}`);
            console.error(err);
          });
    }
  }
}
</script>

<style scoped>

</style>