import axios from "axios"

const baseURL = 'https://bridge-api-tim.herokuapp.com'
// const baseURL = 'http://localhost:4000'

enum Endpoint {
    login,
    register,
    admin_board,
    update_tour,
    update_user_info
}

export const api = {
    login: (body: any)=> {
        return axios.post(baseURL + '/login', body)
    },
    register: (body: any)=> {
        return axios.post(baseURL + '/register', body)
    },
    updateTour: (body: any)=> {
        return axios.post(baseURL + '/updateTourData', body)
    },
    updateUserInfo: (body: any)=> {
        return axios.post(baseURL + '/updateUserData', body)
    },
    getTourData: (tourName: string)=> {
        return axios.get(baseURL + '/getTournamentData',{
            params: {
                tour_name: tourName
            }
        })
    },
    getAnnouncements: (offset: number, limit: number)=> {
        return axios.get(baseURL + '/getAnnouncements',{
            params: {
                offset: offset,
                limit: limit
            }
        })
    },
    addAnnouncement: (body: any)=> {
        return axios.post(baseURL + '/addAnnouncement',body)
    },
    getAnnouncement: (id: string)=> {
        return axios.get(baseURL + '/getAnnouncement',{
            params: {
                id: id
            }
        })
    },
    updateAnnouncement: (body: any)=> {
        return axios.post(baseURL + '/updateAnnouncement',body)
    },
    manageTour: (body: any)=> {
        return axios.get(baseURL + '/manageTour')
    },
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