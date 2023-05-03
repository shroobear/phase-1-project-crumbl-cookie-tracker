fetch("http://localhost:3000/cookies")
.then(r => r.json())
.then(cookie => cardBuilder(cookie))

const cardBuilder = (cookie) => {
    console.log(cookie)
    cookie.forEach(cardInfo => {
        const cardContainer = document.getElementById("cookie-container")
      const cookieCard = document.createElement("div")
      cookieCard.classList.add("cookie-card")
      const img = document.createElement("img")
      img.src = cardInfo.image
      const flavor = document.createElement("h3")
      flavor.innerText = cardInfo.flavor
      const p = document.createElement("p")
      p.textContent = cardInfo.description
      const selectArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const ratingLabel = document.createElement("span")
      ratingLabel.innerText = "Rating:"
      const userRating = document.createElement("select");
      for(let i = 0; i < 10; i++) {
          let option = document.createElement("option");
          option.value = selectArray[i];
          option.text = selectArray[i];
          userRating.appendChild(option);
      }
      userRating.value = cardInfo.rating;
      
      
      cookieCard.appendChild(flavor)
      cookieCard.appendChild(img)
      cookieCard.appendChild(p)
      cookieCard.appendChild(ratingLabel)
      cookieCard.appendChild(userRating)
      cardContainer.appendChild(cookieCard)
    })
  }