<template>
  <div class="container is-fluid">
    <div class="panel-block">
      <div class="panel">MLB Info</div>
    </div>
    <div class="panel-block">
      <div class="panel">Roster</div>
    </div>
    <b-table 
      :data="this.getTeamInfo.players"
      :bordered="isBordered"
      :narrowed="isNarrowed"
      :striped="isStriped">

      <template slot-scope="props">
        <b-table-column field="player_id" label="Player ID" numeric sortable>
          {{ props.row.player_id }}
        </b-table-column>
        <b-table-column field="name_full" label="Player Name" sortable>
          {{ props.row.name_full }}
        </b-table-column>
        <b-table-column field="position_txt" label="Position" sortable>
          {{ props.row.position_txt }}
        </b-table-column>
      </template>

    </b-table>
    <!-- <ul>
      <li v-for="player in this.getTeamInfo.players" :key="player.player_id">
        {{ player.name_full}} - {{ player.position_txt }}
      </li>
    </ul> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'mlb',
  data () {
    return {
      isBordered: true,
      isNarrowed: true,
      isStriped : true
    }
  },
  methods: {
    ...mapActions('mlb', {
      fetchTeamInfo: 'fetchTeamInfo'
    })
  },
  computed: {
    ...mapGetters('mlb', ['getTeamInfo'])
  },
  created: function() {
    this.fetchTeamInfo()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
