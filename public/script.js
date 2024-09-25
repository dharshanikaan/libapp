document.addEventListener('DOMContentLoaded', async () => {
    await loadBorrowedBooks();
    await loadReferredBooks();
});

document.getElementById('search-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('search-title').value;

    const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title })
    });

    if (response.ok) {
        const book = await response.json();
        addBorrowedBookToList(book);
    } else {
        console.error('Error adding book');
    }

    document.getElementById('search-title').value = ''; // Clear input field
});

function addBorrowedBookToList(book) {
    const borrowedList = document.getElementById('borrowed-list');
    const listItem = document.createElement('li');
    listItem.textContent = `${book.title} - Taken on: ${new Date(book.takenDate).toLocaleString()} - Return by: ${new Date(book.returnDate).toLocaleString()}`;

    const fineDisplay = document.createElement('span');
    fineDisplay.textContent = ` Fine: $0`;
    fineDisplay.style.marginLeft = '10px';
    listItem.appendChild(fineDisplay);

    const returnButton = document.createElement('button');
    returnButton.textContent = 'Return';
    returnButton.onclick = async () => {
        const response = await fetch(`/api/bookings/return/${encodeURIComponent(book.title)}`, {
            method: 'POST',
        });
        
        if (response.ok) {
            const { fine } = await response.json();
            if (fine > 0) {
                // Redirect to payment page if there's a fine
                const payFine = confirm(`You have a fine of $${fine}. Would you like to pay?`);
                if (payFine) {
                    window.location.href = `/pay-fine?fine=${fine}`; // Implement this route as needed
                }
            } else {
                alert('Book returned successfully without fine.');
                addReferredBookToList(book);
                borrowedList.removeChild(listItem);
            }
        } else {
            console.error('Error returning book');
        }
    };
    listItem.appendChild(returnButton);
    borrowedList.appendChild(listItem);
}

function addReferredBookToList(book) {
    const referredList = document.getElementById('referred-list');
    const listItem = document.createElement('li');
    listItem.textContent = `${book.title} - Returned on: ${new Date().toLocaleString()}`;
    referredList.appendChild(listItem);
}

async function loadBorrowedBooks() {
    const response = await fetch('/api/bookings/borrowed');
    if (response.ok) {
        const borrowedBooks = await response.json();
        borrowedBooks.forEach(book => addBorrowedBookToList(book));
    }
}

async function loadReferredBooks() {
    const response = await fetch('/api/bookings/referred');
    if (response.ok) {
        const referredBooks = await response.json();
        referredBooks.forEach(book => addReferredBookToList(book));
    }
}