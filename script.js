const startButton = document.querySelector('.start_button')
const bounce = startButton.querySelector('.round-2')
const bounceMiddle = startButton.querySelector('.round-1')
const bounceEnd = startButton.querySelector('.round-0')
const menu = document.querySelectorAll('.menu')
const startTitle = document.querySelector('h2')
const title = document.querySelector('h1')
const earth = document.querySelector('.planisphere')
const richter = document.querySelectorAll('.menu-2 .richter_scale .scale_container .scale .center')
const dateInformation = document.querySelector('.day_informations p')
const date = new Date()
const day = date.getDate()
const month = date.getMonth()
const year = date.getFullYear()
const cities = document.querySelectorAll('.city_container')
const startEarthquake = document.querySelector('.start_earthquake h5')
let currentScale = '0'
let citySelected
let currentPoint
let alert = document.querySelector('.alert')

//put the good date in the day information date
dateInformation.innerHTML = `${day}.${month+1}.${year}`

//opening animation start
startButton.addEventListener(
    'click',
    () =>
    {
        bounce.classList.add('start_animation')
        bounceMiddle.classList.add('start_animation_middle')
        bounceEnd.classList.add('start_animation_after')
        menu[0].classList.add('open')
        menu[1].classList.add('open')
        startTitle.style.display = 'none'
        earth.style.opacity = '1'
        setTimeout(function(){ bounce.style.display='none'; title.classList.add('appear');}, 2000);
    }
)

// appearing of "click to start"
startButton.addEventListener(
    'mouseover',
    () =>
    {
        startTitle.style.opacity = '1'
    }
)

//see event on richter scale
for(const scale of richter)
{
    scale.addEventListener(
        'click',
        () =>
        {
            let currentElements = document.querySelectorAll('.current')
            if(currentElements!=null)
            {
                for(const currentElement of currentElements)
                {
                    currentElement.classList.remove('current')
                }
            }
            scale.firstElementChild.classList.add('current')
            scale.firstElementChild.nextElementSibling.classList.add('current')
            scale.firstElementChild.nextElementSibling.nextElementSibling.classList.add('current')
            scale.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.classList.add('current')
            currentScale = scale.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML
            document.querySelector(`.${citySelected.dataset.src}`).style.transform = `scale(${currentScale*(currentScale)})`
        }
    )
}

//see event of the chosen city
for(const city of cities)
{
    city.addEventListener(
        'click',
        () =>
        {
            let selectedElements = document.querySelectorAll('.selected')
            let selectedCities = document.querySelectorAll('.city_appear')
            let currentElements = document.querySelectorAll('.current')
            if(selectedElements!=null)
            {
                for(const selectedElement of selectedElements)
                {
                    selectedElement.classList.remove('selected')
                }
            }
            if(selectedCities!=null)
            {
                for(const selectedcity of selectedCities)
                {
                    selectedcity.classList.remove('city_appear')
                }
            }
            if(currentElements!=null)
            {
                for(const currentElement of currentElements)
                {
                    currentElement.classList.remove('current')
                    currentScale = '0'
                }
            }
            city.classList.add('selected')
            currentPoint = document.querySelector(`.${city.dataset.src}`)
            currentPoint.classList.add('city_appear')
            citySelected = city
        }
    )
}

startEarthquake.addEventListener(
    'click',
    () =>
    {
        if(currentScale=='0'&&citySelected==null)
        {
            alert.firstElementChild.nextElementSibling.innerHTML = 'Select a city and a richter scale'
            alert.classList.add('warning')
            setTimeout(() => alert.classList.remove('warning'),4000)
        }
        else if(currentScale=='0')
        {
            alert.firstElementChild.nextElementSibling.innerHTML = 'Select a richter scale'
            alert.classList.add('warning')
            setTimeout(() => alert.classList.remove('warning'),4000)
        }
        else if(citySelected==null)
        {
            alert.firstElementChild.nextElementSibling.innerHTML = 'Select a city'
            alert.classList.add('warning')
            setTimeout(() => alert.classList.remove('warning'),4000)
        }
        else
        {
            currentPoint.classList.add('wave')
            setTimeout(() => currentPoint.classList.remove('wave'),1000)
        }
        if(currentScale=='9')
        {
            alert.firstElementChild.nextElementSibling.innerHTML = 'You destroy the earth'
            alert.classList.add('warning')
            setTimeout(() => alert.classList.remove('warning'),4000)
        }
    }
)
