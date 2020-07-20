import React from 'react';
import CartItem from './CartItem';
class Cart extends React.Component {

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
        // this.increaseQuantity = this.increaseQuantity.bind(this);
        
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

  render(){
      const { products } = this.state;
       return (
           <div className="cart">
               {products.map((product) => {
                   return (
                   <CartItem 
                   product={product} 
                   key={product.id} 
                   onIncreaseQuantity = { this.handleIncreaseQuantity }
                   onDecreaseQuantity = { this.handleDecreaseQuantity }
                   onDeleteProduct = { this.handleDeleteItem }
                   />
                   )
               })}
            </div>
       );
  }
}



export default Cart; 