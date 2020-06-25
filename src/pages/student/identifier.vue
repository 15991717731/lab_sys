<template>
  <div>
    <EquipmentIdentifier :borrowBtn="true"></EquipmentIdentifier>
  </div>
</template>

<script>
import EquipmentIdentifier from "../../components/equipIdentifier";
export default {
  name: "sidentifier",

  components: {
    EquipmentIdentifier
  },

  data() {
    return {};
  },

  methods: {}
};
</script>

<style lang='scss'>
</style>
