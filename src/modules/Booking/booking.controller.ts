import catchAsync from "../../Utils/catchAsync";
import sendResponse from "../../Utils/sendResponse";
import noDataFound from "../Room/room.error";
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

const getAllBookings = catchAsync(async (req, res) => {
    const result = await BookingServices.getAllBookingsFromDB();

    if (result.length === 0) {
        sendResponse(res, noDataFound('No Data Found'))
    }

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'All bookings retrieved successfully',
        data: result,
    });

});

export const BookingControllers = {
    createBooking,
    getAllBookings
};