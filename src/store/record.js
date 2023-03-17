import { getDatabase, ref, push, onValue, child } from "firebase/database";
import 'firebase/database'


export default {
    actions: {
        async createRecord({ dispatch, commit }, record) {
            const db = getDatabase();

            try {
                const uid = await dispatch('getUid')
                return await push(ref(db, 'users/' + uid + '/records'), record);

            } catch (error) {
                commit('setError', error)
                throw error
            }
        },
        async fetchRecords({ dispatch, commit }) {
            const db = getDatabase();
            try {
                const uid = await dispatch('getUid')
                const records = ref(db, 'users/' + uid + '/records');
                const rec = []
                onValue(records, (snapshot) => {
                    const info = snapshot.val();
                    rec.push(Object.keys(info).map(key => ({ ...info[key], id: key })))
                });

                return rec

            } catch (error) {
                commit('setError', error)
                throw error
            }
        },
        async fetchRecordById({ dispatch, commit }, id) {
            const db = getDatabase();
            try {
                const uid = await dispatch('getUid')
                const record = child(ref(db, 'users/' + uid + '/records'), id) ;
                const rec = []
                onValue(record, (snapshot) => {
                    const info = snapshot.val();
                    rec.push({...info, id: id})
                });

                return rec

            } catch (error) {
                commit('setError', error)
                throw error
            }
        },
    }
}