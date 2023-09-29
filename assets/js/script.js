const radios = document.querySelectorAll('input[name="percentageTip"]')
const txtBill = document.getElementById("txtBill")
const txtPeople = document.getElementById("txtPeople")
const customTip = document.getElementById("customTip")

const tipAmount = document.querySelector(".amount .value")
const totalAmount = document.querySelector(".total .value")

const resetButton = document.querySelector(".cta .reset-button")

const clearSelectedRadio = (value = '') => {
	[...radios].forEach(elem => {
		if (elem.value !== value) {
			elem.parentElement.classList.remove("selected")
			elem.checked = false
		}
	})
}

const resetOutputs = () => {
	tipAmount.textContent = "$0.00"
	totalAmount.textContent = "$0.00"
	resetButton.disabled = true
}

const resetState = () => {
	clearSelectedRadio()
	txtBill.value = ''
	txtPeople.value = ''
	customTip.value = ''
	resetOutputs()
}

const countTip = () => {
	const bill = txtBill.value
	const people = txtPeople.value
	const percentage = document.querySelector('input[name="percentageTip"]:checked')?.value

	if (bill === '' || (percentage === '' && customTip.value === '') || people === '') {
		resetOutputs()
		return
	}

	const numBill = parseFloat(bill)
	const numPeople = parseFloat(people)
	const numPercent = (customTip.value !== '' ? parseFloat(customTip.value) : parseFloat(percentage)) / 100
	const tip = (numBill * numPercent) / numPeople
	const total = (numBill + tip * numPeople) / numPeople
	tipAmount.textContent = "$" + tip.toFixed(2)
	totalAmount.textContent = "$" + total.toFixed(2)
	resetButton.disabled = false
}

const toggleError = (input, isError) => {
	const spanElem = input.parentElement.querySelector("label > span")
	if (isError) {
		spanElem.classList.add("error-message")
	} else {
		spanElem.classList.remove("error-message")
	}
}

window.addEventListener("load", function(e){
	resetButton.disabled = true

	radios.forEach(elem => {
		elem.addEventListener('change', function(e){
			clearSelectedRadio(elem.value)
			elem.parentElement.classList.add("selected")
			countTip()
		})

		elem.addEventListener('focus', function(e){
			customTip.value = ''
		})
	})

	customTip.addEventListener('focus', function(e){
		clearSelectedRadio()
	})

	customTip.addEventListener('keyup', function(e){
		countTip()
	})

	txtBill.addEventListener('keyup', function(e){
		countTip()
	})

	txtPeople.addEventListener('keyup', function(e){
		if (txtPeople.value === "0") {
			toggleError(txtPeople, true)
			return
		}
		toggleError(txtPeople, false)
		countTip()
	})

	resetButton.addEventListener('click', resetState)
})