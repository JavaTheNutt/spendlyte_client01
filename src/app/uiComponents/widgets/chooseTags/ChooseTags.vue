<template>
  <v-select
    label="Tags"
    chips
    tags
    solo
    v-model="selectedTags"
    autocomplete
    :items="tags"
    @keyup.enter.stop="enterClickedInTagSelect"
    class="elevation-0"
  >
    <template slot="selection" slot-scope="data">
      <v-chip
        close
        @input="removeTag(data.item)"
        :selected="data.selected"
      >
        <strong>{{ data.item }}</strong>
      </v-chip>
    </template>
  </v-select>
</template>
<script>
  import { mapGetters } from 'vuex';
  import { types } from '@/app/vuex';

  export default {
    name: 'choose-tags',
    data () {
      return {
        selectedTags: []
      };
    },
    computed: {
      ...mapGetters({ tags: types.autocomplete.getters.getTags }),
      newTags () {
        return this.selectedTags.filter(tag => this.tags.indexOf(tag) === -1);
      }
    },
    watch: {
      selectedTags (newVal) {
        this.$emit('tags-updated', { selected: Object.assign([], this.selectedTags), new: Object.assign([], this.newTags) });
      }
    },
    methods: {
      removeTag (tagToBeRemoved) {
        this.selectedTags = this.selectedTags.filter(tag => tag !== tagToBeRemoved);
      },
      enterClickedInTagSelect () {
        console.log('capturing enter keyup in tag select to prevent propagation');
      }
    }
  };
</script>
