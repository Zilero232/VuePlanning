import firebase from 'firebase/app'

export default {
    actions: {
        async getBoard({ commit }) {
            try {
                const sitebar = (await firebase.database().ref(`/schedule/sitebarDate`).once('value')).val();
                return Object.keys(sitebar).map(key => ({...sitebar[key], id: key }))
            } catch (e) {}
        },
        deleleteBoard({ commit }, id) {
            firebase.database().ref(`/schedule/sitebarDate/${id}`).remove()
        },
        async pushBoard({ commit }, { title, url, description }) {
            const date = await firebase.database().ref(`/schedule/sitebarDate/`).push({ title, url, description })
            return date.key;
        }
    }
}