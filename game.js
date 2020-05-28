document.addEventListener('DOMContentLoaded', () => {
   const grid = document.querySelector('.grid-layout');
   const result = document.getElementById('score')

   const cArray = [
      {
         name: 'fries',
         img: 'images/fries.png'
      },
      {
         name: 'cheeseburger',
         img: 'images/cheeseburger.png'
      },
      {
         name: 'hotdog',
         img: 'images/hotdog.png'
      },
      {
         name: 'ice-cream',
         img: 'images/ice-cream.png'
      },
      {
         name: 'milkshake',
         img: 'images/milkshake.png'
      },
      {
         name: 'pizza',
         img: 'images/pizza.png'
      },
      {
         name: 'fries',
         img: 'images/fries.png'
      },
      {
         name: 'cheeseburger',
         img: 'images/cheeseburger.png'
      },
      {
         name: 'hotdog',
         img: 'images/hotdog.png'
      },
      {
         name: 'ice-cream',
         img: 'images/ice-cream.png'
      },
      {
         name: 'milkshake',
         img: 'images/milkshake.png'
      },
      {
         name: 'pizza',
         img: 'images/pizza.png'
      }
   ]

   let chosenCard = []
   let cardId = []
   let cardsWon = []
   let score = 0

   function createBoard() {
      for (let i = 0; i < cArray.length; i++) {
         const card = document.createElement('img');
         card.setAttribute('src', 'images/blank.png');
         card.setAttribute('data-id', i)
         card.addEventListener('click', flipCard)
         grid.appendChild(card)
      }
   }

   function checkMatch() {
      const cards = document.querySelectorAll('img')
      const [optOneId, optTwoId] = cardId
      if (chosenCard[0] === chosenCard[1]) {
         cards[optOneId].setAttribute('src', 'images/white.png')
         cards[optTwoId].setAttribute('src', 'images/white.png')
         cardsWon.push(chosenCard)
         score++
      } else {
         cards[optOneId].setAttribute('src', 'images/blank.png')
         cards[optTwoId].setAttribute('src', 'images/blank.png')
         score
      }
      chosenCard = []
      cardId = []
      result.textContent = score
      if (cardsWon.length === cArray.length / 2) {
         result.textContent = 'WON!!'
      }
   }

   function flipCard() {
      let id = this.getAttribute('data-id')
      chosenCard.push(cArray[id].name)
      cardId.push(id)
      this.setAttribute('src', cArray[id].img)
      if (chosenCard.length === 2) {
         setTimeout(checkMatch, 300)
      }
   }



   createBoard()
})
