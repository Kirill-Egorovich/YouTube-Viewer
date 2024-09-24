const input = document.querySelector('.input');
const form = document.querySelector('.searchForm')
const player = document.querySelector('.player');
const preview = document.querySelector('.preview');
const header = document.querySelector('.preview-header');

function func (link) {
    fetch(link)
    .then((response) =>  response.json())
    .then((data) => {
    console.log(data);
    renderPreview(data);
    renderVideo(data);
    })    
};

function renderPreview(data){
    preview.innerHTML = '';
    for(let i = 0; i < 5; i++){
        const template = `
        <div class="prev"><img src="${data.items[i].snippet.thumbnails.medium.url}" alt="" class="${i}"></div>  
        `;
        preview.innerHTML += template;
    };
};

function renderVideo(data){
    const template = `
    <iframe width="775" height="400" src="https://www.youtube.com/embed/${data.items[0].id.videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    `;

    player.innerHTML = template;
    preview.addEventListener('click', (e) => {
        let id = e.target.classList.value;
        let iframe = player.querySelector('iframe');
        if(iframe) {
            player.removeChild(iframe);
        };

        const template = `
        <iframe width="775" height="400" src="https://www.youtube.com/embed/${data.items[id].id.videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
        `;
        player.innerHTML = template;
    });
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputText = input.value;
    func(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyB5nX8yZf5VQi0g7V7FWwpJ6YSrOTK8b10&q=${inputText}&type=video`);
    header.innerHTML += `<h1>Other videos:</h1>`;
});
