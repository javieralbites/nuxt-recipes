export default function ({store}) {
    console.log("hola middleware");
    if (store.state.categories.length == 0) {
        store.dispatch('nuxtServerInit')
    }
}