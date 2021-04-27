export default function ({ store, redirect }) {
  // If the user is not authenticated, redirect
  if(store.state.user) {
    return redirect('/')
  }
}