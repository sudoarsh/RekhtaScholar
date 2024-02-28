document.addEventListener('DOMContentLoaded', () => {
    const convertButton = document.getElementById('convertButton');
    const citationElement = document.getElementById('citation');

    convertButton.addEventListener('click', () => {
        const author = document.getElementById('authorInput').value.trim();
        const publisher = document.getElementById('publisherInput').value.trim();
        const year = document.getElementById('yearInput').value.trim();

        if (author && publisher && year) {
            const citationText = generateCitation(author, publisher, year);
            citationElement.textContent = citationText;
            citationElement.style.color = "black";
        } else {
            citationElement.textContent = "Error: Please fill in all fields.";
            citationElement.style.color = "red";
        }
    });
});

function generateCitation(author, publisher, year) {
    return `${author}. (${year}). *Title of Publication*. ${publisher}.`;
}
