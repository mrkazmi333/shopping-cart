import React from 'react';
import Navbar from './Navbar';
import Cart from './Cart';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
        products : [
            {
                title: 'Mobile Phone',
                price: 999,
                qty: 1,
                img: '',
                id: 1

            },
            {
                title: 'Watch',
                price: 99,
                qty: 10,
                img: '',
                id: 2

            },
            {
                title: 'Laptop',
                price: 9999,
                qty: 4,
                img: '',
                id: 3

            }
        ]
    }
}
handleIncreaseQuantity = (product) => {
    console.log('hey increase the quantity of', product);
    const { products } = this.state;
    const index  = products.indexOf(product);
    products[index].qty+=1;
    
    this.setState({
        products: products
    });
}
handleDecreaseQuantity = (product) => {

    const { products } = this.state;
    const index = products.indexOf(product);
    if(products[index].qty > 0){
        products[index].qty-=1;
    }

    this.setState({
        products: products
    })
}
handleDeleteItem = (id) => {
    const { products } = this.state;

    const items = products.filter((item) => item.id !== id );
    this.setState({
        products: items
    }) 
}
getCartCount = () => {
  const { products } = this.state;

  let count = 0;
  for(let product of products){
    count+= product.qty;
  }
  // products.forEach((product) => {
  //   count+=product.qty;
  // });

  return count;
}

  render(){
    const { products } = this.state;
    return (
      <div className="App">
        <Navbar count = {this.getCartCount()} />
        <Cart 
        products = { products }
        onIncreaseQuantity = { this.handleIncreaseQuantity }
        onDecreaseQuantity = { this.handleDecreaseQuantity }
        onDeleteProduct = { this.handleDeleteItem }
        />
      </div>
    );  
  }
}

export default App;
