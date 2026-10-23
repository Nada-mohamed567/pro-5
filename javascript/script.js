let inputProduct = document.getElementById("inputProduct");
let inputPrice = document.getElementById("inputPrice");
let inputDesc = document.getElementById("inputDesc");
let addBtn = document.getElementById("addBtn");
let cancelBtn = document.getElementById("cancelBtn");
let count = document.getElementById("count");
let content = document.getElementById("content");
let searchProduct = document.getElementById("searchProduct"); 
let emptyMessage = document.getElementById("emptyMessage");
let formTitle = document.getElementById("formTitle");

let edit = null; 
let nextId = 6;

let allProducts = [
    { id: 1, name: "iPhone 16",
        price: 45000, desc: "Modern design, advanced camera and fast performance.",
        image: "image/iphone 16.jpg"},

    { id: 2, name: "Samsung Galaxy S25",
        price: 42000, desc: "Powerful performance, advanced display and great cameras.", 
       image: "image/Samsung Galaxy S25.jpg"},

    { id: 3, name: "Redmi Note 14",
        price: 10000, desc: "Large display and practical features for everyday use.",
        image: "image/Redmi Note 14.jpg"},

    { id: 4, name: "iPhone 15",
        price: 35000, desc: "Elegant design with reliable performance and quality photos.", 
        image: "image/iphone15.jpg"},

    { id: 5, name: "Samsung Galaxy A56",
        price: 22000, desc: "Stylish smartphone with a bright display and versatile camera.",
        image: "image/Samsung Galaxy A56.webp"}
]; 


// Enable Add Button

function checkInputs() {
    if (
        inputProduct.value.trim() != "" &&
        inputPrice.value != "" &&
        Number(inputPrice.value) > 0 &&
        inputDesc.value.trim() != ""
    ) {
        addBtn.disabled = false;
    } else {
        addBtn.disabled = true;
    }
}

inputProduct.addEventListener("input", checkInputs);
inputPrice.addEventListener("input", checkInputs);
inputDesc.addEventListener("input", checkInputs);


// Show Products

function drow() {
    content.innerHTML = "";

    let searchValue = searchProduct.value.toLowerCase();
    let filteredProducts = allProducts.filter(function(product) {
        return (
            product.name.toLowerCase().includes(searchValue) || product.desc.toLowerCase().includes(searchValue)
        );
    });

    filteredProducts.forEach(function(ele) {
        content.innerHTML += `
            <div class="product-card">

                <div class="product-image">
               
    ${ele.image ? `<img src="${ele.image}" alt="${ele.name}">` : `<i class="fa-solid fa-mobile-screen-button"></i>`}

                </div>

                <h3>${ele.name}</h3>   

                <p class="description">${ele.desc}</p>

                <p class="product-price">
                    ${Number(ele.price).toLocaleString("en-US")} EGP
                </p>

                <div class="product-actions">

                    <button class="edit-btn" onclick="editBtn(${ele.id})">
                        <i class="fa-solid fa-pen"></i>
                        Edit
                    </button>

                    <button class="delete-btn" onclick="deleteBtn(${ele.id})">
                        <i class="fa-solid fa-trash"></i>
                        Delete
                    </button>

                </div>
            </div>
        `;
    });

    count.innerHTML = allProducts.length + " Products";

    if (filteredProducts.length == 0) {
        emptyMessage.hidden = false;
    } else { 
        emptyMessage.hidden = true;
    }
}


// Clear Form

function clearForm() {
    inputProduct.value = "";
    inputPrice.value = "";
    inputDesc.value = "";

    edit = null;
    addBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Product';

    cancelBtn.hidden = true;
    formTitle.innerHTML = "Add New Product";

    checkInputs();
}


// Edit Product

function editBtn(id) {
    let findProduct = allProducts.find(function(product) {
        return product.id === id;
    });

    if (findProduct) {
        inputProduct.value = findProduct.name;
        inputPrice.value = findProduct.price;
        inputDesc.value = findProduct.desc;

        edit = id;
        addBtn.innerHTML = '<i class="fa-solid fa-check"></i> Save Changes';

        cancelBtn.hidden = false;
        formTitle.innerHTML = "Edit Product";

        checkInputs();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}


// Add Or Save Edit

addBtn.addEventListener("click", function() {
    let name = inputProduct.value.trim();
    let price = Number(inputPrice.value);
    let desc = inputDesc.value.trim();

    if (name == "" || inputPrice.value == "" || price <= 0 || desc == "") {
        Swal.fire({
            title: "Missing Information",
            text: "Please fill in all product fields correctly.",
            icon: "warning",
            confirmButtonColor: "#7664DC"
        });

        return;
    }

    let duplicate = allProducts.some(function(product) {
        return (
            product.name.toLowerCase() == name.toLowerCase() && product.id !== edit
        );
    });

    if (duplicate) {
        Swal.fire({
            title: "Product Already Exists",
            text: "Please use a different product name.",
            icon: "warning",
            confirmButtonColor: "#7664DC"
        });

        return;
    }

    if (edit !== null) {
        let findProduct = allProducts.find(function(product) {
            return product.id === edit;
        });

        if (findProduct) {
            findProduct.name = name;
            findProduct.price = price;
            findProduct.desc = desc;
        }

        Swal.fire({
            title: "Product Updated!",
            text: "Your changes have been saved.",
            icon: "success",
            confirmButtonColor: "#7664DC"
        });
    } else {
        allProducts.push({
            id: nextId, name: name, price: price, desc: desc
        });

        nextId++;

        Swal.fire({
            title: "Product Added!",
            text: "Your new product has been added successfully.",
            icon: "success",
            confirmButtonColor: "#7664DC"
        });
    }

    clearForm();
    drow();
});


// Cancel Edit

cancelBtn.onclick = function() {
    clearForm();
};


// Delete Product

function deleteBtn(id) {
    let findProduct = allProducts.find(function(product) {
        return product.id === id;
    });

    if (findProduct) {
        Swal.fire({
            title: "Delete Product?",
            text: "You cannot undo this action.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#D94B59",
            cancelButtonColor: "#777D92"
        }).then(function(result) {
            if (result.isConfirmed) {
                var index = allProducts.findIndex(function(product) {
                    return product.id === id;
                });

                if (index !== -1) {
                    allProducts.splice(index, 1);
                }

                if (edit === id) {
                    clearForm();
                }

                drow();

                Swal.fire({
                    title: "Deleted!",
                    text: "The product has been removed.",
                    icon: "success",
                    confirmButtonColor: "#7664DC"
                });
            }
        });
    }
}


// Search

searchProduct.addEventListener("input", function() {
    drow();
});



drow();