const petButtonShow = () => {
    fetch(' https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => showButton(data.categories)
            
        )
}

const showButton = (buttons) => {
    const buttonPet = document.getElementById('button-to-all-pet-series');
    buttons.forEach(button => {
        // console.log(button.id);
        const petbutton = document.createElement('div');

        petbutton.innerHTML = `
        
        <button id="${button.id}" onclick="workToPetButton('${button.category}')" class="flex  items-center rounded-2xl py-6 px-14 border settimeout"><img class="w-14 h-14 "src="${button.category_icon}" alt=""><span class="text-2xl font-bold">${button.category}</span>
        </button>
        
        `
        
        buttonPet.appendChild(petbutton)

    });
}
petButtonShow()

const workToPetButton = async (category) => {
    // Remove active class from all buttons first
    const buttons = document.querySelectorAll('#button-to-all-pet-series button');
    buttons.forEach(button => {
        button.classList.remove('bg-[#0e7a81]', 'text-white');
        button.classList.add('bg-white', 'text-black', );
    });

    // Add active class to the clicked button
    const clickedButton = document.querySelector(`#button-to-all-pet-series button[onclick="workToPetButton('${category}')"]`);
    clickedButton.classList.add('bg-[#0e7a81]', 'text-white','rounded-xl'); // Add a background color and change text color
    clickedButton.classList.remove('bg-white', 'text-black', ); // Remove default styles if any

    // Fetch the data as before
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
    const datas = await res.json();
    const data = datas.data;

    const cardpet = document.getElementById('card-pet');
    cardpet.classList.remove('grid', 'h-[400px]');
    cardpet.classList.add('my-auto', 'h-[400px]');
    cardpet.innerHTML = `
        <div class="flex justify-center items-center"><span class="loading loading-bars loading-md"></span></div>
    `;
    
    setTimeout(() => {
        cardpet.innerHTML = "";
        cardpet.classList.add('grid');
        cardpet.classList.remove('h-[400px]', 'my-auto');
        showpetAll(data);
    }, 2000);
}




const petAll = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => {
            showpetAll(data.pets)
            
        }
        )

    // <span class="loading loading-bars loading-md"></span>
    
}


// setTimeout(() => {
//     loading()
//     // petAll()
// }, 2000);
const showpetAll = (pet) => {
    // console.log(pet);
    document.getElementById('short-btn').addEventListener('click', () => {shortbutton(pet)
        
    })
    const petCardContainer = document.getElementById('card-pet');
    petCardContainer.classList.add('grid')
    petCardContainer.innerHTML = ''
    if (pet.length === 0) {
        petCardContainer.classList.remove('grid')
        petCardContainer.innerHTML = `
        <div class="flex flex-col justify-center items-center text-center my-28">
        <div><img src="./images/error.webp" alt=""></div>
        <h1 class="text-3xl font-bold">no information available</h1>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at <br>
            its layout. The point of using Lorem Ipsum is that it has a.</p>
    </div>
        `
    }
    
    pet.forEach(item => {
        // console.log(item);

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
        <p class="flex items-center"><span><img src="./images/breed.png" alt=""></span>breed: ${item.breed = item.breed? item.breed : 'no data is here'}</p>
        <p class="flex items-center"><span><img src="./images/birth.png" alt=""></span>birth: ${item.date_of_birth = item.date_of_birth ? item.date_of_birth : 'i dont now'}</p>
        <p class="flex items-center"><span><img src="./images/gender.png" alt=""></span>gender: ${item.gender = item.gender ? item.gender : 'no data difined'}</p>
        <p class="flex items-center"><span><img src="./images/price.png" alt=""></span>price: ${item.price === null ? 'no data' : item.price}</p>
        <div class="divider"></div>
        <div class="flex justify-between">
        <button onclick="clickLikeButton(${item.petId})"" class="btn border bg-white rounded-lg"><img src="./images/like.png" alt=""></button>
        <button id="adopt${item.petId}" onclick="adoptButton(${item.petId})" class="btn border bg-white rounded-lg adapt-disable">adopt</button>
        <button onclick="detailsModal(${item.petId})" class="btn border bg-white rounded-lg">details</button>
        </div>
    </div>
</div>
        `
        petCardContainer.appendChild(createpetContant);
        
        
    });
}
const shortbutton = (pet) => {
    pet.sort((a,b) => b.price-a.price)
    showpetAll(pet)
    
}

// click like to do something
const clickLikeButton = async (Some) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${Some}`)
    const datas = await res.json();
    const data = datas.petData;
    // console.log(data);
    const likeButton = document.getElementById('like-button-container');
    const createlikeContant = document.createElement('div');
    createlikeContant.classList = 'col-span-$ ';
    createlikeContant.innerHTML = `
    <img class="rounded-lg" src="${data.image}" alt="">
    `
    likeButton.appendChild(createlikeContant)
}

const adoptButton = async(some) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${some}`)
    const datas = await res.json();
    const data = datas.petData;
    let coundoun = 4;
    // const adoptmainbtn = document.getElementById('adopt-button')
    const adoptModalShow = document.getElementById('modal-adopt');
    
    adoptModalShow.innerHTML = `
    <dialog id="my_modal_1" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Hello!</h3>
        <p class="py-4">Press ESC key or click the button below to close</p>
        <div id="coundoun"></div>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn hidden close">Close</button>
          </form>
        </div>
      </div>
    </dialog>
    `
    const coundouning =setInterval(() => {
        coundoun = coundoun - 1
        const coundounApp = document.getElementById('coundoun');
        coundounApp.innerHTML = `
        <h1>${coundoun}</h1>
        `
        // console.log(coundoun);
        
    }, 1000);
    const adoptbtn = document.getElementById(`adopt${some}`).innerText = 'adopted'
    
    setTimeout(() => {
        clearInterval(coundouning);
        document.querySelector('.close').click()
        adoptbtn
    }, 4000);
    my_modal_1.showModal()
    document.getElementById(`adopt${some}`).setAttribute('disabled','true')
    
}

const detailsModal = async (some) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${some}`)
    const datas = await res.json();
    const data = datas.petData;
    // console.log(data)
    const modalContainer = document.getElementById('modal-details')
    console.log(data.breed);

    modalContainer.innerHTML = `

<dialog id="my_modal_4" class="modal">
  <div class="modal-box w-4/5 max-w-5xl">
    <div class="w-full mx-auto h-80"><img class="w-full h-full object-cover rounded-2xl" src="${data.image}" alt=""></div>
    <div>
    <div>
        <h3 class="text-2xl font-bold">${data.pet_name}</h3>
        <p>${data.breed = data.breed ? data.breed: 'no data is here'}</p>
        <p>${data.gender = data.gender ? data.gender : 'this data is not available'}</p>
        <p>${data.vaccinated_status === 'not' ? 'not available' : data.vaccinated_status}</p>
        <p>${data.date_of_birth = data.date_of_birth ? data.date_of_birth : 'i dont now'}</p>
        <p>${data.price === null ? 'not defined' : data.price}</p>
    </div>
    <div class="divider"></div>
    <div>${data.pet_details
        }</div>
    <div class="modal-action ">
      <form method="dialog" class="w-full">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn w-full">Cencel</button>
      </form>
    </div>
    </div>
  </div>
</dialog>
    `
    my_modal_4.showModal()
    // data.forEach(item => {
    //     console.log(item);


    // });
}
petAll();

