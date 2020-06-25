<template>
  <div>
    <div class="compontent-url" v-for="(item, index) in message" :key="index">{{item.text}}</div>
  </div>
</template>

<script>
export default {
  name: "message",

  props: {
    message: {
      type: [Object, Array]
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
