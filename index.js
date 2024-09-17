document.addEventListener('DOMContentLoaded', () => {
  const apiKey = 'live_nYcZEapjJI77q8RpqXL8IkQDBBis9QdESX2OItXx7uZfRD4DBLZxihkU9khRMPaE'; // Replace with your actual API key
  const apiUrlBreeds = 'https://api.thedogapi.com/v1/breeds';
  const apiUrlImages = 'https://api.thedogapi.com/v1/images/search?breed_ids=';
  
  const content = document.getElementById('content');
  
  const loadBreeds = () => {
      fetch(apiUrlBreeds, {
          headers: { 'x-api-key': apiKey }
      })
      .then(response => response.json())
      .then(data => {
          content.innerHTML = `
              <h1>Dog Breeds</h1>
              <ul id="breed-list"></ul>
          `;
          
          const breedList = document.getElementById('breed-list');
          data.forEach(breed => {
              const li = document.createElement('li');
              li.className = 'breed-item';
              li.textContent = breed.name;
              li.addEventListener('click', () => loadBreedDetails(breed));
              breedList.appendChild(li);
          });
      })
      .catch(err => console.error('Error fetching breeds:', err));
  };

  const loadBreedDetails = (breed) => {
      fetch(apiUrlImages + breed.id, {
          headers: { 'x-api-key': apiKey }
      })
      .then(response => response.json())
      .then(imagesData => {
          const imageUrl = imagesData[0]?.url || '';
          content.innerHTML = `
              <h1>${breed.name}</h1>
              <div>
                  <img src="${imageUrl}" alt="${breed.name}" />
                  <p><strong>Breed Group:</strong> ${breed.breed_group || 'N/A'}</p>
                  <p><strong>Height:</strong> ${breed.height.imperial || 'N/A'}</p>
                  <p><strong>Weight:</strong> ${breed.weight.imperial || 'N/A'}</p>
                  <p><strong>Life Span:</strong> ${breed.life_span || 'N/A'}</p>
                  <p><strong>Temperament:</strong> ${breed.temperament || 'N/A'}</p>
                  <button id="back-button">Back to Breeds</button>
              </div>
          `;

          document.getElementById('back-button').addEventListener('click', loadBreeds);
      })
      .catch(err => console.error('Error fetching breed images:', err));
  };

  document.getElementById('breeds-link').addEventListener('click', loadBreeds);
  document.getElementById('images-link').addEventListener('click', () => {
      alert('Please select a breed from the "Dog Breeds" section first.');
  });

  loadBreeds();
});
