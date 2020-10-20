import '../styles/index.sass'
import TypeIt from 'typeit'
import { throttle } from './utils'

window.addEventListener('DOMContentLoaded', () => {
  const $burgerMenuBtn = document.querySelector('.burger_btn')
  const $headerNav = document.querySelector('.header__nav')
  const $header = document.querySelector('.header')
  const $formCloseBtn = document.querySelector('.analysis__close-form-btn')
  const $formOpenBtn = document.querySelector('.analysis__open-form-btn')
  const $formContainer = document.querySelector('.analysis__form-container')

  const $approachStepsBox = document.querySelector('.approach__steps')
  const $workGalleryBox = document.querySelector('.work__gallery')
  const $aboutServicesBox = document.querySelector('.about__services')
  const $footerSocialBox = document.querySelector('.footer__social')

  new TypeIt('.footer__input', {
    waitUntilVisible: true,
    speed: 100,
    startDelay: 1000,
  })
    .type('your@email.com', { delay: 1000 })
    .delete(null, { delay: 1000 })
    .empty()
    .go()

  function initIntersectionObservers(...nodeArr) {
    if (!nodeArr || !nodeArr.length) {
      return
    }

    const options = { threshold: 0.1 }

    nodeArr.forEach($node => {
      let observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          $node.classList.add('visible')
        }
      }, options)
      observer.observe($node)
    })
  }

  initIntersectionObservers(
    $approachStepsBox,
    $workGalleryBox,
    $aboutServicesBox,
    $formContainer,
    $footerSocialBox
  )

  // Prevent page from reload after form submit
  for (let index = 0; index < document.forms.length; index++) {
    document.forms[index].addEventListener('submit', e => e.preventDefault())
  }

  function toggleNavMenu() {
    document.body.classList.toggle('locked')
    $headerNav.classList.toggle('open')
    $burgerMenuBtn.classList.toggle('open')
  }

  $burgerMenuBtn.addEventListener('click', toggleNavMenu)

  // Close nav menu after click on link or mask
  $headerNav.addEventListener('click', e => {
    if (e.target.tagName === 'A' || e.target.classList.contains('mask')) {
      document.body.classList.remove('locked')
      $headerNav.classList.remove('open')
      $burgerMenuBtn.classList.remove('open')
    }
  })

  function scrollHandler() {
    if (document.documentElement.scrollTop >= 500) {
      $header.classList.add('fixed')
    } else {
      $header.classList.remove('fixed')
    }
  }

  window.addEventListener('scroll', throttle(scrollHandler, 100))

  function resizeHandler() {
    if (window.innerWidth >= 768) {
      document.body.classList.remove('locked')
      $headerNav.classList.remove('open')
      $burgerMenuBtn.classList.remove('open')
    }
  }

  window.addEventListener('resize', throttle(resizeHandler, 100))

  function toggleForm() {
    const DELAY = 300

    if ($formContainer.classList.contains('closed')) {
      $formContainer.style.display = 'block'
      $formContainer.classList.remove('closed')
    } else {
      $formContainer.classList.add('closed')
      setTimeout(() => {
        $formContainer.style.display = 'none'
      }, DELAY)
    }
  }

  $formCloseBtn.addEventListener('click', toggleForm)
  $formOpenBtn.addEventListener('click', toggleForm)
})
