document.getElementById('booking-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;

    const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        return;
    }

    const newBooking = await response.json();
    addBookingToList(newBooking);
});

async function fetchBookings() {
    const response = await fetch('/api/bookings');
    const bookings = await response.json();
    bookings.forEach(addBookingToList);
}

function addBookingToList(booking) {
    const listItem = document.createElement('li');
    const takenDate = new Date(booking.takenDate).toLocaleString();
    const returnDate = new Date(booking.returnDate).toLocaleString();
    listItem.textContent = `${booking.title} (Taken: ${takenDate}, Return: ${returnDate})`;
    document.getElementById('booking-list').appendChild(listItem);
}

fetchBookings();