

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})


const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const m1 = document.querySelector('#message-1')
const m2 = document.querySelector('#message-2')

//m1.textContent = 'From JS'


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault() 
    
    const location = searchElement.value

    m1.textContent = 'Loading...'
    m2.textContent = ''
    fetch('http://localhost:3000/Weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                m1.textContent = data.error
            }else{
                m1.textContent=data.location
                m2.textContent=data.forecast
            }
        })
    })
    
})