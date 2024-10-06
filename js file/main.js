const petButtonShow = () => {
    fetch(' https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => showButton(data.categories))
}

const showButton = (buttons) => {
    buttons.forEach(button => {
        // console.log(button);

        const buttonPet = document.getElementById('button-to-all-pet-series');
        const petbutton = document.createElement('div');
        petbutton.classList = ' '
        petbutton.innerHTML = `
        <button class="flex items-center gap-5 border rounded-2xl py-6 px-14"><img class="w-14 h-14 " src="${button.category_icon}" alt=""><span class="text-2xl font-bold">${button.category}</span>
        </button>
        `
        buttonPet.appendChild(petbutton);
    });
}
petButtonShow()

const petAll = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => showpetAll(data.pets))
}

const showpetAll = (pet) => {
    // console.log(pet);

    pet.forEach(item => {
        // console.log(item);
        const petCardContainer = document.getElementById('card-pet');
        const createpetContant = document.createElement('div');
        createpetContant.classList = "col-span-$";
        createpetContant.innerHTML = `
        <div class="card bg-base-100 w-96 shadow-xl">
    <figure class="px-10 pt-10">
        <img src="${item.image}" alt=""
            class="rounded-xl" />
    </figure>
    <div class="card-body ">
        <h2 class="card-title">${item.pet_name}</h2>
        <p class="flex items-center"><span><img src="./images/breed.png" alt=""></span>breed: ${item.breed}</p>
        <p class="flex items-center"><span><img src="./images/birth.png" alt=""></span>birth: ${item.date_of_birth}</p>
        <p class="flex items-center"><span><img src="./images/gender.png" alt=""></span>gender: ${item.gender}</p>
        <p class="flex items-center"><span><img src="./images/price.png" alt=""></span>price: ${item.price}</p>
        <div class="divider"></div>
        <div class="flex justify-between">
        <button onclick="clickLikeButton()"" class="btn border bg-white rounded-lg"><img src="./images/like.png" alt=""></button>
        <button class="btn border bg-white rounded-lg">adopt</button>
        <button onclick="detailsModal()" class="btn border bg-white rounded-lg">details</button>
        </div>
    </div>
</div>
        `
        petCardContainer.appendChild(createpetContant);
    });

}
const detailsModal = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/1`)
    const datas = await res.json();
    const data = datas.petData;
    console.log(data)
    const modalContainer = document.getElementById('modal-details')
    modalContainer.innerHTML = `
    <dialog id="my_modal_1" class="modal">
  <div class="modal-box">
    <div><img class="w-full" src="${data.image}" alt=""></div>
    <div>
    <div>
        <h3 class="text-2xl">${data.pet_name}</h3>
        <p>${data.breed}</p>
        <p>${data.gender}</p>
        <p>${data.vaccinated_status}</p>
        <p>${data.date_of_birth}</p>
        <p>${data.price}</p>
    </div>
    <div class="modal-action w-full">
      <form method="dialog" class="w-full">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn w-full">Cencel</button>
      </form>
    </div>
    </div>
    
  </div>
</dialog>
    `
    my_modal_1.showModal()
    // data.forEach(item => {
    //     console.log(item);

        
    // });
}
petAll();

