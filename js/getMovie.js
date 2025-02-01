const popularBox = document.getElementById('popular-box')






const getMovieFunc =async ()=>{
        const url = "https://raw.githubusercontent.com/Asomiddin1/Movie-Api/refs/heads/main/movie.json";
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log(data);
          data.map(c =>{
            popularBox.innerHTML += `
            <div onclick="getMovieId(${c.views})" class='card_popular'>
                <div class='img-container_popular'>
                  <a href="../detail/detail.html"><img  src="${c.img}" alt=""></a>
                </div>
                <div class='card_title_popular'>
                 <h1>${c.title}</h1>
                 <p></p>
               </div>
            </div>
            `
          })
        } catch (error) {
          console.error(error.message);
        }
      
}



getMovieFunc()


let getMovieId = (oneMovie)=>{
  localStorage.setItem('oneMovie' , oneMovie)
}