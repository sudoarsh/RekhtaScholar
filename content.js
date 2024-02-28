
function extractBookInfo() {
    const bookInfo = {};

    // Find the main book info container
    const infoContainer = document.querySelector('.ebkFlDtlContainer');
    if (!infoContainer) {
        console.error("Book info container not found!");
        return null; 
    }

    // Author
    const authorElement = infoContainer.querySelector('.ebkLstAthr:contains("Author") a');
    if (authorElement) {
        bookInfo.Author = authorElement.textContent.trim();
    }

    // Publisher
    const publisherElement = infoContainer.querySelector('.ebkLstAthr:contains("Publisher") a');
    if (publisherElement) {
        bookInfo.Publisher = publisherElement.textContent.trim();
    }

    // Year of Publication
    const yearElement = infoContainer.querySelector('.ebkLstAthr:contains("Year of Publication")');
    if (yearElement) {
        const yearText = yearElement.textContent.split(':')[1].trim();
        bookInfo['Year of Publication'] = yearText;
    }

    // Title
    const titleElement = infoContainer.querySelector('.ebkLstTtl');
    if (titleElement) {
        bookInfo.Title = titleElement.textContent.trim();
    }

    // URL
    bookInfo.URL = document.location.href;

    return bookInfo;
}
function waitForContentLoad() {
    // Wait for 2 seconds (adjust the time as needed)
    setTimeout(() => {
        const bookData = extractBookInfo();
        if (bookData) {
            // If book information is extracted, send it to the extension
            chrome.runtime.sendMessage({ action: 'bookInfoExtracted', bookData: bookData });
        } else {
            // If book information is not extracted, log an error
            console.error("Failed to extract book information.");
        }
    }, 2000); // Adjust the time as needed (in milliseconds)
}

// Call the function to wait for content to be loaded
waitForContentLoad();
// Handle messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getBookInfo') {
        const bookData = extractBookInfo();
        sendResponse({ bookData: bookData });
    }
});
