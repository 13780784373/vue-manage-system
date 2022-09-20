import { defineStore } from 'pinia';

export const testStore = defineStore('test', {
  state: () => {
		return {
			name: '妲己'
		};
	},
  getters: {
    nameCopy: state => state.name
  },
  actions: {
    chnageName(name: string) {
      this.name = name
    }
  }
})