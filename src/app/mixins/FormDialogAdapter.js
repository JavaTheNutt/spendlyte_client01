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
    }
  }
};
