import catchAsync from "../../Utils/catchAsync";
import sendResponse from "../../Utils/sendResponse";
import { BookingServices } from "./booking.service";


const createBooking = catchAsync(async (req, res) => {
    const result = await BookingServices.createBookingIntoDB(req.body);
    

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Booking created successfully',
        data: result,
    });
});

export const BookingControllers = {
    createBooking,
};