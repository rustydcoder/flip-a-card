document.addEventListener('DOMContentLoaded', () => {
   const grid = document.querySelector('.grid-layout');
   const result = document.getElementById('score')

   let chosenCard = []
   let cardId = []
   let cardsWon = []
   let score = 0

   const cArray = [
      {
         name: 'image-one',
         img: 'images/image-01.png'
      },
      {
         name: 'image-two',
         img: 'images/image-02.png'
      },
      {
         name: 'image-three',
         img: 'images/image-03.png'
      },
      {
         name: 'image-four',
         img: 'images/image-04.png'
      },
      {
         name: 'image-five',
         img: 'images/image-05.png'
      },
      {
         name: 'image-six',
         img: 'images/image-06.png'
      },
      {
         name: 'image-one',
         img: 'images/image-01.png'
      },
      {
         name: 'image-two',
         img: 'images/image-02.png'
      },
      {
         name: 'image-three',
         img: 'images/image-03.png'
      },
      {
         name: 'image-four',
         img: 'images/image-04.png'
      },
      {
         name: 'image-five',
         img: 'images/image-05.png'
      },
      {
         name: 'image-six',
         img: 'images/image-06.png'
      }
   ]
   cArray.sort(() => 0.5 - Math.random()) // randomize cards every refresh

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
         cArray.sort(() => 0.5 - Math.random())
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
         setTimeout(checkMatch, 400)
      }
   }

   function popUpOption() {
      const body = document.body
      const modal = document.querySelector('.modal')
      const continueBtn = document.getElementById('continue');
      const exit = document.getElementById('gameOver')
      const wrapper = document.querySelector('.container')

      body.classList.add('modal-active')
      modal.classList.add('active')

      continueBtn.addEventListener('click', () => {
         modal.classList.add('out')
         body.classList.remove('modal-active')
         reset()
         init()
         wrapper.insertAdjacentHTML('beforeend',
            `
      <span style='margin-top: 10px; text-align: center'>Checkout my <a href="https://github.com/rustydcoder">Github Repo</a></br> For more projects</span>
      `
         )
      })

      exit.addEventListener('click', () => {
         reset()
         modal.classList.add('out')
         body.classList.remove('modal-active')
         wrapper.innerHTML = `
      <span style="text-align: center; margin-top: 10px; color: #fff">Thanks for playing. Checkout my <a href="https://github.com/rustydcoder">Github Repo</a></br> For More</span>
      `
      })
   }

   function reset() {
      grid.innerHTML = ''
      cardsWon = []
   }

   init()
})