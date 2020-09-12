const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

// save movie and price to local storage
function setMovieData(movieIndex, moviePrice){
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount(){

  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // Copiar selected seats num array
  // Mapear o array
  // retornar novos index de arrays

   const seatsIndex = [...selectedSeats].map(seat => 
    [...seats].indexOf(seat)
   );

   console.log(seatsIndex);

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
}
// Get Data from local Storage
function populateUI(){
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  
  if(selectedSeats !== null && selectedSeats.length > 0){
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1){
        seat.classList.add('selected');
      }
    })
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if(selectedMovieIndex !== null){
    movieSelect.selectedIndex = selectedMovieIndex;
  }
 
}

// Movie change listener
movieSelect.addEventListener('change', e => {
  setMovieData(e.target.selectedIndex, e.target.value);
  ticketPrice = +e.target.value;
  updateSelectedCount();
})

// Seat click event listener
container.addEventListener('click', e => {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
})

// Initial count and total set
updateSelectedCount();


