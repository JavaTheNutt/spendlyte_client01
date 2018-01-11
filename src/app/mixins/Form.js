export default {
  data () {
    return {
      submissionDetails: {}
    };
  },
  computed: {
    formHasValues () {
      return Object.values(this.submissionDetails).reduce((res, elem) => res += elem.length) > 0;
    }
  },
  watch: {
    formHasValues (newVal, oldVal) {
      if (newVal !== oldVal) this.$emit('has-values-updated', newVal);
    },
    formValid (newVal, oldVal) {
      if (newVal !== oldVal) this.$emit('validity-updated', newVal);
      if (newVal) this.inputTriggered();
    }
  },
  methods: {
    formSubmitted () {
      if (this.formValid) this.$emit('form_submitted', this.submissionDetails);
    },
    inputTriggered () {
      if (this.formValid) {
        this.$nextTick(function () {
          this.$emit('input-triggered', {
            details: this.submissionDetails
          });
        });
      }
    },
    clearFormData () {
      return new Promise(resolve => {
        Object.assign(this.$data, this.$options.data.call(this));
        this.$nextTick().then(() => resolve());
      });
    },
    resetForm () {
      return new Promise(resolve => {
        this.clearFormData().then(() => {
          this.$nextTick().then(() => {
            this.$validator.reset();
            this.errors.clear();
            resolve();
          });
        });
      });
    }
  }
};
