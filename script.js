let inputtedURL = document.getElementById('url');
let submitButton = document.getElementById('shortURL');

let resultURL = document.getElementById('resultURL');
let copyButton = document.getElementById('copyButton');
let resultDiv = document.getElementById('resultDiv');

submitButton.addEventListener('click', shortenURL);

async function shortenURL(e) {
    e.preventDefault(); // Prevent default form submission

    const url = inputtedURL.value;

    console.log(url);


    const API_URL = 'https://cleanuri.com/api/v1/shorten';


    try {
        let response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({ "url": url }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            //there is an issue after request
            resultURL.value = "HTTP Error: " + response.status;

            resultDiv.style.display = 'block';

        }

        const data = await response.json();

        resultURL.value = data.result_url;

        resultDiv.style.display = 'block';




    } catch (error) {
        //there is an issue while making the request
        resultURL.value = "" + error;

        resultDiv.style.display = 'block';

    }

}



function toggleLoading(isLoading) {
    if (isLoading) {
        submitButton.style.display = 'none';
        loadingSpinner.classList.toggle('hidden', false);
    } else {
        submitButton.style.display = 'block';
        loadingSpinner.classList.toggle('hidden', true);
    }

}

let newParagraph = document.createElement('p');

newParagraph.textContent = 'copied';


copyButton.addEventListener('click', copyToClipboard);
function copyToClipboard() {

    resultURL.select();
    resultURL.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field to the clipboard */
    document.execCommand("copy");

    copyButton.parentNode.appendChild(newParagraph);
}