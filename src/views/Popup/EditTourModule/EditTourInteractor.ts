import { AxiosError, AxiosResponse } from "axios";
import TourDataObj, { TourDataProtocol } from "./TourDataObj";
import TourService, { TourServiceProtocol } from "./TourService";

export interface EditTourInteractorInput {
    getTourData(tourName: string): void
}

export interface EditTourInteractorOutput {
    didFetchTourData(response: TourDataProtocol): void
    didFailToFetchTourData(error: AxiosError): void
}

class EditTourInteractor implements EditTourInteractorInput {
    tourService: TourServiceProtocol
    output?: EditTourInteractorOutput

    constructor(tourService: TourServiceProtocol) {
        this.tourService = tourService
    }

    getTourData(tourName: string): void {
        this.tourService.getTourData(tourName)
            .then( response => {
                this.output?.didFetchTourData(response.data)
            })
            .catch( error => {
                this.output?.didFailToFetchTourData(error)
            })
    }
    
}

