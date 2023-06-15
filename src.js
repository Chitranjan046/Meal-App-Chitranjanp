// Get references to the search elements
const searchField = document.getElementById('search-field');
const searchButton = document.getElementById('search-btn');
const searchResults = document.getElementById('search-results');

// Get references to the My Meal elements
const myMeal = document.getElementById('mymeal');
const reset = document.getElementById('reset');

// Initialize an empty array to store favorite meals
const myList = [];

// Event listener for the search button click
searchButton.addEventListener('click', async () => {
  const searchMeal = searchField.value;

  try {
    // Fetch data from the API based on the search meal
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`);
    const data = await response.json();

    if (data.meals === null) {
      alert('No meals found for this search term.');
    } else {
      // Display the search results
      displaySearchResults(data.meals);
    }
  } catch (error) {
    console.error(error);
  }
});

// Function to display the search results
const displaySearchResults = (meals) => {
  searchResults.innerHTML = '';

  meals.forEach((meal) => {
    // Create HTML elements to display each meal
    const mealElement = document.createElement('div');
    mealElement.classList.add('meal');

    // Add meal image
    const mealImg = document.createElement('img');
    mealImg.src = meal.strMealThumb;
    mealImg.alt = meal.strMeal;
    mealElement.appendChild(mealImg);

    // Add meal name
    const mealName = document.createElement('h2');
    mealName.innerText = meal.strMeal;
    mealElement.appendChild(mealName);

    // Add meal ingredients
    const mealIngredients = document.createElement('div');
    mealIngredients.classList.add('meal-ingredients');
    const ingredientsTitle = document.createElement('strong');
    ingredientsTitle.innerText = 'Ingredients: ';
    mealIngredients.appendChild(ingredientsTitle);

    const ingredientsList = document.createElement('span');
    ingredientsList.classList.add('item-text');

    // Concatenate ingredient strings
    const ingredientText = `${meal.strIngredient1}, ${meal.strIngredient2}, ${meal.strIngredient3}, ${meal.strIngredient4}`;
    ingredientsList.innerText = ingredientText;
    mealIngredients.appendChild(ingredientsList);

    mealElement.appendChild(mealIngredients);

    // Add meal description
    const mealDescription = document.createElement('p');
    mealDescription.classList.add('description');
    mealDescription.innerText = meal.strInstructions;
    mealElement.appendChild(mealDescription);

    // Add buttons for "Know More" and "Add Meal"
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    // "Know More" button
    const knowMoreBtn = document.createElement('button');
    knowMoreBtn.innerHTML = 'Know More';
    knowMoreBtn.addEventListener('click', () => {
      mealDescription.classList.toggle('show');
    });
    buttonContainer.appendChild(knowMoreBtn);

    // "Add Meal" button
    const addMealButton = document.createElement('button');
    addMealButton.innerHTML = 'Add Meal';
    addMealButton.addEventListener('click', () => {
      addTomyMeal(meal);
    });
    buttonContainer.appendChild(addMealButton);

    mealElement.appendChild(buttonContainer);

    // Append the meal element to the search results
    searchResults.appendChild(mealElement);
  });
};

// Function to add a meal to My Meal list
const addTomyMeal = (meal) => {
  // Check if the meal is already in myList
  const mealIndex = myList.findIndex((myMeal) => myMeal.idMeal === meal.idMeal);

  if (mealIndex !== -1) {
    // Meal is already in myList, display alert and return
    alert(`${meal.strMeal} is already in your My Meal.`);
    return;
  }

  // Display a confirmation dialog
  const confirmation = confirm(`${meal.strMeal} will be added to My Meal. Do you want to continue?`);

  if (confirmation) {
    // User clicked "OK"
    // Proceed with the addition
    myList.push(meal);
    showmyMeal();
    alert(`${meal.strMeal} has been added to My Meal.`);
  } else {
    // User clicked "Cancel"
    // Do nothing or handle the cancel action if needed
  }
};

// Event listener for the "My Meal" button click
myMeal.addEventListener('click', () => {
  showmyMeal();
});

// Function to display the My Meal list
const showmyMeal = () => {
  searchResults.innerHTML = '';

  if (myList.length === 0) {
    // Display message if My Meal list is empty
    const nomymealMessage = document.createElement('p');
    nomymealMessage.innerText = 'You have no My meals.';
    searchResults.appendChild(nomymealMessage);
  } else {
    myList.forEach((meal) => {
      // Create HTML elements to display each meal in My Meal list
      const mealElement = document.createElement('div');
      mealElement.classList.add('meal');

      // Add meal image
      const mealImg = document.createElement('img');
      mealImg.src = meal.strMealThumb;
      mealImg.alt = meal.strMeal;
      mealElement.appendChild(mealImg);

      // Add meal name
      const mealName = document.createElement('h2');
      mealName.innerText = meal.strMeal;
      mealElement.appendChild(mealName);

      // Add meal ingredients
      const mealIngredients = document.createElement('div');
      mealIngredients.classList.add('meal-ingredients');
      const ingredientsTitle = document.createElement('strong');
      ingredientsTitle.innerText = 'Ingredients: ';
      mealIngredients.appendChild(ingredientsTitle);

      const ingredientsList = document.createElement('span');
      ingredientsList.classList.add('item-text');

      // Loop through ingredients and add them to the list
      for (let i = 1; i <= 25; i++) {
        if (meal[`strIngredient${i}`]) {
          const ingredient = document.createElement('span');
          ingredient.innerHTML = `${meal[`strIngredient${i}`]}, `;
          ingredientsList.appendChild(ingredient);
        } else {
          break;
        }
      }

      mealIngredients.appendChild(ingredientsList);
      mealElement.appendChild(mealIngredients);

      // Add meal instructions
      const instructionsDiv = document.createElement('div');
      instructionsDiv.classList.add('item-instruction');
      const instructionsTitle = document.createElement('strong');
      instructionsTitle.innerText = 'Instructions: ';
      instructionsDiv.appendChild(instructionsTitle);

      const instructionsText = document.createElement('span');
      instructionsText.classList.add('item-text');
      instructionsText.innerText = meal.strInstructions;
      instructionsDiv.appendChild(instructionsText);
      mealElement.appendChild(instructionsDiv);

      // Add video link
      const videoLinkDiv = document.createElement('div');
      videoLinkDiv.classList.add('item-video');
      const videoLinkTitle = document.createElement('strong');
      videoLinkTitle.innerText = 'Video Link: ';
      videoLinkDiv.appendChild(videoLinkTitle);

      const videoLink = document.createElement('span');
      videoLink.classList.add('item-text');
      const videoAnchor = document.createElement('a');
      videoAnchor.href = meal.strYoutube;
      videoAnchor.innerText = 'Watch Here';
      videoAnchor.target = '_blank';
      videoLink.appendChild(videoAnchor);
      videoLinkDiv.appendChild(videoLink);
      mealElement.appendChild(videoLinkDiv);

      // Add remove button
      const removeBtn = document.createElement('button');
      removeBtn.innerHTML = 'Remove';
      removeBtn.addEventListener('click', () => {
        removefrommy(meal);
      });
      mealElement.appendChild(removeBtn);

      // Append the meal element to the search results
      searchResults.appendChild(mealElement);
    });
  }
};

// Function to remove a meal from My Meal list
const removefrommy = (meal) => {
  const mealIndex = myList.findIndex((myMeal) => myMeal.idMeal === meal.idMeal);
  if (mealIndex !== -1) {
    myList.splice(mealIndex, 1);
    showmyMeal();

    // Display a confirmation dialog
    const confirmation = confirm(`${meal.strMeal} has been removed from My Meal. Do you want to continue?`);

    if (confirmation) {
      // User clicked "OK"
      // Proceed with the removal
      confirmRemove();
    } else {
      // User clicked "Cancel"
      // Add the meal back to myList
      myList.splice(mealIndex, 0, meal);
      showmyMeal();
    }
  }
};

// Function to confirm the removal of a meal
const confirmRemove = () => {
  // Additional logic or API calls if required before removing the meal

  // Display success message
  alert("Meal removed successfully!");

  // Update UI or perform any other required actions after the removal
};

// Event listener for the reset button click
reset.addEventListener('click', () => {
  searchResults.innerHTML = '';
});
