import catchAsync from "../../Utils/catchAsync";
import sendResponse from "../../Utils/sendResponse";
import noDataFound from "./room.error";
import { RoomServices } from "./room.service";


const createRoom = catchAsync(async (req, res) => {
    const result = await RoomServices.createRoomIntoDB(req.body);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Room added successfully',
        data: result,
    });
});

const getSingleRoom = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await RoomServices.getSingleRoomFromDB(id);

    if(!result){
        sendResponse(res, noDataFound('No Data Found'))
    }

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Rooms retrieved successfully',
        data: result,
    });

});

export const RoomControllers = {
    createRoom,
    getSingleRoom,
}