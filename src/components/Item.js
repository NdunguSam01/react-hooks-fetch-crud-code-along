import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) 
{
  //Function to add item to cart
  function addToCart()
  {
    //Creating a PATCH request
    fetch(`http://localhost:4000/items/${item.id}`,
    {
      method: "PATCH",
      headers:
      {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify (
        {
          isInCart: !item.isInCart //Updating the value of isInCart
        }
      ),
    })
      .then(response => response.json())
      .then(updatedItem => onUpdateItem(updatedItem))
  }

  //Function to delete an item
  function handleDelete ()
  {
    //Making a delete request
    fetch(`http://localhost:4000/items/${item.id}`,
    {
      method: "DELETE",
    })
      .then(response => response.json())
      .then(()=> onDeleteItem(item))}

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={addToCart}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default Item;
