<template>
  <v-container>
    <h1 class="secondary--text">
      {{ category.name }}
      <v-icon large class="secondary--text">
        {{ category.icon }}
      </v-icon>
    </h1>
    <p class="secondary--text">{{ category.description }}</p>
    <v-row>
      <v-col cols="4" v-for="recipe in recipes" :key="recipe.id">
        <ui-nav-card-recipe :recipe="recipe"></ui-nav-card-recipe>
      </v-col>
    </v-row>
    <div class="mt-3">

    <v-alert type="info" v-if="recipes.length == 0">
      <p>No hay recetas disponibles, vuelve mas tarde</p>
    </v-alert>
    </div>
    <div class="mt-3">
      <ui-back-btn label="Volver"> </ui-back-btn>
    </div>
    <!-- <div v-for="recipe in recipes" :key="recipe.id">
      <nuxt-link
        :to="{
          name: 'category-recipe',
          params: { category: $route.params.category, recipe: recipe.id },
        }"
        >{{ recipe.name }}</nuxt-link
      >
    </div> -->
    <v-divider></v-divider>
    <nuxt-link to="/">volver</nuxt-link>
  </v-container>
</template>

<script>
// import gql from "graphql-tag";
// import {category} from '../../graphql/querys'
export default {
  data() {
    return {
      //   query: category
    };
  },
  computed: {
    category() {
      const slug = this.$route.params.category;
      return this.$store.getters.readCategories.find(
        (category) => category.slug == slug
      );
    },
  },
  async asyncData({ app, route }) {
    const slug = route.params.category;
    const client = app.apolloProvider.defaultClient;
    const query = {
      query: require("../../graphql/recipes.gql"),
      variables: { slug },
    };
    let recipes = [];
    await client
      .query(query)
      .then((data) => {
        recipes = data.data.recipes;
      })
      .catch((e) => console.log(e));

    return { recipes };
  },
  //   apollo:{
  //       category:{
  //           // QUERY PUEDE SER FUNCION
  //         //   query(){
  //         //       return this.query
  //         //   },
  //         query: category,
  //           variables(){
  //               return {id:this.$route.query.id}
  //           }
  //       }
  //   }
};
</script>

