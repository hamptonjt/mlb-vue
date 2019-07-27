<template>
  <div class="container is-fluid">
    <nav class="panel">
      <p class="panel-heading">
        <b>MLB Info</b>
      </p>
      <div class="panel-block">
        <b-select placeholder="Select a team" v-model="selectedTeamId" @input="getTeamById">
          <option v-for="team in this.getTeams" :key="team.team_id" :value="team.team_id">
            {{ team.name_display_long }}
          </option>
        </b-select>
        <!-- Display team info here before the roster... -->
        <div>
          {{ this.selectedTeam.venue_name}} - <a :href="'http://' + this.selectedTeam.website_url" target="_blank">{{ this.selectedTeam.website_url }}</a>
        </div>
      </div>
      <div v-if="this.getTeamInfo.players.length > 0">
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
              {{ props.row.name_full }} {{ props.row.jersey_number }}
            </b-table-column>
            <b-table-column field="primary_position_txt" label="Position" sortable>
              {{ props.row.primary_position_txt }}
            </b-table-column>
          </template>
        </b-table>
      </div>
    </nav>
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
      isStriped : true,
      selectedTeamId: '',
      selectedTeam: {}
    }
  },
  methods: {
    ...mapActions('mlb', {
      fetchTeamInfo: 'fetchTeamInfo',
      fetchTeams: 'fetchTeams'
    }),
    getTeamById() {
      this.fetchTeamInfo(this.selectedTeamId)
      this.selectedTeam = this.getTeams.find(team => {
        return team.team_id === this.selectedTeamId
      })
    }
  },
  computed: {
    ...mapGetters('mlb', ['getTeamInfo', 'getTeams'])
  },
  created: function() {
    this.fetchTeams()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
