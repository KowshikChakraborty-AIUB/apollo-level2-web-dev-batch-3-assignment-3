import catchAsync from "../../Utils/catchAsync";
import sendResponse from "../../Utils/sendResponse";
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


export const SlotControllers = {
    createSlots,
};