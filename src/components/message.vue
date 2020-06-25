<template>
  <div>
    <div class="compontent-url">{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "message",

  props: {
    message: {
      type: String
    }
  },
  data() {
    return {};
  },
  mounted() {
  },

  methods: {}
};
</script>

<style lang='scss'>
.compontent-url {
  width: 100%;
  margin: 15px 0;
  text-align: center;
}
</style>
