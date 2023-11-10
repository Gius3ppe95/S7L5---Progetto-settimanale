let products = [];
let editMode = false;
let productIdToEdit = null;

function submitForm() {
  const name = document.getElementById("name").value;

  // Aggiungi qui la validazione per gli altri campi se necessario
  if (!name) {
    alert("Il campo 'Name' è obbligatorio.");
    return;
  }

  showLoadingIndicator(); // Mostra l'indicatore di caricamento

  if (editMode) {
    const productIndex = products.findIndex((product) => product._id === productIdToEdit);
    if (productIndex !== -1) {
      products[productIndex] = { _id: productIdToEdit, name }; // Aggiungi altri campi
    }
    editMode = false;
  } else {
    const newProduct = { _id: Date.now(), name }; // Aggiungi altri campi
    products.push(newProduct);
  }

  renderProductList();
  resetForm();

  hideLoadingIndicator(); // Nascondi l'indicatore di caricamento
}

function resetForm() {
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
  if (window.confirm("Sei sicuro di voler eliminare questo prodotto?")) {
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
  if (window.confirm("Sei sicuro di voler eliminare questo prodotto?")) {
    deleteProduct(productId);
  }
}

function showLoadingIndicator() {
  // Logica per mostrare l'indicatore di caricamento
}

function hideLoadingIndicator() {
  // Logica per nascondere l'indicatore di caricamento
}
function showError(message) {
  alert(`Errore: ${message}`);
}

function submitForm() {
  const name = document.getElementById("name").value;

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

function deleteProduct(productId) {
  const productToDelete = products.find((product) => product._id === productId);

  if (!productToDelete) {
    showError("Il prodotto da eliminare non è stato trovato.");
    return;
  }

  if (window.confirm("Sei sicuro di voler eliminare questo prodotto?")) {
    products = products.filter((product) => product._id !== productId);
    renderProductList();
    resetForm();
  }
}

// Aggiungi gestione degli errori anche ad altre funzioni se necessario
