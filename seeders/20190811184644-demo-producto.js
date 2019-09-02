"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    let productos = generarProductos();
    try {
      return queryInterface.bulkInsert("Producto", productos, {});
    } catch (error) {
      console.error(error);
    }
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Producto", null, {});
  }
};

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generarProductos() {
  // Categoria #1: Computadoras
  let computadoras = productsGeneratedByCategory(1, "Computadora", 5);

  // Categoria #2: Celulares
  let celulares = productsGeneratedByCategory(2, "Celular", 10);

  // Categoria #3: Televisores
  let televisores = productsGeneratedByCategory(3, "TV", 7);

  let products = computadoras.concat(celulares, televisores);

  return products.sort(orderByName);
}

function orderByName(productA, productB) {
  if (productA.pr_nombre < productB.pr_nombre) {
    return -1;
  }
  if (productA.pr_nombre > productB.pr_nombre) {
    return 1;
  }
  return 0;
}

function productsGeneratedByCategory(ca_categoria, ca_nombre, count) {
  let products = [];
  let marcas = ["Samsung", "Apple", "Huawei", "Sony"];
  let proveedores = [1, 2, 3, 4];

  for (let i = 0; i < count; i++) {
    let producto = null;

    let randomNumber = `${getRndInteger(1, 3 * count)}${getRndInteger(
      1,
      2 * count
    )}`;
    let indexMarcaRandom = getRndInteger(0, marcas.length - 1);
    let indexProveedorRandom = getRndInteger(0, proveedores.length - 1);
    let randomPrice = getRndInteger(500, 15000);
    let randomSendPrice = getRndInteger(0, 500);
    let randomYear = getRndInteger(2010, 2019);
    let randomStock = getRndInteger(0, 200);
    let estado = "A";

    if (randomNumber % 2 === 0) {
      estado = "I";
    }

    let indexMarca = marcas[indexMarcaRandom];
    let fecha = new Date(
      getRndInteger(1, 20),
      getRndInteger(1, 10),
      randomYear
    );
    let uniqueIdentifier = `D-${convertDate(fecha)}`;
    let pr_nombre = `${indexMarca} - ${ca_nombre} #${randomNumber}-${uniqueIdentifier}-test`;

    producto = {
      pr_nombre: pr_nombre,
      pr_descripcion:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      pr_marca: `${marcas[indexMarcaRandom]}`,
      pr_precio_bs: randomPrice,
      pr_precio_envio_bs: randomSendPrice,
      pr_stock: randomStock,
      pr_year: randomYear,
      pr_estado: estado,
      ca_categoria: ca_categoria,
      pr_proveedor: proveedores[indexProveedorRandom],
      // Audit
      createdAt: new Date(),
      updatedAt: new Date()
    };

    products.push(producto);
  }

  return products;
}

function convertDate(date) {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() < 9 ? "0" : "") + date.getMonth().toString();
  const day = (date.getDate() < 10 ? "0" : "") + date.getDate().toString();

  var seconds = date.getSeconds();
  var minutes = date.getMinutes();
  var hour = date.getHours();
  const ms = new Date().getUTCMilliseconds();

  return `${year}${month}${day}${hour}${minutes}${seconds}${ms}`;
}
