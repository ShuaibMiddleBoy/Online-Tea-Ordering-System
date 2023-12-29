function zoom(e) {
	var zoomer = e.currentTarget;
	e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
	e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX
	x = offsetX / zoomer.offsetWidth * 100
	y = offsetY / zoomer.offsetHeight * 100
	zoomer.style.backgroundPosition = x + '% ' + y + '%';
}

// Function to update totals and cart data
function updateTotals() {
const subTotalElement = document.getElementById('subTotal');
const addonsTotalElement = document.getElementById('addonsTotal');
const totalElement = document.getElementById('total');

// Initial values
let subTotal = 11.00;
let addonsTotal = 0.00;
let total = 0.00; // Initialize total


const aloeShotSelect = document.getElementById("aloeShot");
const energyTeaSelect = document.getElementById("energyTea");
const teaTempSelect = document.getElementById("teaTemperature");
const mealShakeSelect = document.getElementById("mealShake");
const proteinSelect = document.getElementById('protein');
const quantityInput = document.getElementById("quantity");
const refreshMe = document.getElementById("refreshMe");

const aloeShotValue = aloeShotSelect.value;
const energyTeaValue = energyTeaSelect.value;
const teaTempValue = teaTempSelect.value;
const mealShakeValue = mealShakeSelect.value;
const proteinSelectValue = proteinSelect.value;
const quantity = parseInt(quantityInput.value);
const refreshMeValue = refreshMe.value;

if (proteinSelectValue === "Yes ($1.50)") {
// Calculate the addon price based on quantity
const addonPricePerQuantity = 1.50 * quantity;
addonsTotal += addonPricePerQuantity;
}

const selectedAddons = [];
const addonCheckboxes = document.querySelectorAll(".addon:checked");
addonCheckboxes.forEach((checkbox) => {
const addonName = checkbox.name;
const addonPrice = parseFloat(checkbox.getAttribute("data-price"));
const addonQuantity = quantity;
const addonTotal = addonPrice * addonQuantity;

selectedAddons.push({
	name: addonName,
	price: addonPrice.toFixed(2),
	quantity: addonQuantity,
	total: addonTotal.toFixed(2),
});

addonsTotal += addonTotal;
});

addonsTotalElement.textContent = addonsTotal.toFixed(2);
subTotal = 11 * quantity;
subTotalElement.textContent = subTotal.toFixed(2);
total = subTotal + addonsTotal;
totalElement.textContent = total.toFixed(2);


const subtotalPlaceholder = document.getElementById('subtotalPlaceholder');
// const handlingFeeplaceholder = document.getElementById('handlingFeeplaceholder');
const totalPlaceholder = document.getElementById('totalPlaceholder');
const mainTotalPlaceholder = document.getElementById('mainTotalPlaceholder');
mainTotalPlaceholder.textContent = `$${subTotal.toFixed(2)}`;
subtotalPlaceholder.textContent = `$${subTotal.toFixed(2)}`;
// handlingFeeplaceholder.textContent = `$${addonsTotal.toFixed(2)}`;
total = subTotal + addonsTotal;
totalPlaceholder.textContent = `$${total.toFixed(2)}`;


const cartData = {
productName: "REFRESHME COMBO",
refreshMe : refreshMeValue,
total : 11.00,
aloeShot: aloeShotValue,
energyTea: energyTeaValue,
teaTemperature: teaTempValue,
mealShake: mealShakeValue,
protein: proteinSelectValue,
quantity: quantity,
subTotal: subTotal.toFixed(2),
addonsTotal: addonsTotal.toFixed(2),
total: total.toFixed(2),
addons: selectedAddons,
comments : "",
};

return cartData;
}


// Function to show the modal
function openModal() {
var modal = document.getElementById('myModal');
modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
var modal = document.getElementById('myModal');
modal.style.display = 'none';
}


// Event listener to close the modal when clicking on the close button
var closeBtn = document.getElementsByClassName('close')[0];
closeBtn.addEventListener('click', closeModal);

// Event listener to close the modal when clicking outside the modal content
window.addEventListener('click', function (event) {
var modal = document.getElementById('myModal');
if (event.target === modal) {
closeModal();
}
});

// Function to send data to the server
function sendDataToServer(data) {

    const commentsTextarea = document.querySelector('textarea[name="comments"]');
    const comments = commentsTextarea.value;
    data.comments = comments;


    // address
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const companyName = document.getElementById('companyName').value;
    const houseNumAndStreetName = document.getElementById('houseNumAndStreetName').value;
    const apartmentSuiteUnitETC = document.getElementById('ApartmentSuiteUnitETC').value;
    const townCity = document.getElementById('townCity').value;
    const state = document.getElementById('state').value;
    const zipCode = document.getElementById('zipCode').value;
    const phone = document.getElementById('phone').value;
    const emailAddress = document.getElementById('emailAddress').value;
    const orderNotes = document.getElementById('orderNotes').value;
    const orderUpdatesCheckbox = document.getElementById('orderUpdates');
    const orderUpdatesValue = orderUpdatesCheckbox.checked;

    if(firstName === "" || houseNumAndStreetName === "" || townCity === "" || state === "" || zipCode === "" || phone === "" || emailAddress === "" ){
        alert("Please fill out all required fields.");
    }else{
        data.firstName = firstName
        data.lastName = lastName;
        data.companyName = companyName;
        data.houseNumAndStreetName = houseNumAndStreetName;
        data.apartmentSuiteUnitETC = apartmentSuiteUnitETC;
        data.townCity = townCity;
        data.state = state;
        data.zipCode = zipCode;
        data.phone = phone;
        data.emailAddress = emailAddress;
        data.orderNotes = orderNotes;
        data.orderUpdatesValue = orderUpdatesValue;


    fetch('http://localhost:3000/webhook', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    .then(response => response.json())
    .then(responseData => {
    // If successful, show the success modal
    openModal();
    })
    .catch(error => {
    console.error('Error sending data to server:', error);
    });
    }


}

// Add event listeners to selection elements and checkboxes
const selectionElements = document.querySelectorAll("select, input[type='checkbox'], input[type='radio']");
selectionElements.forEach((element) => {
element.addEventListener("change", updateTotals);
});

// Add to cart functionality
const quantityInput = document.getElementById("quantity");

quantityInput.addEventListener("input", () => {
const productQuantity = document.getElementById('productQuantityPlaceholder');
productQuantity.innerHTML = "<b>"+ parseInt(quantityInput.value) + "</b>";
const quantity = parseInt(quantityInput.value);
if (isNaN(quantity)) {
document.getElementById("subTotal").textContent = "0.00";
} else {
const subTotal = 11 * quantity;
document.getElementById("subTotal").textContent = subTotal.toFixed(2);
}
updateTotals();
});

document.getElementById("subTotal").textContent = "11.00";

function proceedToCheckout(e) {
    e.preventDefault();
    const cartData = updateTotals();
    sendDataToServer(cartData);
}


const aloeShotSelect = document.getElementById("aloeShot");
const energyTeaSelect = document.getElementById("energyTea");
const teaTempSelect = document.getElementById("teaTemperature");
const mealShakeSelect = document.getElementById("mealShake");
const proteinSelect = document.getElementById('protein');
const refreshMe = document.getElementById("refreshMe");


// your order table
refreshMe.addEventListener('input', updateYourOrderTable);
aloeShotSelect.addEventListener('input', updateYourOrderTable);
energyTeaSelect.addEventListener('input', updateYourOrderTable);
teaTempSelect.addEventListener('input', updateYourOrderTable);
mealShakeSelect.addEventListener('input', updateYourOrderTable);
proteinSelect.addEventListener('input', updateYourOrderTable);
const addonCheckboxes = document.querySelectorAll('.addon');


addonCheckboxes.forEach((checkbox)=>{
    checkbox.addEventListener('change', updateYourOrderTable)
})

function updateYourOrderTable(){
    const refreshMeValue = refreshMe.value;
    const aloeShotValue = aloeShotSelect.value;
    const energyTeaValue = energyTeaSelect.value;
    const teaTemperatureValue = teaTempSelect.value;
    const mealShakeValue =  mealShakeSelect.value;
    const proteinValue = proteinSelect.value;
    document.getElementById('refreshMePlaceholder').textContent = `ReFreshMe: ${refreshMeValue}`;
    document.getElementById('aloeShotPlaceholder').textContent = `Aloe Shot: ${aloeShotValue} `;
    document.getElementById('energyTeaPlaceholder').textContent = `Energy Tea: ${energyTeaValue} `;
    document.getElementById('teaTempPlaceholder').textContent = `Do You Want Your Tea Hot or Cold? ${teaTemperatureValue} `;
    document.getElementById('healtyMilkShakePlaceholder').textContent = `Healthy Meal Shake: ${mealShakeValue} `;
    document.getElementById('proteinPlaceholder').textContent = ` Want to Up Your Protein? ${proteinValue} `;

    const selectedAddons = [];
    addonCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            const addonName = checkbox.name;
            const addonPrice = parseFloat(checkbox.getAttribute("data-price"));
            selectedAddons.push(`${addonName} ($${addonPrice.toFixed(2)})`);
        }
    });
    const addonsPlaceholder = document.getElementById('addonsPlaceholder');
    addonsPlaceholder.textContent = selectedAddons.join(', ');
}
