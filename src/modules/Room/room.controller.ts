import catchAsync from "../../Utils/catchAsync";
import sendResponse from "../../Utils/sendResponse";
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

export const RoomControllers = {
    createRoom,
}