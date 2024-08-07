import catchAsync from "../../Utils/catchAsync";
import sendResponse from "../../Utils/sendResponse";
import noDataFound from "../Room/room.error";
import { BookingServices } from "./booking.service";


const createBooking = catchAsync(async (req, res) => {
    const result = await BookingServices.createBookingIntoDB(req.body, req.user);


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

const getSpecificUserBookings = catchAsync(async (req, res) => {
    const result = await BookingServices.getSpecificUserBookingsFromDB(req.user);

    if (result.length === 0) {
        sendResponse(res, noDataFound('No Data Found'))
    }

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'User bookings retrieved successfully',
        data: result,
    });

});

const updateBooking = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BookingServices.updateBookingIntoDB(id, req.body);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Booking updated successfully',
        data: result,
    });
});

const deleteBooking = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BookingServices.deleteBookingFromDB(id);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Booking deleted successfully',
        data: result,
    });
});

export const BookingControllers = {
    createBooking,
    getAllBookings,
    getSpecificUserBookings,
    updateBooking,
    deleteBooking
};