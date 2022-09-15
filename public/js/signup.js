window.addEventListener("load", function () {
    const signup = document.getElementById('signup')

    signup.addEventListener('submit', (event) => {
        // Stops the default submit action and allows us to perform our own aciton
        event.preventDefault()

        // Check if passwords matches
        if (document.getElementById('pass').value ==
            document.getElementById('confirm_pass').value) {
            // Saves the data from the form into FD
            let FD = new FormData(signup)

            // Creates the JSON data from FD
            let data = {
                email: FD.get('email'),
                user: FD.get('user'),
                pass: FD.get('pass'),
                confPass: FD.get('confirm_pass')
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
        } else { // Passwords do not match
            document.getElementById('error_match').classList.remove('hidden')
        }
    })
})

const check = () => {
    if (document.getElementById('pass').value ==
        document.getElementById('confirm_pass').value) {
        document.getElementById('pass').style.background = 'inherit';
        document.getElementById('confirm_pass').style.background = 'inherit';
    } else {
        document.getElementById('pass').style.background = '#eb6960';
        document.getElementById('confirm_pass').style.background = '#eb6960';
    }
}