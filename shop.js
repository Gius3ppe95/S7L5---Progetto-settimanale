let products = [];
let editMode = false;
let productIdToEdit = null;
let loading = false;

function submitForm() {
  const name = document.getElementById("name").value;

  // Aggiungi qui la validazione per gli altri campi se necessario
  if (!name) {
    showError("Il campo 'Name' è obbligatorio.");
    return;
  }

  showLoadingIndicator();

  if (editMode) {
    const productIndex = products.findIndex((product) => product._id === productIdToEdit);
    if (productIndex !== -1) {
      products[productIndex] = { _id: productIdToEdit, name }; // Aggiungi altri campi
    } else {
      showError("Il prodotto da modificare non è stato trovato.");
    }
    editMode = false;
  } else {
    const newProduct = { _id: Date.now(), name }; // Aggiungi altri campi
    products.push(newProduct);
  }

  renderProductList();
  resetForm();

  hideLoadingIndicator();
}

function resetForm() {
  const isFormDirty = isFormEdited();

  if (isFormDirty) {
    const confirmation = window.confirm("Sei sicuro di voler resettare il form? Tutte le modifiche saranno perse.");
    if (!confirmation) {
      return;
    }
  }

  document.getElementById("productForm").reset();
  editMode = false;
  productIdToEdit = null;
}

function editProduct(productId) {
  const productToEdit = products.find((product) => product._id === productId);
  if (productToEdit) {
    document.getElementById("name").value = productToEdit.name;
    // Popola gli altri campi del form
    editMode = true;
    productIdToEdit = productId;
  }
}

function deleteProduct(productId) {
  const productToDelete = products.find((product) => product._id === productId);

  if (!productToDelete) {
    showError("Il prodotto da eliminare non è stato trovato.");
    return;
  }

  if (window.confirm(`Sei sicuro di voler eliminare il prodotto: ${productToDelete.name}?`)) {
    products = products.filter((product) => product._id !== productId);
    renderProductList();
    resetForm();
  }
}

function renderProductList() {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  products.forEach((product) => {
    const listItem = document.createElement("li");

    const productInfo = document.createElement("strong");
    productInfo.textContent = `${product.name} - ${product.description} - ${product.price}`;
    listItem.appendChild(productInfo);

    const editButton = document.createElement("button");
    editButton.textContent = "Modifica";
    editButton.addEventListener("click", () => editProduct(product._id));
    listItem.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Cancella";
    deleteButton.addEventListener("click", () => confirmDelete(product._id));
    listItem.appendChild(deleteButton);

    const detailsButton = document.createElement("button");
    detailsButton.textContent = "Scopri di più";
    detailsButton.addEventListener("click", () => showProductDetails(product._id));
    listItem.appendChild(detailsButton);

    productList.appendChild(listItem);
  });
}

function confirmDelete(productId) {
  const productToDelete = products.find((product) => product._id === productId);

  if (!productToDelete) {
    showError("Il prodotto da eliminare non è stato trovato.");
    return;
  }

  const confirmation = window.confirm(`Sei sicuro di voler eliminare il prodotto: ${productToDelete.name}?`);
  if (confirmation) {
    deleteProduct(productId);
  }
}

function showProductDetails(productId) {
  const product = products.find((product) => product._id === productId);

  if (!product) {
    showError("Dettagli del prodotto non disponibili.");
    return;
  }

  // Aggiungi qui la logica per visualizzare i dettagli del prodotto (se necessario)
}

function isFormEdited() {
  const nameInput = document.getElementById("name");
  // Aggiungi qui la verifica per altri campi del form
  return nameInput.value.trim() !== "";
}

function showLoadingIndicator() {
  loading = true;
  renderLoadingIndicator();
}

function hideLoadingIndicator() {
  loading = false;
  renderLoadingIndicator();
}

function renderLoadingIndicator() {
  const container = document.querySelector(".container");
  const loadingIndicator = document.getElementById("loadingIndicator");

  if (loading) {
    if (!loadingIndicator) {
      const indicator = document.createElement("div");
      indicator.id = "loadingIndicator";
      indicator.textContent = "Caricamento in corso...";
      container.appendChild(indicator);
    }
  } else {
    if (loadingIndicator) {
      container.removeChild(loadingIndicator);
    }
  }
}

function showError(message) {
  alert(`Errore: ${message}`);
}
