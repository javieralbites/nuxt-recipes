<template>
    <v-container>
    <h1 class="secondary--text">
      Recetas favoritas
      <v-icon large class="secondary--text">
        mdi-heart
      </v-icon>
    </h1>
    <p class="secondary--text">Tus recetas favoritas</p>
    <v-row>
      <v-col cols="4" v-for="favorite in favorites" :key="favorite.id">
        <ui-nav-card-recipe :recipe="favorite"></ui-nav-card-recipe>
      </v-col>
    </v-row>
    <div class="mt-3">

    <v-alert type="info" v-if="favorites.length == 0">
      <p>No tienes recetas favoritas</p>
    </v-alert>
    </div>
    <div class="mt-3">
      <ui-back-btn label="Volver"> </ui-back-btn>
    </div>
  </v-container>
</template>

<script>
    export default {
        middleware:"auth",
        async asyncData({app, store}){
            let client = app.apolloProvider.defaultClient
            let id = app.$auth.user.id
            let query = {
                context:{
                    headers:{
                        authorization:app.$auth.strategy.token.get()
                    }
                },
                query:require("../../graphql/userfavorites.gql"),
                fetchPolicy: 'no-cache',
                variables: {id}
            }
            let favorites = null
            await client.query(query).then(data => {
                store.commit("user/setFavorites", favorites)
                favorites = data.data.user.favorites
            }).catch(e => console.log(e))
            return {favorites}
        }
    }
</script>

