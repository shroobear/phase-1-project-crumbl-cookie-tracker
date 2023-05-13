document.addEventListener("DOMContentLoaded", () => {
    let allCookies = []
    let cardContainer = document.getElementById("cookie-container")
    //create DOM element to contain each cookie
    const cardBuilder = (cookie) => {
        let cookieCard = document.createElement("div")
        cookieCard.classList.add("cookie-card")
        //cookie picture
        let img = document.createElement("img")
        img.src = cookie.image
        //cookie flavor
        let flavor = document.createElement("h3")
        flavor.innerText = cookie.flavor
        //cookie description
        let p = document.createElement("p")
        p.textContent = cookie.description
        //rating selection
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
        // Set default value if user has not selected a rating
        userRating.value = "N/A"
        // Retrieve rating from localStorage
        const storedRating = localStorage.getItem(`rating-${cookie.id}`);
        if (storedRating) {
            userRating.value = storedRating;
        }
        // Event listener for updating rating in localStorage
        userRating.addEventListener("change", (e) => {
            if (e.target === userRating) {
                e.preventDefault()
                const newRating = e.target.value;
                const cookieId = cookie.id;

                // Update localStorage with new rating
                localStorage.setItem(`rating-${cookieId}`, newRating);
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
    
    function submitForm(newCookie) {
        fetch('https://crumbl-cookie-tracker-db.onrender.com/Cookies', {
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
                "image": newCookie.image
            })
        })
        .then(r => r.json())
        .then(responseCookie => cardBuilder(responseCookie))
    }
    fetch("https://crumbl-cookie-tracker-db.onrender.com/Cookies")
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

    //add search function
    //function that tracks whenever user types in search and changes DOM accordingly
    //independent of previous code


    document.getElementById("search-bar-input").addEventListener("input", (e)=>{
        cardContainer.innerHTML = ""
        let filteredCookies = allCookies.filter(cookie => cookie.flavor.toLowerCase().includes(e.target.value.toLowerCase()))
        filteredCookies.forEach(cookie => cardBuilder(cookie))
    });

})

