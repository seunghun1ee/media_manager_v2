<template>
  <h3>Create new tag</h3>
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

export default {
  name: "TagManager",
  data() {
    return {
      newTagValue: null,
      newTagType: "person",
      newTagLabel: null,
      newTagDescription: null
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let tagData = {
        value: this.newTagValue,
        type: this.newTagType,
        label: this.newTagLabel,
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