<!-- DetailsIds.vue Manages gettings the details from the service and providing it to the Details component-->
<template>
    <div class="container-fluid">
        <div v-for="detailsElement of detailsArray" v-bind:key="detailsElement.id">
            <Details v-bind:details="detailsElement"></Details>
            
        </div>
    </div>
</template>

<script>
import {HTTP} from './http-common';
import Details from './Details'

const PERSON_LIMIT = 5
const PHONE_REGEX = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/


export default {
    data () {
        return {
            detailsArray: [],
            errors: []
        }
    },

    components: {
        Details
    },

    created() {
        //Gets a list of ids recursively using a token
        function getIdList(params, detailsIds, resolve, reject) {
            HTTP.get(`list`, params)
            .then(response => {
                var retrievedIds = detailsIds.concat(response.data.result);
                if (response.data.token && response.data.token.length) {
                    getIdList({params: {token: response.data.token}}, retrievedIds, resolve, reject);
                } else {
                    resolve(retrievedIds)
                }
            }).catch(e => {
                reject(e);
            })
        }

        // Gets each users details
        function getUserDetails(detailsId) {
            return HTTP.get(`detail/` + detailsId)
            .then(response => {
                return response.data;
            }).catch(() => {
                //We are going to eat the error if resource is missing so the group promise doens't fail.
                return {}
            })
        }

        // Intialize the data 
        new Promise((resolve, reject) => {
            getIdList({params: {}}, [], resolve, reject)    
        }).then(idList => {
            return Promise.all(idList.map(id =>  getUserDetails(id)))
        }).then(detailsArray => {
            this.detailsArray = detailsArray
            .sort((a, b) => a.age - b.age)
            .filter(a => a && a.number && a.number.match(PHONE_REGEX))
            .slice(0, PERSON_LIMIT)
            .sort((a, b) => a.name.localeCompare(b.name))
        });
    }
}
</script>