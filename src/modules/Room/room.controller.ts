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
    //console.log(result);


    if (result === null) {
        sendResponse(res, noDataFound('No Data Found'))
    }

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Room retrieved successfully',
        data: result,
    });

});


const getAllRoom = catchAsync(async (req, res) => {
    const result = await RoomServices.getAllRoomFromDB();

    //console.log(result);
    //console.log(result.length);

    if (result.length === 0) {
        sendResponse(res, noDataFound('No Data Found'))
    }

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Rooms retrieved successfully',
        data: result,
    });

});

const updateRoom = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await RoomServices.updateRoomIntoDB(id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Room updated successfully',
        data: result,
    });
});

export const RoomControllers = {
    createRoom,
    getSingleRoom,
    getAllRoom,
    updateRoom,
}