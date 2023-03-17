import { getDatabase, ref, push, onValue, update, child } from "firebase/database";
import 'firebase/database'


export default {

    actions: {
        async updateCategory({ commit, dispatch }, { title, limit, id }) {
            const db = getDatabase();
            try {
                const uid = await dispatch('getUid')
                // const postData = {
                //     title: title,
                //     limit: limit,
                // };
                // const newPostKey = push(child(ref(db), id)).key;

                // const updates = {};
                // updates['users/' + uid + '/categoties'] = postData;

                return update(child(ref(db, 'users/' + uid + '/categoties'), id), { title, limit });

                // await update(ref(db, 'users/' + uid + '/categoties').child(id), { title, limit });

            } catch (error) {
                commit('setError', error)
                throw error
            }
        },
        async createCategory({ commit, dispatch }, { title, limit }) {
            const db = getDatabase();
            try {
                const uid = await dispatch('getUid')
                const category = await push(ref(db, 'users/' + uid + '/categoties'), { title, limit });
                return { title, limit, id: category.key }
            } catch (error) {
                commit('setError', error)
                throw error
            }
        },

        async fetchCategories({ commit, dispatch }) {
            const db = getDatabase();
            try {
                const uid = await dispatch('getUid')
                const category = ref(db, 'users/' + uid + '/categoties');
                const cats = []
                onValue(category, (snapshot) => {
                    const info = snapshot.val();
                    cats.push(Object.keys(info).map(key => ({ ...info[key], id: key })))
                });

                return cats

            } catch (error) {
                commit('setError', error)
                throw error
            }
        },

        async fetchCategoryById({ commit, dispatch }, id) {
            const db = getDatabase();
            try {
                const uid = await dispatch('getUid')
                const category = child(ref(db, 'users/' + uid + '/categoties'), id);
                const cats = []
                onValue(category, (snapshot) => {
                    const info = snapshot.val();
                    cats.push({...info, id: id})
                });

                return cats

            } catch (error) {
                commit('setError', error)
                throw error
            }
        },


    }
}