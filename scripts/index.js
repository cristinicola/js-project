 /* exported myFunction  */

function myFunction () { // <--hide/unhide dropdown when arrow is pressed

     for (let i = 1; i <= 3; i++) {
         const x = document.getElementById('drodownTable' + i);

         if (x.style.display === 'block') {
             x.style.display = 'none';

         } else {
             x.style.display = 'block';

         }
     }

 }

 //changing arrow up/down when is pressed
 const x = document.getElementById('drop');
 x.onclick = function () {
     x.classList.toggle("fa-caret-up");
 };