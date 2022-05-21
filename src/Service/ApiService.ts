import axios from "axios"
// import { endpoint } from './ServiceConfig';

// const endpoint = 'https://bridge-api-tim.herokuapp.com'
const endpoint = 'http://localhost:4000'
// const endpoint = 'http://124.121.99.187:4000'

enum Endpoint {
    login,
    register,
    admin_board,
    update_tour,
    update_user_info
}

export const api = {
    login: (body: any)=> {
        return axios.post(endpoint + '/login', body)
    },
    register: (body: any)=> {
        return axios.post(endpoint + '/register', body)
    },
    updateTour: (body: any)=> {
        return axios.post(endpoint + '/updateTourData', body)
    },
    updateUserInfo: (body: any)=> {
        return axios.post(endpoint + '/updateUserData', body)
    },
    getTourData: (tourName: string)=> {
        return axios.get(endpoint + '/getTournamentData',{
            params: {
                tour_name: tourName
            }
        })
    },
    getAnnouncements: (offset: number, limit: number)=> {
        return axios.get(endpoint + '/getAnnouncements',{
            params: {
                offset: offset,
                limit: limit
            }
        })
    },
    addAnnouncement: (body: any)=> {
        return axios.post(endpoint + '/addAnnouncement',body)
    },
    getAnnouncement: (id: string)=> {
        return axios.get(endpoint + '/getAnnouncement',{
            params: {
                id: id
            }
        })
    },
    updateAnnouncement: (body: any)=> {
        return axios.post(endpoint + '/updateAnnouncement',body)
    },
    manageTour: (body: any)=> {
        return axios.get(endpoint + '/manageTour')
    },
    updateUserData: (body: any)=> {
        return axios.post(endpoint + '/updateUserData', body)
    },
    getUserData: (param: string)=> {
        return axios.get(endpoint +'/getUserData', {
            params: {
                username: param
            }
        })
    }
}


const apiServiceConfig = {
    Method :(endpoint: Endpoint)=> {
        switch (endpoint) {
            case 
                Endpoint.login, 
                Endpoint.register,
                Endpoint.update_tour,
                Endpoint.update_user_info :

                return axios.post
        }
    },

    apiEndpoint :(endpoint: Endpoint)=> {
        switch (endpoint) {
            case Endpoint.login :
                return '/login'
            case Endpoint.register :
                return '/register'
            case Endpoint.update_tour :
                return '/updateTourData'
            case Endpoint.update_user_info :
                return '/updateUserData'
        }
    },

    request: (endpoint: Endpoint) => {
        return 
    }
}