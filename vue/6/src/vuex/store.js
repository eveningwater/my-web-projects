import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
	state:{
		basicTitle:'',
		progressTitle:'',
		highTitle:''
	}
})
export default store