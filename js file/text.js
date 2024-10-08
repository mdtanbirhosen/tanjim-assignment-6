// Fetch categories and show buttons
const petButtonShow = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => showButton(data.categories))
        .catch(error => console.error('Error fetching categories:', error));
};

// Handle fetching pets for a specific category
const workToPetButton = async (categoryId) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryId}`);
        const datas = await res.json();
        showpetAll(datas.data);
    } catch (error) {
        console.error('Error fetching pets:', error);
    }
};

// Show buttons for each category
const showButton = (buttons) => {
    const buttonPet = document.getElementById('button-to-all-pet-series');
    buttonPet.innerHTML = ''; // Clear previous buttons
    buttonPet.classList.add('flex', 'justify-center', 'items-center', 'rounded-2xl', 'py-6', 'px-14', 'border', 'rounded-xl');

    buttons.forEach(button => {
        const petButton = document.createElement('button');
        petButton.className = 'btn bg-[#0e7a81] m-2'; // Adjust styling as needed
        petButton.innerText = button.category; // Use the correct property name for button
        petButton.onclick = () => workToPetButton(button.id); // Correctly set the onclick handler
        buttonPet.appendChild(petButton); // Append the button to the container
    });
};

// Fetch all pets and show them
const petAll = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => showpetAll(data.pets))
        .catch(error => console.error('Error fetching pets:', error));
};

// Show all pets
const showpetAll = (pets) => {
    const petCardContainer = document.getElementById('card-pet');
    petCardContainer.innerHTML = ''; // Clear previous pets
    petCardContainer.classList.add('grid');

    if (pets.length === 0) {
        petCardContainer.classList.remove('grid');
        petCardContainer.innerHTML = `
            <div class="flex flex-col justify-center items-center text-center my-28">
                <img src="./images/error.webp" alt="">
                <h1 class="text-3xl font-bold">No information available</h1>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            </div>
        `;
        return;
    }

    pets.forEach(item => {
        const createpetContent = document.createElement('div');
        createpetContent.classList = "col-span-1"; // Adjust to your grid system
        createpetContent.innerHTML = `
            <div class="card bg-base-100 w-96 shadow-xl">
                <figure class="px-10 pt-10">
                    <img src="${item.image}" alt="" class="rounded-xl" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${item.pet_name}</h2>
                    <p class="flex items-center"><span><img src="./images/breed.png" alt=""></span>Breed: ${item.breed}</p>
                    <p class="flex items-center"><span><img src="./images/birth.png" alt=""></span>Birth: ${item.date_of_birth}</p>
                    <p class="flex items-center"><span><img src="./images/gender.png" alt=""></span>Gender: ${item.gender}</p>
                    <p class="flex items-center"><span><img src="./images/price.png" alt=""></span>Price: ${item.price}</p>
                    <div class="divider"></div>
                    <div class="flex justify-between">
                        <button onclick="clickLikeButton(${item.petId})" class="btn border bg-white rounded-lg"><img src="./images/like.png" alt=""></button>
                        <button class="btn border bg-white rounded-lg">Adopt</button>
                        <button onclick="detailsModal(${item.petId})" class="btn border bg-white rounded-lg">Details</button>
                    </div>
                </div>
            </div>
        `;
        petCardContainer.appendChild(createpetContent);
    });
};

// Handle like button
const clickLikeButton = async (petId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await res.json();
    const likeButton = document.getElementById('like-button-container');
    const createLikeContent = document.createElement('div');
    createLikeContent.classList = 'col-span-1';
    createLikeContent.innerHTML = `<img class="rounded-lg" src="${data.petData.image}" alt="">`;
    likeButton.appendChild(createLikeContent);
};

// Show details in modal
const detailsModal = async (petId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await res.json();
    const modalContainer = document.getElementById('modal-details');
    modalContainer.innerHTML = `
        <dialog id="my_modal_4" class="modal">
            <div class="modal-box w-4/5 max-w-5xl">
                <div class="w-full mx-auto h-80">
                    <img class="w-full h-full object-cover rounded-2xl" src="${data.petData.image}" alt="">
                </div>
                <h3 class="text-2xl font-bold">${data.petData.pet_name}</h3>
                <p>Breed: ${data.petData.breed}</p>
                <p>Gender: ${data.petData.gender}</p>
                <p>Vaccinated: ${data.petData.vaccinated_status}</p>
                <p>Date of Birth: ${data.petData.date_of_birth}</p>
                <p>Price: ${data.petData.price}</p>
                <div class="divider"></div>
                <div>${data.petData.pet_details}</div>
                <div class="modal-action">
                    <form method="dialog" class="w-full">
                        <button class="btn w-full">Cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    `;
    const modal = document.getElementById('my_modal_4');
    modal.showModal();
};

// Initialize the app
petButtonShow();
petAll();
