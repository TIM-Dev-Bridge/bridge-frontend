import axios, { AxiosError, AxiosResponse } from "axios";
import TourDataObj, { TourDataProtocol } from "./TourDataObj";

export interface TourServiceProtocol {
    getTourData(tourName: string): Promise<AxiosResponse<TourDataProtocol, AxiosError>>
    updateTourData(tourData: TourDataProtocol): Promise<AxiosResponse<any, any>>
}

class TourService implements TourServiceProtocol {
    constructor() {

    }

    baseURL: string = ""
    getTourData(tourName: string): Promise<AxiosResponse<any, any>> {
        return axios.get(this.baseURL + '/getTournamentData',{
            params: {
                tour_name: tourName
            }
        })
    }

    updateTourData(tourData: TourDataProtocol): Promise<AxiosResponse<any, any>> {
        return axios.post('https://bridge-api-tim.herokuapp.com/updateTourData', tourData)
    }
    
}

export default TourService;