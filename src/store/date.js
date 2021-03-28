import firebase from 'firebase/app';

export default {
    actions: {
        setDate({ commit }, { date, count }) {
            firebase.database().ref(`/schedule/alternation_date`).update({ date: date, count })
        }
    }
}