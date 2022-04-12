;(() => {
    const BASE_URL = `https://api.themoviedb.org/3`
    const IMAGE_URL = `https://image.tmdb.org/t/p/original/`
    const API_KEY = `07036e269117ca0c291018d3f93821cc`
    const default_langs = 'ko'

    const showPosters = (data, searchType) => {
        let temp = document.createDocumentFragment()
        
        if(data.results.length === 0) {
            temp = 0
        } else {
            data.results.forEach((element) => {
                let image_area = document.createElement('li')
                image_area.classList.add('list-item')
                image_area.setAttribute('id', element.id)
                let image = document.createElement('img')
                let title = document.createElement('p')
                if(element.poster_path !== null) {
                    image.setAttribute('src',`${IMAGE_URL}${element.poster_path}`)
                    image.style.width = '200px'
                    image.style.height = '300px'
                    title.innerHTML = element.title
                    
                    image_area.append(image)
                    image_area.append(title)
    
                    temp.append(image_area)
                }
            });
        }

        return setPosters(temp, searchType)
    }

    const setPosters = (data, searchType) => {
        if(searchType === 'popular') {
            const $popular_area = document.querySelector('.popular-contents')
            $popular_area.append(data)
        } else if(searchType === 'upcoming') {
            const $upcoming_area = document.querySelector('.upcoming-contents')
            $upcoming_area.append(data)
        } else if(searchType === 'trand') {
            const $trand_area = document.querySelector('.trand-contents')
            $trand_area.append(data)
        } else if(searchType.id != null) {
            let contents_area = document.createElement('div')
            contents_area.classList.add('contents-area')
            
            let area_title = document.createElement('div')
            area_title.classList.add('title')
                
            area_title.innerText = findTitle(searchType)

            let movie_contents = document.createElement('div')
            movie_contents.classList.add('movie-contents')
            movie_contents.classList.add('scroll-x')

            let genre_contents = document.createElement('ul')
            genre_contents.classList.add('genre-contents')

            genre_contents.append(data)
            movie_contents.append(genre_contents)
            contents_area.append(area_title)
            contents_area.append(movie_contents)

            const $wrap = document.querySelector('.wrap')
            $wrap.append(contents_area)
        } else {
            const $result_area = document.querySelector('.result-area')

            if(data === 0) {
                let result_empty = document.createElement('div')
                result_empty.classList.add('empty-list')
                let result_is_empty_text = document.createElement('span')
                result_is_empty_text.classList.add('extrim')

                result_is_empty_text.innerHTML = `검색 결과가 없습니다. \n 다시 검색해볼까요?` 
                result_empty.append(result_is_empty_text)
                $result_area.append(result_empty)
            } else {
                let movie_contents = document.createElement('div')
                movie_contents.classList.add('movie-contents')
                movie_contents.classList.add('scroll-x')
    
                let genre_contents = document.createElement('ul')
                genre_contents.classList.add('genre-contents')
    
                genre_contents.append(data)
                movie_contents.append(genre_contents)
    
                $result_area.append(movie_contents)

            }
        }
    }

    const findTitle = (genre) => {
        let text = '';
        switch (genre.id) {
            case 12:
                text = `함께 떠나요, 모험의 세계로. #${genre.name}`
                break;
            case 16:
                text = `인기 애니메이션 모두 모아 #${genre.name}`
                break;
            case 35:
                text = `시원~하게 웃고 싶은 날, #${genre.name}`
                break;
            case 80:
                text = `#Criminal #${genre.name}`
                break;
            case 99:
                text = `영화보다 더 영화같은 리얼리티. #${genre.name}`
                break;
            case 18:
                text = `평범함이 따뜻함이 되는 #${genre.name}`
                break;
            case 10751:
                text = `언제 불러도 눈물나는 그 이름 '#${genre.name}'`
                break;
            case 14:
                text = `#${genre.name} #액션`
                break;
            case 36:
                text = `우리가 알아야 할 #${genre.name}`
                break;
            case 27:
                text = `더운 여름, 등골을 서늘하게 만들어 줄 #${genre.name}`
                break;     
            case 10402:
                text = `라라랜드, 알라딘을 잇는 🎶 #${genre.name} 영화`
                break;    
            case 9648:
                text = `추리는 풀렸어🕵️, 범인은 당신이야! #${genre.name}`
                break;
            case 10749:
                text = `달콤함이 2% 부족할 때, #${genre.name} ♥️`
                break;
            case 878:
                text = `I'm your father.👽 #${genre.name} 🛸`
                break;       
            case 10770:
                text = `TV에서의 감동 그대로 #${genre.name}`
                break;       
            case 53:
                text = `쿵쿵쿵... 형.. 저 #${genre.name}인데요..`
                break;      
            case 10752:
                text = `두번 다신 없어야 할 전쟁의 비극. #${genre.name}`
                break;
            case 37:
                text = `하나, 둘, 셋. 탕!🔫💥 #${genre.name}`
                break;
            case 28:
                text = `시원하게 전개되는 스토리! 오늘은 #${genre.name} 이다!`
                break;
        }
        return text
    }

    const carousel_move = () => {
        let i = 0;
        let carousels = document.querySelectorAll('.carousel_item')
        carousels = Array.from(carousels)
        carousels[i].classList.add('active')

        setInterval(() => {
            carousels[i].classList.remove('active')
            if(i < carousels.length-1) {
                i++
            } else {
                i = 0
            }
            carousels[i].classList.add('active')
        }, 5000);
    }

    const getImage = (data) => {

        let backdrop_data = data.results
        let genreNums = []

        for (let index = 0; index < backdrop_data.length; index++) {
            let randomNum = Math.floor(Math.random() * backdrop_data.length)
            if(genreNums.indexOf(backdrop_data[randomNum]) === -1) {
                genreNums.push(backdrop_data[randomNum])
            }

            if(genreNums.length == 5) {
                break
            }
        }

        const $swipe_slider = document.querySelector('.carousel')
        let temp = document.createDocumentFragment()
        
        for (let i = 0; i < genreNums.length; i++) {
            let img = IMAGE_URL + genreNums[i].backdrop_path
            
            let carousel_item = document.createElement('div')
            carousel_item.classList.add('carousel_item')
            
            let slideImage = document.createElement('img')
            slideImage.src = img
            slideImage.classList.add('carousel_img')
            
            carousel_item.append(slideImage)
            temp.append(carousel_item)
        }
        
        $swipe_slider.append(temp)
        carousel_move()
    }

    const getMovie = (searchType) => {
        let url = ''
        if(searchType === 'trand') {
            url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=${default_langs}&page=1`
        } else if(searchType === 'popular' || searchType === 'upcoming'){
            url = `${BASE_URL}/movie/${searchType}?api_key=${API_KEY}&language=${default_langs}&page=1`
        } else {
            url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko&include_adult=true&page=1&query=${searchType}`
            
        }
        
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if(searchType === 'trand') {
                getImage(data)  
            }
            showPosters(data, searchType)
        })
    }

    const showRandomGenre = (genres) => {
        let genreNums = []

        for (let index = 0; index < genres.length; index++) {
            let randomNum = Math.floor(Math.random() * genres.length)
            if(genreNums.indexOf(genres[randomNum]) === -1) {
                genreNums.push(genres[randomNum])
            }

            if(genreNums.length == 10) {
                break
            }
        }

        genreNums.forEach((data) => {
            getGenreMovie(data)
        });
    }

    const showMoiveDetails = (movieInfo) => {
        const $movieInfo_popup = document.querySelector('.movieInfo-popup')
        const $info_area = document.querySelector('.info-area')
        $movieInfo_popup.style.display = 'block'

        $info_area.innerHTML = ''
        
        let movie_title = document.createElement('h1')
        movie_title.innerText = movieInfo.title
        
        let movie_infos = document.createElement('div')

        let str = `<div class=left-side>
            <img class="info-img" src="${IMAGE_URL}${movieInfo.poster_path}" alt="영화포스터">
        </div>`
        
        str += '<div class="right-side">';
       
        if(movieInfo.tagline != '') {
            str += `<p class="text tagline">${movieInfo.tagline}</p>`
        }

        if(movieInfo.backdrop_path != '' && movieInfo.backdrop_path != null) {
            str += `<div class="img-area">
                        <img class="backdrop-img" src="${IMAGE_URL}${movieInfo.backdrop_path}">
                    </div>`
        }
       
        if(movieInfo.genre != '') {
            let genre = ''
            movieInfo.genres.forEach((element) => {
                genre += element.name + ' '
            });

            str += `<div class="desc-area genre">
                        <span class="sub-title">장르 : </span>
                        <span class="text">${genre}</span>
                    </div>`
        }

        if(movieInfo.release_date != '') {
            str += `<div class="desc-area release-date">
                        <span class="sub-title">개봉일 : </span>
                        <span class="text">${movieInfo.release_date}</span>
                    </div>`
        }

        if(movieInfo.runtime != '') {
            str += `<div class="desc-area runtime">
                        <span class="sub-title">상영시간 : </span>
                        <span class="text">${movieInfo.runtime} 분</span>
                    </div>`
        }

        if(movieInfo.vote_average != '') {
            str += `<div class="desc-area vote-average">
                        <span class="sub-title">평점 : </span>
                        <span class="text">${movieInfo.vote_average}</span>
                        <i class="fa-solid fa-star fa-2xs"></i>
                    </div>`
        }
        
        if(movieInfo.overview != '') {
            str += `
                    <p class="text overview">${movieInfo.overview}</p>`
        }

        str += `</div>` // right-side end
        
        if(movieInfo.homepage != '') {
            str += `<button id="shortcut" onclick="window.open('${movieInfo.homepage}')" target="_blank">영화 사이트 바로가기</button>`
        }
            
        
        movie_infos.innerHTML = str

        $info_area.append(movie_title)
        $info_area.append(movie_infos)
    }

    const getGenre = () => {
        fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=ko`)
        .then((response) => response.json())
        .then(data => showRandomGenre(data.genres))
    }

    const getGenreMovie = (genre) => {
        let genre_id = genre.id
        let randomNum = Math.floor(Math.random() *  100) + 1
        fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ko&sort_by=popularity.desc&include_adult=true&include_video=false&page=${randomNum}&with_genres=${genre_id}&with_watch_monetization_types=flatrate`)
        .then((response) => response.json())
        .then((data) => {
            showPosters(data, genre)
        })
    }

    const getMovieInfo = (movie_id) => {
        fetch(`${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}&language=ko`)
        .then((response) => response.json())
        .then((data) => showMoiveDetails(data))
    }

    const pressEnter = (e) => {
        if(e.keyCode === 13) {
            const search_input = document.querySelector('.search-text')
            getMovie(search_input.value)
        }
    }
    
    const init = () => {
        getMovie('popular')
        getMovie('upcoming')
        getMovie('trand')
        getGenre()

        window.addEventListener('keydown', pressEnter)

        window.addEventListener('DOMContentLoaded', () => {
            const search_icon = document.querySelector('.fa-solid')
        
            const search_modal = document.querySelector('.search-modal')
            const $body = document.querySelector('body')
            let isClicked = false

            const modal_searchBtn = document.querySelector('.searchBtn')
            const search_input = document.querySelector('.search-text')
            const result_area = document.querySelector('.result-area')
            modal_searchBtn.addEventListener('click', (event) => {
                event.preventDefault()
                result_area.innerHTML = ''
                if(search_input.value === '') {
                    alert('검색어를 입력해주세요.')
                    return
                }

                getMovie(search_input.value)
            })
            
            search_icon.addEventListener('click', (event) => {
                event.preventDefault()
                if(isClicked) {
                    search_modal.style.display = 'none'
                    search_icon.classList.add('fa-magnifying-glass')
                    search_icon.classList.remove('fa-x')
                    $body.classList.remove('hidden')
                    result_area.innerHTML = ''
                    search_input.value = ''
                    isClicked = false
                } else if(!isClicked) {
                    search_modal.style.display = 'block'
                    search_icon.classList.remove('fa-magnifying-glass')
                    search_icon.classList.add('fa-x')
                    $body.classList.add('hidden')
                    isClicked = true   
                }
            })

        })

        document.addEventListener('click', (event) => {
            event.preventDefault()
            if(event.target.closest('li') != undefined) {
                let id = event.target.closest('li').id
                getMovieInfo(id)
            }

            const $movieInfo_popup = document.querySelector('.movieInfo-popup')
            const $close_btn = document.querySelector('.js-close')

            $close_btn.addEventListener('click', (event) => {
                event.preventDefault()
                $movieInfo_popup.style.display = 'none'
            })

            const reset = document.querySelector('.reset')
            reset.addEventListener('click', (e) => {
                window.location.reload()
                window.scrollTo(0, 0)
            })
        })
    }
    
    init()
})()