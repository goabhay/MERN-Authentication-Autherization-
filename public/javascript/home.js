
const imagePath = 'images/';

    // Image file names
    const imageFiles = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'];

    // Reference to the gallery container
    const galleryContainer = document.getElementById('gallery');

    // Function to create image elements and append them to the gallery container
    function createGallery() {
        imageFiles.forEach((imageFile) => {
            const imgElement = document.createElement('img');
            imgElement.src = imagePath + imageFile;
            imgElement.alt = 'Image';
            imgElement.className = 'gallery-image';
            imgElement.addEventListener('click', () => openImage(imageFile));
            galleryContainer.appendChild(imgElement);
        });
    }

    // Function to open the clicked image
    function openImage(imageFile) {
        // You can implement a lightbox or other logic to display the full-size image
        alert('Open ' + imageFile);
    }

    // Create the gallery on page load
    window.addEventListener('load', createGallery);

    function changeContentAndHref() {
        var link = document.getElementById("dynamicLink");
        
        // Check the current content and toggle it
        if (link.innerHTML === "Login") {
            link.href = "/login";
          link.innerHTML = "Logout";
         
        } else {
            link.href = "/logout";
          link.innerHTML = "Login";
          
        }
      }