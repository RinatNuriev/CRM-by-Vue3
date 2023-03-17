import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import 'firebase/database'

export default {
    actions: {
        async login({ dispatch, commit }, { email, password }) {
            console.log(dispatch);
            try {
                const auth = getAuth();
                await signInWithEmailAndPassword(auth, email, password)
            } catch (error) {
                commit('setError', error)
                throw error.message

            }
        },

        async register({ dispatch, commit }, { email, password, name }) {
            const auth = getAuth();
            const db = getDatabase();

            try {
                await createUserWithEmailAndPassword(auth, email, password, name)
                const uid = await dispatch('getUid')

                await set(ref(db, 'users/' + uid + '/info'), {
                    bill: 10000,
                    name: name,
                });
            } catch (error) {
                commit('setError', error)
                throw error.message
            }


        },

        getUid() {
            const user = getAuth().currentUser
            return user ? user.uid : null
        },

        async logout({ commit }) {
            await getAuth().signOut()
            commit('clearInfo')
        }
    }
}