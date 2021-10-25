<template>
    <input 
      :type="type" 
      :value="modelValue"
      class="input" 
      placeholder="Название"
      @input="updateInput"
    >
</template>

<script>

export default {
  name: 'my-input',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  },
}

</script>

<style scoped>
  .input {
    width: 100%;
    border: 1px solid teal;
    padding: 10px 15px;
    margin-top: 15px;
  }
</style>