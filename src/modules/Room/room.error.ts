import httpStatus from 'http-status';

const noDataFound = (message: string) => {
    return ({
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: message,
        data: [],
    })
}

export default noDataFound;