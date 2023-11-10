let products = [];
let editMode = false;
let productIdToEdit = null;

function submitForm() {
  const name = document.getElementById("name").value;
  // Altri campi del form (description, price, imageUrl)

  if (editMode) {
    const productIndex = products.findIndex((product) => product._id === productIdToEdit);
    if (productIndex !== -1) {
      products[productIndex] = { _id: productIdToEdit, name }; // altri campi
    }
    editMode = false;
  } else {
    const newProduct = { _id: Date.now(), name }; //altri campi
    products.push(newProduct);
  }

  renderProductList();
  resetForm();
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
    // popola gli altri campi del form
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
    deleteButton.addEventListener("click", () => deleteProduct(product._id));
    listItem.appendChild(deleteButton);

    const detailsButton = document.createElement("button");
    detailsButton.textContent = "Scopri di più";
    detailsButton.addEventListener("click", () => showProductDetails(product._id));
    listItem.appendChild(detailsButton);

    productList.appendChild(listItem);
  });
}
