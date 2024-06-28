import catchAsync from "../../Utils/catchAsync";
import sendResponse from "../../Utils/sendResponse";
import noDataFound from "../Room/room.error";
import { SlotServices } from "./slot.service";

const createSlots = catchAsync(async (req, res) => {

    const result = await SlotServices.createSlotsIntoDB(req.body);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Slots created successfully',
        data: result,
    });
});

const getAllSlots = catchAsync(async (req, res) => {
    const result = await SlotServices.getAllSlotsFromDB(req.query);

    if (result.length === 0) {
        sendResponse(res, noDataFound('No Data Found'))
    }

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Available slots retrieved successfully',
        data: result,
    });

});


export const SlotControllers = {
    createSlots,
    getAllSlots,
};