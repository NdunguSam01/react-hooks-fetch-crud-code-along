import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  //Using the useEffect hook to fetch data from the JSON file 
  useEffect(()=>
  {
    fetch("http://localhost:4000/items")
      .then(response => response.json())
      .then(items => setItems(items)) //Setting the items state to equal the data fetched from the API
  }, [])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  // Function to handle newly added item and use it to update the items state
  function handleAddedItem (newItem)
  {
    //Updating the items state 
    setItems([...items, newItem])
  }

  //Function to handle the updated item
  function handleUpdatedItem (updatedItem)
  {
    //Mapping through the original items array and checking if the id of the updated item exists in the original items array. If it does, we replace the original content of the updated item with the newly updated array. If not, we return the original items array
    const updatedItems = items.map(item =>
      {
        if (item.id === updatedItem.id)
        {
          return updatedItem
        }
        else
        {
          return item
        }
      })
    
    //Setting the state of items to match the return value of the map functionality
    setItems(updatedItems)
  }

  //Function to handle item deletion
  function handleDeletedItem (deletedItem)
  {
    const updatedItem = items.filter(item => item.id !== deletedItem.id)
    setItems(updatedItem)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddedItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} 
            onUpdateItem={handleUpdatedItem}
            onDeleteItem={handleDeletedItem}
            />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
