/**
 * MLB Vuex Module
 */
import axios from 'axios'

// HTTP will be a common way to call the endpoints with the base URL from the mlb service
const HTTP = axios.create({
  baseURL: 'http://lookup-service-prod.mlb.com'
})

const state = {
  // put stuff here
  teamInfo: {
    teamId: '',
    players: []
  },
}

const mutations = {
  'SETTEAMINFO' (state, object) {
    state.teamInfo = object
  }
}

const actions = {
  async fetchTeamInfo({commit}, teamId) {
    teamId = 147
    let response = await HTTP.get('/json/named.roster_40.bam?team_id=\'' + teamId + '\'&roster_40.col_in=player_id&roster_40.col_in=position_txt&roster_40.col_in=name_full')
    let players = response.data.roster_40.queryResults.row
    let teamInfo = {
      teamId,
      players
    }
    commit('SETTEAMINFO', teamInfo)
  }
}

const getters = {
  getTeamInfo: state => state.teamInfo 
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}