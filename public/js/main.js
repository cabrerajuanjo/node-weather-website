document.addEventListener("DOMContentLoaded", (e) => {
    const weatherForm = document.getElementById('locationQuery')
    const search = weatherForm.querySelector('input')
    const messageOne = weatherForm.querySelector('#message-1')
    const messageTwo = weatherForm.querySelector('#message-2')



    weatherForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const location = search.value;
        messageOne.textContent = 'Loading weather...';
        messageTwo.textContent = '';
        fetch("/weather?address=" + location).then((response) => {
            response.json().then((data) => {
                if(data.error)
                {
                    messageOne.textContent = data.error
                }else
                {
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                }
            })
        })
    })
})
