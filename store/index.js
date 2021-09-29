export const strict = false
export const state = () => ({
  categories: [],
  loadedRecipes:[]

})
export const getters = {
    readCategories(state){
        return state.categories
    },
    readLoadedRecipes(state){
      return state.loadedRecipes
    }
}
export const mutations = {
    addCategories(state, payload){
        state.categories = payload
    },
    addLoadedRecipes(state, payload){
      state.loadedRecipes = payload
    }
}
export const actions = {
  async nuxtServerInit({commit}) {
    console.log("hello nuxt server");
    // return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      const query = {
        query: require("../graphql/categories.gql")
      }
      await client.query(query).then(data => {
        commit('addCategories', data.data.categories)
        // commit('addLoadedRecipes', data.data.recipes)

        // resolve()
      }).catch(error => {
          console.log(error);
        //   reject()
      })
    // })


  },
  searchRecipe({commit}, payload){
    let client = this.app.apolloProvider.defaultClient
    const query = {
      query:require('../graphql/searchRecipe.gql'),
      variables: {term:payload}
    }
    client.query(query).then(data => {
      console.log(data);
      commit('addLoadedRecipes', data.data.recipes)
    }).catch(e => console.log(e))
  }
}
