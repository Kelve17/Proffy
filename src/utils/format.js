const subjects = [
    "Arts",
    "Biology",
    "Sciences",
    "PE",
    "Physics",
    "Geography",
    "History",
    "Maths",
    "Portuguese",
    "Chemistry"
]

const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]

function convertTimetoMinutes(time){
    const [hours, minutes] = time.split(":")
    return Number(hours * 60 + minutes);
}

module.exports = {
    subjects,
    weekdays,
    convertTimetoMinutes
}
