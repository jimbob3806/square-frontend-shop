const APPLICATION_ID = "sandbox-sq0idb-HlKCjANf0AmKnp8Y603huA"
const LOCATION_ID = "L34E80SBT85CE"

let card
let payments

const main = async () => {
    payments = Square.payments(APPLICATION_ID, LOCATION_ID)
    card = await payments.card()
    await card.attach("#card-container")
}

const getToken = async () => {
    const tokenResult = await card.tokenize()
    sca(tokenResult)
}

const sca = async (tokenResult) => {
    console.log(tokenResult)
    const verify = await payments.verifyBuyer(tokenResult.token, {
        amount: "3.20",
        billingContact: {
            addressLines: [
                "home",
                "street",
                "town"
            ]
        },
        currencyCode: "GBP",
        intent: "CHARGE"
    })
    console.log(verify)
}

const button = document.getElementById("card-button")
button.addEventListener("click", getToken)

document.addEventListener("DOMContentLoaded", main)

const cart = JSON.parse(localStorage.getItem("lineItems"))
cart.forEach(item => {
    
})

const detailsForm = document.getElementById("details-form")
detailsForm.addEventListener("submit", event => {
    event.preventDefault()

    const xhr = new XMLHttpRequest()
    const formData = new FormData(detailsForm)
    const formDataObject = {}

    for (const key of formData.keys()) {
        formDataObject[key] = formData.get(key)
    }
    formDataObject.lineItems = JSON.parse(localStorage.getItem("lineItems"))

    xhr.open("POST", "http://localhost:3000/")
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*")
    xhr.setRequestHeader("Content-type", "application/json")
    xhr.send(JSON.stringify(formDataObject))

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log(xhr.response);
        }
    }
})
