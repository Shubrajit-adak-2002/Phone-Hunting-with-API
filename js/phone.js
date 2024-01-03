const loadPhone = async (input = '13', isShowAll) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${input}`);
    const data = await res.json();
    const phone = data.data
    // Storing the id of "Not Available" text id
    const notAvailable = document.getElementById('not-available')

    // Setting a condition if there is no matching data then show "Not Available"
    if (phone.length === 0) {
        available();
    }
    else {
        showPhones(phone, isShowAll);
        notAvailable.classList.add('hidden');
    }

}

// This function will show the in a card form with the help of a forEach loop
const showPhones = (phones, isShowAll) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('p-container')
    // clear data before adding new data 
    phoneContainer.innerHTML = '';

    // Making condition if cards length greater than 11 yhrn show 'Show All' button otherwise not
    const container = document.getElementById('show-all')
    if (phones.length > 11 && !isShowAll) {
        container.classList.remove('hidden')
    }
    else {
        container.classList.add('hidden')
    }

    console.log('Is show all', isShowAll);
    // Setting limit of cards
    if (!isShowAll) {
        phones = phones.slice(0, 11);
    }

    phones.forEach(phone => {
        // console.log(phone);
        // creating a div element
        const phoneCard = document.createElement('div')
        phoneCard.classList = `card card-compact p-4 bg-gray-100 shadow-xl`

        // set innerHTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title text-center">${phone.phone_name}</h2>
                <p>There are many variations of passages of available, but the majority have suffered</p>
                <p class="font-bold text-2xl text-center text-black">$999</p>
                <div class="card-actions justify-center">
                <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">SHOW DETAILS</button>
                </div>
        </div>`;
        // append child
        phoneContainer.appendChild(phoneCard);
    })
    spinner(false)
}

// Making a function that will help to find data
const search = (isShowAll) => {
    const searchText = document.getElementById('search-field');
    const searchValue = searchText.value;
    spinner(true)
    searchText.value = '';
    // console.log(searchValue);
    loadPhone(searchValue, isShowAll);
}
// Making a function that will show spinner or loader while loading data
const spinner = (isSpinning) => {
    const loader = document.getElementById('spinner')
    if (isSpinning) {
        loader.classList.remove('hidden')
    }
    else {
        loader.classList.add('hidden')
    }
}

const showAll = () => {
    search(true)
}

// Making a function when a data is not found then it will show 'Not Available'
const available = () => {
    // Storing the not available id
    const notAvailable = document.getElementById('not-available');
    // Removing hidden class from 'Not Available' text
    notAvailable.classList.remove('hidden');
    // Disablinng the loader or spinner
    spinner(false);

    // Storing the id of div where all the cards or data will be shown
    const phoneContainer = document.getElementById('p-container')
    // clearing the existing data
    phoneContainer.innerHTML = ''

    // Storing the 'show all' button id and also hinding the 'show all' button
    const container = document.getElementById('show-all')
    container.classList.add('hidden');
}

// This function show the details of phone
const showDetails = async (id) => {
    // console.log('click', id);
    // Load data
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await response.json();
    const phone = data.data
    phoneDetails(phone);
}

// This function will show the details of phone in modal
const phoneDetails = (phone) => {
    console.log(phone);
    my_modal_details.showModal()
    const details = document.getElementById('phone-name');
    details.innerText = phone.name
    const phone_details_container = document.getElementById('phone-details-container')
    phone_details_container.innerHTML = `
    <img class="ml-[150px]" src="${phone.image}" alt=""/><br>
    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p><br>
    <h4><span class="font-bold">Storage: </span>${phone.mainFeatures.storage}</h4><br>
    <h4><span class="font-bold">Display size: </span>${phone.mainFeatures.displaySize}</h4><br>
    <h4><span class="font-bold">Chip Set </span>${phone.mainFeatures.chipSet}</h4><br>
    <h4><span class="font-bold">Memory: ${phone.mainFeatures.memory}</span></h4><br>
    <h4><span class="font-bold">Slug: </span>${phone.slug}</h4><br>
    <h4><span class="font-bold">Release Date: </span>${phone.releaseDate}</h4><br>
    <h4><span class="font-bold">Brand: </span>${phone.brand}</h4><br>
    <h4><span class="font-bold">GPS: </span>${phone?.others?.GPS || 'No GPS'}</h4>`
}

loadPhone();