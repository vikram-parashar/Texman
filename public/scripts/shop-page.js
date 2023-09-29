const product_data = [
  [
    "cat",
    "A Product title which is very long idk why? The quich brown fx",
    345.55,
  ],
  [
    "cat",
    "B Product title which is very long idk why? The quich brown fx",
    345.55,
  ],
  [
    "cat",
    "C Product title which is very long idk why? The quich brown fx",
    345.55,
  ],
  [
    "cat",
    "D Product title which is very long idk why? The quich brown fx",
    345.55,
  ],
  [
    "cat",
    "E Product title which is very long idk why? The quich brown fx",
    345.55,
  ],
  [
    "cat",
    "F Product title which is very long idk why? The quich brown fx",
    345.55,
  ],
];
//putting ... if product name too long
const max_length = 40;
for (let i = 0; product_data[i] != null; i++) {
  let str = product_data[i][1];
  if (str.length > max_length) {
    product_data[i][1] = str.substr(0, max_length) + "...";
  }
}

// Adding html content by iterating
let grid_node = $("#product-grid");
for (let i = 0; product_data[i] != null; i++) {
  grid_node.append(
    `
    <div class="item">
    <img src="/images/${product_data[i][0]}.png" alt="CAt" />
    <div class="contentBox">
      <h3>${product_data[i][1]}</h3>
      <h2 class="price">${Math.trunc(product_data[i][2])}.<small>${
        product_data[i][2].toString().split(".")[1]
      }</small></h2>
      <a href="#" class="buy">Buy Now</a>
    </div>
  </div>
    `,
  );
}
