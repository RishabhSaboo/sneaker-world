document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.like-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const productId = btn.getAttribute('data-id');
  
        try {
          const res = await fetch(`/products/${productId}/like`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });
  
          const data = await res.json();
  
          if (res.ok) {
            const countSpan = btn.querySelector('.like-count');
            countSpan.textContent = data.likesCount;
  
            // Optionally update the button's style (e.g., color change on like/unlike)
            if (data.liked) {
              btn.classList.add('liked');  // Add a class for styling (like changing color)
            } else {
              btn.classList.remove('liked'); // Remove class if unliked
            }
          } else {
            alert(data.message || "Error liking product");
          }
        } catch (err) {
          alert("Something went wrong");
        }
      });
    });
  });
  