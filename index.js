
 fetch('https://dog.ceo/api/breeds/image/random')
  .then((response) => {
    if(!response.ok) {
      throw new Error("Failed to fetch repositories");
    }
    return response.json();
  })
  
   