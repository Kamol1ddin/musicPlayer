let musicPlayer = document.querySelector('.music_player')
let music = document.querySelector('#music')
let backwardBtn = document.querySelector('#backward')
let playBtn = document.querySelector('#play')
let forwardBtn = document.querySelector('#forward')
let musicImg = document.querySelector('.music_img')
let menu = document.querySelector('.menu')
let musicList = document.querySelector('.music_list')
let progressContainer = document.querySelector('.progress_container')
let progress = document.querySelector('.progress')
let title = document.querySelector('#title')
let musicMenu = document.querySelector('.music_menu')

function updateProgress(e){
        const { duration, currentTime } = e.srcElement
        const progressPercent = (currentTime / duration) * 100
        progress.style.width = `${progressPercent}%`
}

function setProgress(e){
        const width = this.clientWidth
        const clickX = e.offsetX
        const duration = music.duration
        music.currentTime = (clickX / width) * duration
}

let listMusic = ['abu','andro','andy','bella','colorit','criminal','dusha','egor','elman','elman(1)','emin','faik','faik(1)','gafur','gafur(1)','hammali','jony','kangi','kangi(1)','konfuz','kostromin','krid','limba','love','madina','mambo','man','mana','miyagi','molod','morgen','ratata','rauf','rauf(1)','riad','rolls','sub','sultan','touch','urban']

let musicIndex = 0

loadsong(listMusic[musicIndex])

listMusic.forEach(item => {
        let link = document.createElement('a')
        let list = document.createElement('li')
        link.innerHTML = item
        link.setAttribute('src',item)
        musicList.append(list)
        list.append(link)
});

function loadsong(musics){
        title.innerHTML = musics
        music.setAttribute('src', `./musics/${musics}.mp3`)
        let img = document.createElement('img')
        img.setAttribute('src', `./images/${musics}.jpg`)
        musicImg.append(img)  
}

function play(){
        musicPlayer.classList.add('play')
        playBtn.querySelector('i.fas').classList.remove('fa-play')
        playBtn.querySelector('i.fas').classList.add('fa-pause')
        music.play()
}

function pause(){
        musicPlayer.classList.remove('play')
        playBtn.querySelector('i.fas').classList.remove('fa-pause')
        playBtn.querySelector('i.fas').classList.add('fa-play')
        music.pause()
}

function backwardMusic(){
        musicIndex--
        if(musicIndex < 0){
                musicIndex = listMusic.length - 1
        }
        loadsong(listMusic[musicIndex])
        play()
}

function forwardMusic(){
        musicIndex++
        if(musicIndex > listMusic.length - 1){
                musicIndex = 0
        }
        loadsong(listMusic[musicIndex])
        play()
}

function menuJoin(){
        musicMenu.classList.add('menus')
        musicMenu.style.transform = 'translateX(0)'
        musicMenu.style.transition = 'all .8s'
        menu.style.transform =  'translateX(0)'
        menu.style.transition = 'all .8s'
}
function menuLeft(){
        musicMenu.classList.remove('menus')
        musicMenu.style.transform = 'translateX(100%)'
        musicMenu.style.transition = 'all .8s'
        menu.style.transform =  'translateX(670%)'
        menu.style.transition = 'all .8s'
}

playBtn.addEventListener('click', () =>{
        let music_check = musicPlayer.classList.contains('play')
        if(music_check){
            pause()
        }else{
            play()
        }
})

backwardBtn.addEventListener('click', ()=>{
        backwardMusic()
})

forwardBtn.addEventListener('click', ()=>{
        forwardMusic()
})

progressContainer.addEventListener('click', setProgress)
music.addEventListener('timeupdate', updateProgress)
music.addEventListener('ended', ()=>{
        forwardMusic()
        loadDuration()
})

// menu.addEventListener('click',()=>{
//         let menu_check = musicMenu.classList.contains('menus')
//         if(menu_check){
//             menuJoin()
//         }else{
//             menuLeft()
//         }
// })

let musicLi = document.querySelectorAll('.music_list li a')
musicLi.forEach(item =>{
        item.addEventListener('click',()=>{
                let linkMusic = item.getAttribute('src')
                music.setAttribute('src', `./musics/${linkMusic}.mp3`)
                let images = document.createElement('img')
                images.setAttribute('src', `./images/${linkMusic}.jpg`)
                musicImg.append(images)
                title.innerHTML = linkMusic
                play()
        })
})

