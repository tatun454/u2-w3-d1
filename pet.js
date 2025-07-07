const petForm = document.getElementById("petForm");
const petListDiv = document.getElementById("petList");
const pets = []; // Array per memorizzare gli animali domestici

class Pet {
  constructor(petName, ownerName, species, breed) {
    this.petName = petName;
    this.ownerName = ownerName;
    this.species = species;
    this.breed = breed;
  }

  hasSameOwner(otherPet) {
    return this.ownerName === otherPet.ownerName;
  }
}

petForm.addEventListener("submit", function (event) {
  event.preventDefault(); // previene il comportamento di default del form

  const petName = document.getElementById("petName").value;
  const ownerName = document.getElementById("ownerName").value;
  const species = document.getElementById("species").value;
  const breed = document.getElementById("breed").value;

  const newPet = new Pet(petName, ownerName, species, breed);
  pets.push(newPet); // Aggiunge il nuovo animale all'array

  renderPetList(); // aggiorna lista
  petForm.reset(); // pulisce il form
});

function renderPetList() {
  petListDiv.innerHTML = ""; //pulisce lista esistente

  if (pets.length === 0) {
    petListDiv.innerHTML = "<p>Nessun animale domestico registrato ancora.</p>";
    return;
  }

  pets.forEach((pet, index) => {
    const petItem = document.createElement("div");
    petItem.classList.add("pet-item");

    let sameOwnerInfo = "";
    for (let i = 0; i < pets.length; i++) {
      if (index !== i && pet.hasSameOwner(pets[i])) {
        sameOwnerInfo += `<span class="highlight-owner">Condivide il padrone con ${pets[i].petName}</span><br>`;
      }
    }

    petItem.innerHTML = `
                    <p><strong>Nome Animale:</strong> ${pet.petName}</p>
                    <p><strong>Nome Padrone:</strong> ${pet.ownerName}</p>
                    <p><strong>Specie:</strong> ${pet.species}</p>
                    <p><strong>Razza:</strong> ${pet.breed || "N/A"}</p>
                    ${sameOwnerInfo ? `<p>${sameOwnerInfo}</p>` : ""}
                `;
    petListDiv.appendChild(petItem);
  });
}
