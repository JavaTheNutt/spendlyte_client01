export default {
  data () {
    return {
      formSubmittable: false,
      formHasValues: false,
      formData: {},
      loading: false,
      _evb: null
    };
  },
  methods: {
    closeDialog () {
      this.$emit('dialog-closed');
      this._evb.$emit('reset-form');
    },
    resetClicked () {
      this._evb.$emit('reset-form');
    },
    inputTriggered (data) {
      this.formData = data.details;
    },
    validityUpdated (valid) {
      this.formSubmittable = valid;
    },
    valuesUpdated (hasValues) {
      this.formHasValues = hasValues;
    },
    cacheValues () {
      this.$emit('cache-state', this.formData);
    },
    revertState () {
      this.$emit('revert-state');
    }
  }
};
