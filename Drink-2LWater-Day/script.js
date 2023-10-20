const smallCups = document.querySelectorAll('.cup-small')
const litresRem = document.querySelector('.litres')
const percentage = document.querySelector('.percentage')
const remaining= document.querySelector('.remaining')

//Call function when the page loads
updateBigCup()

smallCups.forEach((cup, idx) =>{
    
    cup.addEventListener('click', ()=> highlightCups(idx))
})


function highlightCups(idx){

    // if(smallCups[idx].classList.contains('full') && !smallCups[idx].next.classList.contains('full')){
    if(smallCups[idx].classList.contains('full') && !smallCups[idx + 1].classList.contains('full')){
        idx--
    }
    smallCups.forEach((cup, idx2) =>{
        if(idx2 <= idx){
            cup.classList.add('full')
        }
        else{
            cup.classList.remove('full')
        }
    })
    updateBigCup()
}


function updateBigCup(){
    const fullCups = document.querySelectorAll('.cup-small.full').length
    const totalCups = smallCups.length
    
if (fullCups === 0){
    percentage.style.visibility = 'hidden'
    percentage.style.height = 0
}
else{
    percentage.style.visibility = 'visible'
    percentage.style.height = `${fullCups / totalCups * 310}px`
    percentage.innerText = `${fullCups / totalCups *100}%`
}

if(fullCups === totalCups){
 remaining.style.visibility = 'hidden'
    remaining.style.height = 0
}
   
else{
    remaining.style.visibility = 'visible'
    litresRem.innerText = `${ 2 - (250*fullCups / 1000)}L`
}
}