import { menuArray } from './data.js'
const yourOrderArea = document.getElementById('your-order')

function renderMenu() {
    const availableOrders = document.getElementById('available-orders')
    let itemsForOrder = ''
    menuArray.forEach((menu) => {
        let para = ''

        for (let ingredients of menu.ingredients) {

            para += ingredients + `${ingredients === menu.ingredients[menu.ingredients.length - 1] ? '.' : ', '}`
        }


        let button = menu.selected ? '-' : '+'

        itemsForOrder += `
                        <div class="order" id="order">
                            <h1>${menu.emoji}</h1>
                            <div>
                                <h3>${menu.name}</h3>
                                <p> ${para}</p>  
                                <h5>\$${menu.price}</h5>
                            </div>
                            <button data-food = "${menu.id}" class="button">${button}</button>
                        </div>
                        `
    })

    availableOrders.innerHTML = itemsForOrder

}
renderMenu()

document.addEventListener('click', (e) => {
    if (e.target.dataset.food) {
        handleOrder(e.target.dataset.food)
    }
    if (e.target.id === 'order-btn') {
        goToPay()
    }
    if (e.target.id === 'pay-cancel') {
        document.getElementById('payment-details').style.display = 'none'
    }
    if (e.target.id === 'pay') {
        pay(e)
    }

})


function handleOrder(orderId) {
    const myOrder = menuArray.filter((menu) => {
        return menu.id === Number(orderId)
    })[0]
    myOrder.selected = !myOrder.selected
    renderMenu()
    selectedOrder()

}


function pickingOrders() {
    const pickedOrder = menuArray.filter((menu) => {
        return menu.selected

    })
    return pickedOrder
}

function selectedOrder() {

    const selectedOrder = pickingOrders()
    let theOrders = ''
    let price = 0
    selectedOrder.forEach((order) => {
        price += order.price

        theOrders +=
            `
        <div class="the-order">
            <span>${order.name}</span>
            <span id="remove-order" class="remove-order" data-food ="${order.id}">Remove</span>
            <span class="prize-tag">\$${order.price}</span>
        </div>
        `
    })
    document.getElementById('total-price-display').textContent = '$' + price
    document.getElementById('all-my-orders').innerHTML = theOrders

    if (price) {
        yourOrderArea.style.display = 'block'
    } else {
        yourOrderArea.style.display = 'none'
    }
}

function goToPay() {
    document.getElementById('payment-details').style.display = 'flex'
}

function pay(e) {
    e.preventDefault()

    const paymentDetails = document.getElementById('payment-details')
    const derivedPaymentInfo = new FormData(paymentDetails)
    const name = derivedPaymentInfo.get('fullname')

    const cardDetails = derivedPaymentInfo.get('cardNumber')
    const cvv = derivedPaymentInfo.get('CVV')
    if (name && cardDetails && cvv) {
        setTimeout(() => {
            yourOrderArea.innerHTML =
                `
            <div class="successful-div">
            <p class="successful-message"> Thanks, <span>${name}!</span> Your order is on its way!</p>
            </div>
            `

        }, 1000)
        
        document.getElementById('payment-details').style.display = 'none'
    }
    let inputs = document.getElementsByClassName('input-field')
        for (let input of inputs){
            input.value = ''
        }
    let buttons = document.getElementsByClassName('button')
    for (let button of buttons){
        button.disabled = true
    }

}








