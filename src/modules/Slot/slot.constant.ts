export const convertToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    // Ex: suppose time is: 09:30, then hours = 09, minutes = 30

    return hours * 60 + minutes; // 09 * 60 + 30 = 570 minutes total
}

export const convertBackToDesiredTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60); 
    // minutes = 570, then 570 / 60 = 9.50, so hours = 9 (flooring)

    const mins = minutes % 60; 
    // from the hours, we got 9.50, so remaining 50 is minutes. We can get this remaining using remainder or mod(%)

    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    //will display time like 00:00 format. If a number added, then the number will be placed and remaining will be 0 (Ex: 09:30, 08:05, 09:00 etc.) 
}


export const getRange = (start: number, end: number) => {
    const range = [];
    for (let i = start; i <= end; i++) {
        range.push(i);
    }
    return range;
};