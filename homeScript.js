//selecting a date
const currentDate = dayjs();
const formattedDate = currentDate.format('MM-DD-YY');

const eventDateInput = document.getElementById('eventDate');

eventDateInput.addEventListener('change', function() {
    const selectedDate = dayjs(eventDateInput.value);
    const formattedDate = selectedDate.format('MM-DD-YY');
    console.log('Selected date: ' + formattedDate);
});

//saving event
function saveEvent() {
    const eventName = document.getElementById('eventName').value;
    const eventDescription = document.getElementById('eventDescription').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;

    const dateTimeString = `${eventDate} at ${eventTime}`;
    const formattedDateTime = dayjs(dateTimeString).format('MM-DD-YY h:mm A');

    const eventListItem = document.createElement('li');
    eventListItem.textContent = `${eventName}: ${eventDescription} on ${formattedDateTime.replace(' ', ' at ')}`;

    const upcomingEventsList = document.querySelector('.upcomingEvents');
    upcomingEventsList.appendChild(eventListItem);
}

//saving goal
function saveGoal() {
    const goalName = document.getElementById('goalName').value;
    const goalDescription = document.getElementById('goalDescription').value;
    const goalDate = document.getElementById('goalDate').value;

    const formattedDateTime = dayjs(goalDate).format('MM-DD-YY');

    const goalListItem = document.createElement('li');
    goalListItem.textContent = `${goalName}: ${goalDescription}. Set for: ${formattedDateTime}`;

    const upcomingGoalsList = document.querySelector('.upcomingGoals');
    upcomingGoalsList.appendChild(goalListItem);
}

//generate quotes
const quotes = [
    "\"Life isn't about waiting for the storm to pass, it's about learning to dance in the rain.\"",
    "\"Life is like a coin. You can spend it any way you wish, but you only spend it once.\"",
    "\"The journey of a thousand miles begins with a single step.\"",
    "\"The only person you are destined to become is the person you decide to be.\"",
    "\"Be brave enough to live life creatively. The creative place where no one else has ever been.\"",
    "\"Be thankful for what you have; you'll end up having more. If you concentrate on what you don't have, you will never, ever have enough.\"",
    "\"Success is not final; failure is not fatal: it is the courage to continue that counts.\"",
];

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function updateHeaderWithQuote() {
    const header = document.querySelector('header h4');
    const quote = getRandomQuote();
    header.textContent = quote;
}
window.addEventListener('load', updateHeaderWithQuote);