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
   cArray.sort(() => 0.5 - Math.random())

   let chosenCard = []
   let cardId = []
   let cardsWon = []
   let score = 0

   function init() {
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
      if (chosenCard[0] === chosenCard[1] && optOneId !== optTwoId) {
         cards[optOneId].setAttribute('src', 'images/white.png')
         cards[optTwoId].setAttribute('src', 'images/white.png')
         cardsWon.push(...[...new Set(chosenCard)])
         score++
      } else {
         cards[optOneId].setAttribute('src', 'images/blank.png')
         cards[optTwoId].setAttribute('src', 'images/blank.png')
         score
      }
      cards.forEach(card => {
         card.classList.remove('pick')
      })
      chosenCard = []
      cardId = []
      result.textContent = score
      if (cardsWon.length === cArray.length / 2) {
         reset()
         init()
      }
      if (score === cArray.length) {
         popUpOption()
      }
   }

   function flipCard() {
      let id = this.getAttribute('data-id')
      if (this.getAttribute('src') !== "images/white.png") {
         this.classList.add('pick')
         if (!cardId.includes(id)) {
            chosenCard.push(cArray[id].name)
            cardId.push(id)
         }
         this.setAttribute('src', cArray[id].img)
      }
      if (chosenCard.length === 2) {
         setTimeout(checkMatch, 300)
      }
   }
   init()
   function popUpOption() {
      const body = document.body
      const modal = document.querySelector('.modal')
      body.classList.add('modal-active')
      const continueBtn = document.getElementById('continue');
      const exit = document.getElementById('gameOver')
      const wrapper = document.querySelector('.container')
      modal.classList.add('active')
      continueBtn.addEventListener('click', () => {
         modal.classList.add('out')
         body.classList.remove('modal-active')
         reset()
         init()
         wrapper.insertAdjacentHTML('beforeend',
            `
      <span style='margin-top: 10px; text-align: center'>Checkout my <a href="">Github Repo</a></br> For more projects</span>
      `
         )
      })
      exit.addEventListener('click', () => {
         reset()
         modal.classList.add('out')
         body.classList.remove('modal-active')
         wrapper.innerHTML = `
      <span style="text-align: center">Thanks for playing. Checkout my <a href="">Github Repo</a></br> For More</span>
      `
      })
   }

   function reset() {
      grid.innerHTML = ''
      cardsWon = []
   }
})
