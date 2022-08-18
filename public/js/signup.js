window.addEventListener("load", function () {
    const signup = document.getElementById('signup')

    signup.addEventListener('submit', (event) => {
        // Stops the default submit action and allows us to perform our own aciton
        event.preventDefault()

        // Saves the data from the form into FD
        let FD = new FormData(signup)

        // Creates the JSON data from FD
        let data = {
            email: FD.get('email'),
            user: FD.get('user'),
            pass: FD.get('pass')
        }

        // Makes the fetch request to server
        fetch('/signup/submit', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.ok) {
                    window.location = '/home'
                } else {
                    document.getElementById('error').classList.remove('hidden')
                }
            })
    })
})