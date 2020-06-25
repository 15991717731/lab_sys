<template>
  <div>
    <EquipmentIdentifier :borrowBtn="false"></EquipmentIdentifier>
  </div>
</template>

<script>
import EquipmentIdentifier from '../../components/equipIdentifier';
export default {
  name: 'tidentifier',

  components: {
    EquipmentIdentifier,
  },

  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style lang='scss'>

</style>
