var prodName = document.getElementById("pname");
var prodPrice = document.getElementById("pprice");
var prodCategory = document.getElementById("pcategory");
var prodDesc = document.getElementById("pdesc");
var productList = [];
var rowIndex;
var editSearch;
var myModal = new bootstrap.Modal(document.getElementById("myModal"), {});

if (localStorage.getItem("productList")) {
  productList = JSON.parse(localStorage.getItem("productList"));
  displayProduct(productList);
} else {
  emptyMsg();
}

emptyMsg();

function addProduct() {
  if (checkProductName() && checkPrice() && checkCategory() && checkDesc()) {
    var product = {
      name: prodName.value,
      price: prodPrice.value,
      category: prodCategory.value,
      desc: prodDesc.value,
    };
    productList.push(product);
    localStorage.setItem("productList", JSON.stringify(productList));

    displayProduct(productList);

    // showMsg("body", `<h5 class="text-primary">The Product has been added</h5>`);
    Swal.fire("The Product has been added");
    emptyMsg();
    clear();
  } else {
    // showMsg("body", `<h5 class="text-danger">Please enter a valid data</h5>`);
    Swal.fire("Please enter a valid data");
  }
}

function displayProduct(list) {
  var box = "";

  for (var i = 0; i < list.length; i++) {
    box += `<tr class="overflow-auto">
    <td>${i + 1}</td>
    <td class="text-capitalize">${
      list[i].newName ? list[i].newName : list[i].name
    }</td>
    <td>${list[i].price}</td>
    <td>${list[i].category}</td>
    <td>${list[i].desc}</td>
    <td><button class="btn btn-success" onClick="editProduct(${i})">Edit</button></td>
    <td><button class="btn btn-danger" onClick="deleteProduct(${i})">Delete</button></td>
  </tr>`;
  }
  document.getElementById("products").innerHTML = box;
}

function clear() {
  prodName.value = "";
  prodPrice.value = "";
  prodCategory.value = "";
  prodDesc.value = "";
}

function editProduct(index) {
  prodName.value = productList[index].name;
  prodPrice.value = productList[index].price;
  prodCategory.value = productList[index].category;
  prodDesc.value = productList[index].desc;
  document.getElementById("addBtn").classList.add("d-none");
  document.getElementById("editBtn").classList.remove("d-none");
  rowIndex = index;
}

function updateProduct() {
  if (checkProductName() && checkPrice() && checkCategory() && checkDesc()) {
    document.getElementById("addBtn").classList.remove("d-none");
    document.getElementById("editBtn").classList.add("d-none");
    var product = {
      name: prodName.value,
      price: prodPrice.value,
      category: prodCategory.value,
      desc: prodDesc.value,
    };
    productList[rowIndex] = product;
    displayProduct(productList);
    localStorage.setItem("productList", JSON.stringify(productList));
    clear();
    // document.getElementById(
    //   "body"
    // ).innerHTML = `<h5 class="text-success">The product has been edited</h5>`;
    // myModal.show();
    Swal.fire("The product has been edited");
  } else {
    document.getElementById("addBtn").classList.add("d-none");
    document.getElementById("editBtn").classList.remove("d-none");
    // document.getElementById(
    //   "body"
    // ).innerHTML = `<h5 class="text-danger">Please Enter a valid Data</h5>`;
    // myModal.show();
    Swal.fire("Please Enter a valid Data");
  }
}

function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem("productList", JSON.stringify(productList));
  displayProduct(productList);

  emptyMsg();
  // showMsg("body", `<h5 class="text-danger">The product has been deleted</h5>`);
  Swal.fire("The product has been deleted");
}

function searchProduct(term) {
  var searchBox = "";

  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
      searchBox += `<tr>
    <td>${i + 1}</td>
    <td class="text-capitalize">${productList[i].name}</td>
    <td>${productList[i].price}</td>
    <td>${productList[i].category}</td>
    <td>${productList[i].desc}</td>
    <td><button class="btn btn-success" onClick="editProduct(${i})">Edit</button></td>
    <td><button class="btn btn-danger" onClick="deleteProduct(${i})">Delete</button></td>
  </tr>`;
    }
    document.getElementById("products").innerHTML = searchBox;
  }
}

function checkProductName() {
  var regex = /^[A-Z][a-z]{2,8}$/gm;
  var isValid = regex.test(prodName.value);
  if (isValid) {
    document
      .getElementById("errorName")
      .classList.replace("d-inline-block", "d-none");
  } else {
    document
      .getElementById("errorName")
      .classList.replace("d-none", "d-inline-block");
  }
  return isValid;
}

function checkPrice() {
  var regex = /^([1-9][0-9]{3}|10000)$/gm;
  var isValid = regex.test(prodPrice.value);
  if (isValid) {
    document
      .getElementById("errorPrice")
      .classList.replace("d-inline-block", "d-none");
  } else {
    document
      .getElementById("errorPrice")
      .classList.replace("d-none", "d-inline-block");
  }
  return isValid;
}

function checkCategory() {
  var regex = /^(mobile|screen|watch)$/gi;
  var isValid = regex.test(prodCategory.value);
  if (isValid) {
    document
      .getElementById("errorCategory")
      .classList.replace("d-inline-block", "d-none");
  } else {
    document
      .getElementById("errorCategory")
      .classList.replace("d-none", "d-inline-block");
  }
  return isValid;
}

function checkDesc() {
  var regex = /^[A-Za-z ,\.]{3,250}$/gm;
  var isValid = regex.test(prodDesc.value);
  if (isValid) {
    document
      .getElementById("errorDesc")
      .classList.replace("d-inline-block", "d-none");
  } else {
    document
      .getElementById("errorDesc")
      .classList.replace("d-none", "d-inline-block");
  }
  return isValid;
}

// function editFromSearch() {
//   prodName.value = editSearch[rowIndex].name;
//   prodPrice.value = editSearch[rowIndex].price;
//   prodCategory.value = editSearch[rowIndex].category;
//   prodDesc.value = editSearch[rowIndex].desc;
// }

function emptyMsg() {
  if (productList.length == 0) {
    document.querySelector(".empty-msg").classList.replace("d-none", "d-block");
  } else {
    document.querySelector(".empty-msg").classList.replace("d-block", "d-none");
  }
}

function showMsg(id, msg) {
  document.getElementById(id).innerHTML = msg;
  myModal.show();
}
