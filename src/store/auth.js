import firebase from 'firebase/app';

export default {
    state: {
        name: ''
    },
    mutations: {
        GET_NAME(state, name) {
            state.name = name
        }
    },
    actions: {
        async login({ commit }, { email, password }) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {
                throw e
            }
        },
        async register({ commit, dispatch }, { email, password, name }) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password);
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/info`).set({
                    name
                })
            } catch (e) {
                throw e
            }
        },
        logout() {
            firebase.auth().signOut();
        },
        getUid() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        },
        async getName({ commit, dispatch }) {
            const uid = await dispatch('getUid');
            if (uid) {
                return (await firebase.database().ref(`/users/${uid}/info`).once('value')).val().name
            }
        }
    },
    getters: {
        getUid: s => s.uid
    }
}