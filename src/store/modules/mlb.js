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
  teams: [],
  teamInfo: {
    teamId: '',
    players: []
  },
}

const mutations = {
  'SAVETEAMLIST' (state, teams) {
    state.teams = teams
  },
  'SETTEAMINFO' (state, object) {
    state.teamInfo = object
  }
}

const actions = {
  async fetchTeams({commit}) {
    let response = await HTTP.get("/json/named.team_all_season.bam?sport_code='mlb'&season='2019'&all_star_sw='N'")
    let teams = response.data.team_all_season.queryResults.row
    commit('SAVETEAMLIST', teams)
  },
  async fetchTeamInfo({commit}, teamId) {
    if (teamId) {
      let response = await HTTP.get('/json/named.roster_40.bam?team_id=\'' + teamId + '\'&roster_40.col_in=player_id&roster_40.col_in=position_txt&roster_40.col_in=name_full')
      if (response.data) {
        let players = response.data.roster_40.queryResults.row
        let teamInfo = {
          teamId,
          players
        }
        commit('SETTEAMINFO', teamInfo)
      }
    }
  }
}

const getters = {
  getTeamInfo: state => state.teamInfo,
  getTeams: state => state.teams
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}