const cartTotal = document.querySelector('.total');
const increaseBtns = document.querySelectorAll('.fa-plus-circle');
const decreaseBtns = document.querySelectorAll('.fa-minus-circle');
const quantity = document.querySelectorAll('.quantity');
const deleteBtns = document.querySelectorAll('.fa-trash-alt');
const likeBtns = document.querySelectorAll('.fa-heart');
const unitPrice = document.querySelectorAll('.unit-price');
const productCards = document.querySelectorAll('.p-card');

let qty = 0;
let cart = [];

function calcTotal(cart) {
  // total variable to hold the value of the summation.
  let total = 0;

  // loop through the cart items and add the price*quantity to the total variable
  cart.forEach((item) => {
    total += item.price * item.qty;
  });

  // return the total calculated.
  return total;
}

increaseBtns.forEach((el, i) => {
  el.addEventListener('click', () => {
    // Qty hold the quantity in the html
    qty = ++quantity[i].innerText;

    // Seperate the dollar sign from the number i.e price.
    let price = unitPrice[i].innerText.split(' ').at(0);

    // Set the quantity to the increased quantity.
    quantity[i].innerText = qty;

    // Push the price and quantity to the cart array.
    // Note that every click will add just one quantity to the cart so it's safe to hardcode the one here.
    cart.push({ price, qty: 1 });

    // Function call calculating the total cart.
    let total = calcTotal(cart);
    // Insert cart total into the html.
    cartTotal.textContent = total;
  });
});

decreaseBtns.forEach((el, i) => {
  el.addEventListener('click', () => {
    // This line of code opt out of the function if quantity is already zero. The aim is to ensure that quantity did not go below zero.
    if (+quantity[i].textContent == 0) return;

    // assign the global qty to the new qty from html and decrease it.
    qty = --quantity[i].textContent;

    // Seperate the dollar sign from the number i.e price.
    let price = unitPrice[i].textContent.split(' ').at(0);

    // Push a negative quantity together with the price to the cart array. We know for sure that quantity will be reduced by 1 when we click the minus button.
    cart.push({ price, qty: -1 });
    // Function call calculating the total cart.
    let total = calcTotal(cart);
    // Insert cart total into the html.
    cartTotal.textContent = total;
  });
});

likeBtns.forEach((el, i) => {
  el.addEventListener('click', () => {
    likeBtns[i].style.color = 'red';
  });
});

deleteBtns.forEach((el, i) => {
  el.addEventListener('click', () => {
    // Get the qty of the card to be deleted.
    let deletedQty = +quantity[i].textContent;

    // Get the price of the card to be deleted.
    let price = unitPrice[i].innerText.split(' ').at(0);
    // Push the price and quantity to the cart array but multiply the deleted qty by -1 to turn it to negative.
    cart.push({ price, qty: deletedQty * -1 });

    // Calculate the new cart total
    let total = calcTotal(cart);

    // set it to the cart total in html.
    cartTotal.textContent = total;

    // remove the card from cart
    productCards[i].remove();
  });
});
