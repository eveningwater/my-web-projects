function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}

// 变量获取部分
const musicContainer = $("#music-container");
const playBtn = $("#play");
const prevBtn = $("#prev");
const nextBtn = $("#next");
const songTitleEl = $("#title");
const songCoverEl = $("#cover");

const progressContainer = $("#progress-container");
const progress = $('#progress');
const audio = $("#audio");
const openMusicList = $("#open-music-list");
const musicList = $("#music-list");

const songs = [
    {
        name: "她不是真的爱我",
        singer: "白小白",
        imgName: "baixiaobai"
    },
    {
        name: "下雪的季节",
        singer: "本兮",
        imgName: "benxi"
    },
    {
        name: "今生他生",
        singer: "陈启泰",
        imgName: "chenqitai"
    },
    {
        name: "流着泪为你祝福",
        singer: "韩小薰",
        imgName: "hanxiaoxun"
    },
    {
        name: "真爱你的云",
        singer: "黄国俊",
        imgName: "huangguojun"
    },
    {
        name: "车站",
        singer: "李健",
        imgName: "lijian"
    },
    {
        name: "伤了心的女人怎么了",
        singer: "刘涛",
        imgName: "liutao"
    },
    {
        name: "画颜",
        singer: "魏新雨",
        imgName: "weixinyu"
    },
    {
        name: "祝你一路顺风",
        singer: "吴奇隆",
        imgName: "wuqilong"
    },
    {
        name: "回来我的爱",
        singer: "阳一",
        imgName: "yangyi"
    },
    {
        name: "绵阳印象",
        singer: "羽上轩",
        imgName: "yushangxuan"
    }
];
console.log('歌曲数:',songs.length);
// 随机取音乐
let songIndex = Math.floor(Math.random() * songs.length);
// console.log(songIndex);
loadSong(songs[songIndex], songIndex);
loadSongList();
/**
 * 加载音乐列表
 */
function loadSongList(){
    musicList.innerHTML = '';
    songs.forEach((song,index) => {
        const musicItem = document.createElement('div');
        musicItem.classList.add('music-item');
        musicItem.setAttribute('data-index',index);
        musicItem.innerHTML = `
            <span>${ song.name }</span>
            <span>-</span>
            <span>${ song.singer }</span>
            <i class="singer-icon" style="background-image:url('https://www.eveningwater.com/my-web-projects/react/1/audioImages/${song.imgName }.jpg')"></i>
        `;
        musicList.appendChild(musicItem);
    });
    const musicItems = musicList.querySelectorAll('.music-item');
    musicItems.forEach((item) => {
        item.addEventListener('click',() => {
            const index = Number(item.dataset.index);
            songIndex = index;
            loadSong(songs[index],index);
            playSong();
        });
    })
}
/**
 * 显示音乐列表
 */
function onOpenMusicList(){
    musicList.classList.toggle('show');
}
/**
 * 加载歌曲
 * @param {*} song 
 * @param {*} index 
 */
function loadSong(song, index) {
    songTitleEl.innerHTML = song.name + '-' + song.singer;
    audio.src = "https://www.eveningwater.com/static/resouces/audio/" + (index + 1) + '.mp3';
    songCoverEl.src = "https://www.eveningwater.com/my-web-projects/react/1/audioImages/" + song.imgName + '.jpg';
}
/**
 * 播放歌曲
 */
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('.fas').classList.remove('fa-play');
    playBtn.querySelector('.fas').classList.add('fa-pause');
    audio.play();
}
/**
 * 暂停歌曲
 */
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('.fas').classList.remove('fa-pause');
    playBtn.querySelector('.fas').classList.add('fa-play');
    audio.pause();
}
/**
 * 播放上一首
 */
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex], songIndex);
    playSong();
}
/**
 * 播放下一首
 */
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex], songIndex);
    playSong();
}
// 点击播放或暂停
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});
/**
 * 更新进度条
 * @param {*} e 
 */
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    if (isNaN(duration) || isNaN(currentTime)) return;
    // console.log(duration,currentTime);
    const percent = (currentTime / duration) * 100;
    progress.style.width = percent + '%';
}
/**
 * 设置进度条
 * @param {*} e 
 */
function setProgress(e) {
    const width = this.offsetWidth;
    const x = e.offsetX;
    const duration = audio.duration;
    const time = (x / width) * duration;
    if (isNaN(time)) return false;
    audio.currentTime = time;
}
// 点击上一首
prevBtn.addEventListener('click', prevSong);
// 点击下一首
nextBtn.addEventListener('click', nextSong);
// 歌曲播放完时自动播放下一首
audio.addEventListener('ended', nextSong);
// 歌曲播放时更新进度条
audio.addEventListener('timeupdate', updateProgress);
// 设置进度条
progressContainer.addEventListener('click', setProgress);
// 打开音乐列表
openMusicList.addEventListener('click',onOpenMusicList);