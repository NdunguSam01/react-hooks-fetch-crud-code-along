import React, { useState } from "react";

function ItemForm({onAddItem}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  //Function to handle form submission
  function handleFormSubmit (e) 
  {
    e.preventDefault()
    
    //Creating an object that will be sent to the server when the fetch request is made with POST as the method
    const itemData=
    {
      name: name,
      category: category,
      isInCart: false
    }

    //Making the POST request
    fetch("http://localhost:4000/items",
    {
      method: "POST",
      headers:
      {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(itemData)
    })
      .then(response => response.json())
      .then(newItem => 
        {
          onAddItem(newItem)
          setName("")
        })
  }

  return (
    <form className="NewItem" onSubmit={handleFormSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
