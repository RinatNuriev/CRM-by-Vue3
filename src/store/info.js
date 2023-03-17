import { getDatabase, ref, onValue, update } from "firebase/database";
import 'firebase/database'


export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state) {
            state.info = {}
        },
    },
    actions: {
        async unpdateInfo({ dispatch, commit, getters }, toUpdate) {
            const db = getDatabase();
            try {
                const uid = await dispatch('getUid')
                const updateData = {...getters.info, ...toUpdate}

                await update(ref(db, 'users/' + uid + '/info'), updateData);
                commit('setInfo', updateData)

            } catch (error) {
                commit('setError', error)
                throw error.message
            }

        },

        async fetchInfo({ dispatch, commit }) {
            const db = getDatabase();
            try {
                const uid = await dispatch('getUid')
                const starCountRef = ref(db, 'users/' + uid + '/info');
                onValue(starCountRef, (snapshot) => {
                    const info = snapshot.val();
                    commit('setInfo', info)
                    // updateStarCount(postElement, data);
                });
            } catch (error) {
                commit('setError', error)
                throw error.message
            }


        }
    },
    getters: {
        info: s => s.info
    }
}