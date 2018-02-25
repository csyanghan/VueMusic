import axios from 'axios'
const _baseUrl = 'http://localhost:3000'

export default{
  getBanner() {
    let url = _baseUrl + '/banner'
    return axios.get(url)
  },
  getRecommendSongs() {
    let url = _baseUrl + '/personalized'
    return axios.get(url)
  },
  getNewMv() {
    let url = _baseUrl + '/personalized/mv'
    return axios.get(url)
  },
  getTopten(key) {
    let url = _baseUrl + '/top/list?idx=' + key
    return axios.get(url)
  },
  getFavorList(id) {
    let url = _baseUrl + '/user/playlist?uid=' + id
    return axios.get(url)
  },
  // getPlayList(id){
  //   let url = _baseUrl + '/playlist/detail?id=' + id;
  //   return axios.get(url);
  // },
  getSearchSuggest(keyword) {
    let url = _baseUrl + '/search/suggest?keywords=' + keyword
    return axios.get(url)
  },
  getFM() {
    let url = _baseUrl + '/personal_fm'
    return axios.get(url)
  },
  getMusic(id) {
    let url = _baseUrl + '/music/url?id=' + id
    return axios.get(url)
  }
}
