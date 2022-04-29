import { AxiosError } from "axios";
import { EditTourInteractorInput, EditTourInteractorOutput } from "./EditTourInteractor";
import { TourDataProtocol } from "./TourDataObj";

interface EditTourViewOutputProtocol {
    fetchTourData(tourName: string): void
}

class EditTourPresenter implements EditTourViewOutputProtocol, EditTourInteractorOutput {
    interactor: EditTourInteractorInput
    tourName: string

    constructor(interactor: EditTourInteractorInput, tourName: string) {
        this.interactor = interactor
        this.tourName = tourName
    }
    didFetchTourData(response: TourDataProtocol): void {
        throw new Error("Method not implemented.");
    }

    didFailToFetchTourData(error: AxiosError<any, any>): void {
        
    }

    fetchTourData(tourName: string): void {
        this.interactor.getTourData(tourName)
    }
}

export default EditTourPresenter;