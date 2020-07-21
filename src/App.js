import React from 'react';
import Navbar from './Navbar';
import Cart from './Cart';
import firebase from 'firebase';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
        products : [],
        loading: true
    }
    this.db = firebase.firestore()
}
componentDidMount(){
  // firebase
  //   .firestore()
  //   .collection('products')
  //   .get()
  //   .then((snapshot) => {
  //     console.log(snapshot);

  //     snapshot.docs.map((doc) => {
  //       console.log(doc.data());
  //     });
  //     const products = snapshot.docs.map((doc) => {
  //       const data = doc.data();
  //       data['id'] = doc.id;
  //       return data;
  //     });

  //     this.setState({
  //       products: products,
  //       loading: false
  //     })
  //   });

  this.db
    .collection('products')
    .onSnapshot((snapshot) => {
      console.log(snapshot);

      snapshot.docs.map((doc) => {
        console.log(doc.data());
      });
      const products = snapshot.docs.map((doc) => {
        const data = doc.data();
        data['id'] = doc.id;
        return data;
      });

      this.setState({
        products: products,
        loading: false
      })
    });
}
handleIncreaseQuantity = (product) => {
    console.log('hey increase the quantity of', product);
    const { products } = this.state;
    const index  = products.indexOf(product);
    
    // products[index].qty+=1;
    // this.setState({
    //     products: products
    // });
    const docRef = this.db.collection('products').doc(products[index].id);

    docRef
      .update({
        qty: products[index].qty + 1
      })
      .then(() => {
        console.log('Updated successfully');
      })
      .catch((error) => {
        console.log('Error:', 
         error);
      })
}
handleDecreaseQuantity = (product) => {

    const { products } = this.state;
    const index = products.indexOf(product);

    if(products[index].qty == 0){
      return;
    }

    // this.setState({
    //     products: products
    // })

    const docRef = this.db.collection('products').doc(products[index].id);

    docRef
      .update({
        qty: products[index].qty - 1
      })
      .then(() => {
        console.log('Updated successfully');
      })
      .catch((error) => {
        console.log('Error:', 
         error);
      })

}
handleDeleteItem = (id) => {
    const { products } = this.state;

    // const items = products.filter((item) => item.id !== id );
    // this.setState({
    //     products: items
    // }) 
    const docRef = this.db.collection('products').doc(id);
    docRef
      .delete()
      .then(() => {
        console.log('Deleted successfully');
      })
      .catch((error) => {
        console.log('Error:', 
         error);
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

getCartTotal = () => {
  const { products } = this.state;
  let cartTotal = 0;
  for(let product of products){
    cartTotal = cartTotal + product.qty * product.price;
  }
  // products.map((product) => {
  //   cartTotal = cartTotal + product.qty * product.price;
  // });
  
  return cartTotal;
  
}
addProduct = () => {
  this.db
    .collection('products')
    .add({
      img: '',
      title: 'Monitor',
      price: 9999,
      qty: 3
    })
    .then((docRef) => {
      console.log('Product has been added', docRef);
    })
    .catch((error) => {
      console.log(error);
    });
}

  render(){
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count = {this.getCartCount()} />
        {/* <button style= {{ padding: 20, fontSize: 20 }} onClick={this.addProduct}>Add a Product</button> */}
        <Cart 
        products = { products }
        onIncreaseQuantity = { this.handleIncreaseQuantity }
        onDecreaseQuantity = { this.handleDecreaseQuantity }
        onDeleteProduct = { this.handleDeleteItem }
        />
        {loading && <h2>Loading products</h2>}
        <div>Total: {this.getCartTotal()}</div>
      </div>
    );  
  }
}

export default App;
