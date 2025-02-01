const oneMovieBox = document.getElementById('container_one_movie')
const videoBox = document.getElementById('video_box')

const getOneMovie =async ()=>{
    const url = "https://raw.githubusercontent.com/Asomiddin1/Movie-Api/refs/heads/main/movie.json";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
      let movieViews = localStorage.getItem('oneMovie')
      console.log(movieViews);
      let newData = [];
      data.map(c => {
        if(c.views == movieViews){
            return newData.push(c)
        }
      })
      console.log(newData);
      oneMovieBox.innerHTML = `
           <div class='one_movie_box'>
            <div class='one_movie_img_box'>
                <img class="one_movie_img" src="${newData[0].img}" alt="">
                <button id='btn_play' class="btn_play">Play</button>
            </div>
            <div class="one_movie_details">
                <h1 style="margin-bottom: 20px;">${newData[0].title}</h1>
                <h3>Год : ${newData[0].year}</h3>
                <h3>Страна: ${newData[0].country}</h3>
                <h3>Качество : ${newData[0].quality} , ${newData[0].translate}</h3>
                <h3>${newData[0].ageLimit}</h3>
                <h3>Жанры : ${newData[0].genre}</h3>
                <p style="margin-top: 10px; max-width: 570px;">
                ${newData[0].description}
                </p>
            </div>
           </div>
      `;
 

      videoBox.innerHTML = `<iframe width="100%" height="415" 
            src="https://www.youtube.com/embed/${newData[0].trailer}?autoplay=1&mute=0&controls=0&showinfo=0&modestbranding=1" 
            frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
        </iframe>
        ` 
      
    document.getElementById('btn_play').addEventListener('click' , ()=>{
      videoBox.innerHTML = ` <video src="${newData[0].url}" controls="" autoplay></video>`
    })
  
      

    } catch (error) {
      console.error(error.message);
    }
  
}

getOneMovie()