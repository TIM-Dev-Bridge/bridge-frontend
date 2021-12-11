import axios from 'axios';
import React from 'react'
import { useAuthen } from '../../Authen';
import { useLobby } from '../../Service/SocketService';
import { TourData } from './TourRequest'

const useEditTour =(tourName: string, onCreate: (success : boolean, reason: string)=> void)=> {
    const [tourData, updateTourData] = React.useState<TourData>();
    const [viewModel, updateViewModel] = React.useState<any>();
    const lobby = useLobby()
    const authen = useAuthen()


    React.useEffect(()=> {
        //get tour data
        //bridge-api-tim.herokuapp.com/
        if (tourName === '')  return 
        axios.get('https://bridge-api-tim.herokuapp.com/getTournamentData', {
            params: {
                tour_name: tourName
            }
        }).then( response =>{
            // console.log(response)
            formatViewModel(response.data)
            updateTourData(response.data)
        })
    }, [tourName])

    const formatViewModel =(data: any)=> {
        if (data == null || data ==undefined || data == '') return 
        const startDate = data.time_start.split(',')[0] ?? ''
        const startTime = data.time_start.split(',')[1] ?? ''
        var time = startTime.split(' ')[1].length == 8 ? startTime.split(' ')[1] : '0' + startTime.split(' ')[1]
        const dayNight = startTime.split(' ')[2]

        if (dayNight == "PM") {
            const updateValue = String(Number(time.split(':')[0]) + 12)
            time = updateValue + ":" + time.split(':')[1] + ':' + time.split(':')[2]
        }
        // console.log("TIME" ,time, dayNight)
        const formatedStartDate = startDate.split('/')[2] + '-' + startDate.split('/')[0] + '-' + startDate.split('/')[1]
        const newData = {
            tour_name: data.tour_name,
            max_player: data.max_player,
            type: data.type,
            password: data.password ?? "",
            player_name: data.player_name,
            date_start: formatedStartDate,
            time_start: time,
            status: data?.status ?? "",
            board_to_play: data?.board_to_play ?? 1,
            minute_board: data.minute_board,
            board_round: data.board_round,
            movement: data.movement,
            scoring: data.scoring,
            barometer: data?.barometer ?? true,
            createBy: data?.createBy ?? ""
        }
        // console.log(newData)
        updateViewModel(newData)
    }

    const updateTourWith =(data: any)=> {
        const formatDate = data.date.split('-')[1] + '/' + data.date.split('-')[2] + '/' + data.date.split('-')[0]
        const dayNight = Number(data.time.split(':')[0]) > 12 ? "PM" : "AM"
        const updateValue = Number(data.time.split(':')[0]) > 12 ? String(Number(data.time.split(':')[0]) - 12) : data.time.split(':')[0]
        
        const formatTime = ' ' + updateValue + ':' + data.time.split(':')[1] + ':' + (data.time.split(':')[2] == undefined ? '00' :  data.time.split(':')[2]) + ' ' + dayNight
        // console.log("date time", formatDate + ',' + formatTime)
        const formatDateTime = formatDate + ',' + formatTime

        const newData: TourData = {
            tour_name: data.title,
            max_player: tourData!.max_player,
            type: data.type,
            password: tourData!.password ?? "",
            player_name: tourData?.player_name ?? [],
            time_start: formatDateTime,
            status: tourData?.status ?? "",
            board_to_play: Number(data.boardToPlay),
            minute_board: Number(data.minuteBoard),
            board_round: Number(data.boardRound),
            movement: data.movement,
            scoring: data.scoring,
            barometer: tourData?.barometer ?? true,
            createBy: tourData?.createBy ?? ""
        }
        // console.log("After update", newData)
        updateTourData(newData)

        return axios.post('https://bridge-api-tim.herokuapp.com/updateTourData', newData)
    }

    return {
        viewModel,
        tourData,
        updateTourWith,
    }
}

export default useEditTour;