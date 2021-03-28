import firebase from 'firebase/app';

export default {
    actions: {
        async getSchedule({ commit }) {
            return (await firebase.database().ref('/schedule').once('value')).val()
        },
        async changeDatabase({ commit }, { name, text, count, tag, index, date, group }) {
            console.log(name, text, count, tag, index, date, group)
            if (tag.includes('table__wrapper-day')) {
                await firebase.database().ref(`/${group}/${name}/${count}`).update({ day: text })
            } else if (tag.includes('table__wrapper-time')) {
                await firebase.database().ref(`/${group}/time`).update({
                    [index]: text
                })
            } else if (tag.includes('table__wrapper-office')) {
                await firebase.database().ref(`/${group}/${name}/${count}/planning/${index}`).update({ office: text })
            } else if (tag.includes('table__wrapper-couple')) {
                await firebase.database().ref(`/${group}/${name}/${count}/planning/${index}`).update({ plan: text })
            }
            await firebase.database().ref(`/schedule`).update({ last_time: date })
        },
        async getPlanningGroup({}, group) {
            return (await firebase.database().ref(`/${group}`).once('value')).val()
        }
    },
}