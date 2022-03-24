const products = [
    {
        "name": "espresso",
        "price": 260,
        "currency": "GBP"
    },
    {
        "name": "iced-latte",
        "price": 380,
        "currency": "GBP"
    },
    {
        "name": "cappuccino",
        "price": 320,
        "currency": "GBP"
    }
]

const rectifiedPriceString = (price, currency, padLength = 2) => {
    const mainDenomination = Math.floor(price / 10 ** padLength)
    let minorDenomination = `${price - mainDenomination * 10 ** padLength}`
    minorDenomination = minorDenomination.padEnd(padLength, "0")
    return `${mainDenomination}.${minorDenomination} ${currency}`
}

const updateCart = element => {
    const productElement = element.parentNode
    const quantity = productElement.getElementsByClassName("quantity")[0].value
    console.log(quantity)
    const lineItems = JSON.parse(localStorage.getItem("lineItems"))
    let updated = false
    lineItems.forEach((item, index) => {
        if(item.name === productElement.id) {
            lineItems[index] = {
                name: item.name,
                quantity: parseInt(item.quantity) + parseInt(quantity)
            }
            updated = true
        }
    })
    if(!updated) {
        lineItems.push({
            name: productElement.id,
            quantity: quantity
        })
        updated = true
    }
    localStorage.setItem("lineItems", JSON.stringify(lineItems))
    window.alert("Item(s) added to cart, please go to checkout when you are ready.")
}

const updateQuantity = (element, isInput = false) => {
    const quantityInput = isInput ? element 
        : element.parentNode.querySelector('input[type=number]')
    if (element?.className === "increment") { quantityInput.stepUp() }
    if (element?.className === "decrement") { quantityInput.stepDown() }

    const productElement = element.parentNode.parentNode.parentNode
    const quantity = quantityInput.value

    let price
    let currency
    products.forEach(product => {
        if(product.name === productElement.id) { 
            price = product.price 
            currency = product.currency
        }
    })
    
    const quantityElement = productElement.getElementsByClassName("quantity-total")[0]
    quantityElement.innerHTML =  rectifiedPriceString(price * quantity, currency)
}

products.forEach(product => {
    const card = document.getElementById(product.name)
    const price = card.getElementsByClassName("product-price")[0]
    price.innerHTML = rectifiedPriceString(product.price, product.currency)
    const total = card.getElementsByClassName("quantity-total")[0]
    const quantity = card.getElementsByClassName("quantity")[0].value
    total.innerHTML = rectifiedPriceString(product.price * quantity, product.currency)
})

if (localStorage.getItem("lineItems") === undefined) {
    localStorage.setItem("lineItems", JSON.stringify([]))
}