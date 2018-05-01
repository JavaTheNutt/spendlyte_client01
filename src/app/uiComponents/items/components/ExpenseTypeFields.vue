<template>
  <div>
    <v-flex>
      <v-select
        :items="['Food', 'Utilities', 'Other']"
        v-model="selectedExpenseType"/>
    </v-flex>
  </div>
</template>
<script>
  export default {
    name: 'expense-type-fields',
    data () {
      return {
        selectedExpenseType: 'Other'
      };
    }
  };
</script>
