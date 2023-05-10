let allCookies = []
//create DOM element to contain each cookie
const cardBuilder = (cookie) => {
    let cardContainer = document.getElementById("cookie-container")
    let cookieCard = document.createElement("div")
    cookieCard.classList.add("cookie-card")

    let img = document.createElement("img")
    img.src = cookie.image

    let flavor = document.createElement("h3")
    flavor.innerText = cookie.flavor

    let p = document.createElement("p")
    p.textContent = cookie.description

    const selectArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const ratingLabel = document.createElement("span")
    ratingLabel.innerText = "Rating:"
    const userRating = document.createElement("select");
    for (let i = 0; i < 10; i++) {
        let option = document.createElement("option");
        option.value = selectArray[i];
        option.text = selectArray[i];
        userRating.appendChild(option);
    }
    userRating.value = cookie.rating;
    console.log(userRating)
    // Event listener for updating rating in db.json
    userRating.addEventListener("change", (e) => {
    if (e.target === userRating) {
        e.preventDefault()
        const newRating = e.target.value;
        const cookieId = cookie.id;
        fetch(`http://localhost:3000/Cookies/${cookieId}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                rating: newRating
            })
        })
        .then(r => r.json())
        .then(updatedCookie => console.log(updatedCookie))
        .catch(error => console.log(error))
    }
});


cookieCard.appendChild(flavor)
cookieCard.appendChild(img)
cookieCard.appendChild(p)
cookieCard.appendChild(ratingLabel)
cookieCard.appendChild(userRating)
cardContainer.appendChild(cookieCard)
}
// fetch cookies, submit new cookies
document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/cookies")
        .then(r => r.json())
        .then(cookies => {
            cookies.forEach(cookie => cardBuilder(cookie)) 
            allCookies = cookies
        })
        //global variable for all cookies to modify by search here
    const form = document.querySelector("form.cookie-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        submitForm(formData)
    })
})


//callback for submitting cookies

function submitForm(newCookie) {
    fetch('http://localhost:3000/cookies', {
        method: "POST",
        headers:
        {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            ...newCookie,
            "flavor": newCookie.flavor,
            "description": newCookie.description,
            "rating": newCookie.rating,
            "image": newCookie.image
        })
    })
        .then(r => r.json())
        .then(responseCookie => cardBuilder(responseCookie))
}

//add search function
