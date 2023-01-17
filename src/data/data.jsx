class ProductService{

  static productList = [
      {
        slNo: "A01",
        image:
          "https://www.herbazest.com/imgs/7/6/3/17328/coconut.jpg",
        name: "Ambrane Smartwatch",
        price: 1500,
        qty: 20,
      },
      {
        slNo: "A02",
        image:
          "https://nammamaligai.com/wp-content/uploads/2016/10/coconuts.jpeg",
        name: "Mi Smartwatch",
        price: 1200,
        qty: 1,
      },
      {
        slNo: "A03",
        image:
          "https://assets.shop.loblaws.ca/products/20005774001/b2/en/front/20005774001_front_a06_@2.png",
        name: "Apple Smartwatch",
        price: 1800,
        qty: 0,
      },
      {
        slNo: "A04",
        image: "https://www.shysha.in/wp-content/uploads/2021/09/Coconut-1-nos.png",
        name: "Lg Smartwatch",
        price: 1700,
        qty: 30,
      },
      {
        slNo: "A05",
        image:
          "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Coconut-cd53633-scaled.jpeg",
        name: "Samsung Smartwatch",
        price: 1900,
        qty: 50,
      },
    ];

  static getProductList(){
      return this.productList;
  }
}

export default ProductService;