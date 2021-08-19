<template>
  <h2 v-if="tagValue">Edit Tag: {{tagValue}}</h2>
  <Loading v-if="isLoading"></Loading>
  <p v-if="isSaved">Saved Changes!</p>
  <form id="newTagForm" v-on:submit="onSubmit">
    <div class="mb-1" hidden>
      <label for="tagNameInput" class="form-label">Tag value</label>
      <input id="tagNameInput" v-model="tagValue" type="text" name="value" class="form-control" required>
    </div>
    <div class="mb-1">
      <label class="form-label" for="tagTypeInput">Tag type</label>
      <select id="tagTypeInput" v-model="tagType" name="type" class="form-select" required>
        <option selected>person</option>
        <option>group</option>
        <option>general</option>
        <option>etc</option>
      </select>
    </div>
    <div class="mb-1">
      <label class="form-label" for="tagLabelInput">Tag label</label>
      <input id="tagLabelInput" v-model="tagLabel" name="label" class="form-control" required>
    </div>
    <div class="mb-3">
      <label class="form-label" for="tagDescriptionInput">Tag description</label>
      <textarea id="tagDescriptionInput" v-model="tagDescription" name="description" class="form-control" rows="3"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Save</button>
  </form>
</template>

<script>
import {postEditTag, getTagByValue} from "@/repository";
import Loading from "@/components/Loading";

export default {
  name: "TagEditor",
  components: {Loading},
  data() {
    return {
      tagValue: null,
      tagType: "person",
      tagLabel: null,
      tagDescription: null,
      isLoading: false,
      isSaved: false
    }
  },
  created() {
    getTagByValue(this.$route.params.tag).then(data => {
      this.tagValue = data.value;
      this.tagType = data.type;
      this.tagLabel = data.label;
      this.tagDescription = data.description;
    });
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.isLoading = true;
      let tagData = {
        value: this.tagValue,
        type: this.tagType,
        label: this.tagLabel,
        description: this.tagDescription
      };
      postEditTag(tagData)
          .then(res => {
            console.log(res);
            this.isLoading = false;
            this.isSaved = true;
            this.$router.push(`/tags/${this.$route.params.tag}`);
          })
          .catch(err => {
            console.error(err.response.headers);
            alert(`Editing tag failed ${err.response.data}`);
          });
    }
  }
}
</script>

<style scoped>

</style>