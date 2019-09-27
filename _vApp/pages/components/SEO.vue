<template>
  <div class="">
    <v-text-field
      v-model="seo.meta_title"
      label="Meta Title"
      type="text"
      name="meta_title"
      autocomplete="nope"
    ></v-text-field>
    <v-textarea
      label="Meta Description"
      auto-grow
      name="meta_description"
      outlined
      v-model="seo.meta_description"
    ></v-textarea>
    <v-text-field
      v-model="seo.meta_keywords"
      label="Meta Keywords"
      type="text"
      name="meta_keywords"
      autocomplete="nope"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: [
    'seo'
  ],
}
</script>
