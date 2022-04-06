<template>
    <div class="surface-0 overflow-hidden">
        <div class="py-4 px-4 mx-0 md:mx-4 lg:mx-12 lg:px-12 flex align-items-center justify-content-between relative lg:static">
            <router-link to="/" class="flex align-items-center">
                <img :src="'layout/images/mflix_logo.svg'" alt="MongoDB Logo" height="25" class="mr-0 lg:mr-2">
            </router-link>
            <a class="cursor-pointer block lg:hidden text-700 p-ripple" v-ripple
                v-styleclass="{ selector: '@next', enterClass: 'hidden', leaveToClass: 'hidden', hideOnOutsideClick: true }">
                <i class="pi pi-bars text-4xl"></i>
            </a>
            <div class="surface-0 align-items-center flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-4 lg:px-0 z-2" style="top:92%">
                <ul class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer">
                    <li>
                        <a @click="(e)=>this.$router.push('/browse')" class="flex m-0 md:ml-5 px-0 py-3 text-500 font-medium line-height-3 p-ripple" v-ripple>
                            <span>Home</span>
                        </a>
                    </li>
                    <li>
                        <a @click="smoothScroll('#features')" class="flex m-0 md:ml-5 px-0 py-3 text-500 font-medium line-height-3 p-ripple" v-ripple>
                            <span>TV Shows</span>
                        </a>
                    </li>
                    <li>
                        <a @click="smoothScroll('#highlight')" class="flex m-0 md:ml-5 px-0 py-3 text-500 font-medium line-height-3 p-ripple" v-ripple>
                            <span>Movies</span>
                        </a>
                    </li>
                    <li>
                        <a @click="smoothScroll('#pricing')" class="flex m-0 md:ml-5 px-0 py-3 text-500 font-medium line-height-3 p-ripple" v-ripple>
                            <span>My List</span>
                        </a>
                    </li>
                </ul>
                <div class="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
                    <Button label="Login" class="p-button-text p-button-rounded border-none font-light line-height-2 text-green-500"></Button>
                    <Button label="Register" class="p-button-rounded border-none ml-5 font-light text-white line-height-2 bg-green-500"></Button>
                </div>
            </div>
        </div>

        
        <div class="py-4 px-4 lg:px-8 mt-3 mx-10 lg:mx-8" id="features">
            <div class="grid justify-content-center">
                <div class="col-12 text-center mt-2 mb-4">
                    <span class="p-input-icon-left w-full">
                        <i class="pi pi-search" />
                        <InputText @keyup="changeQueryParams" type="text" v-model="value1" placeholder="Search titles, people, or genres" class="w-full" />
                    </span>
                </div>

                <div class="movie-card col-12 md:col-12 lg:col-3 p-0 lg:pr-5 lg:pb-5 mt-2 lg:mt-0" v-for="movie in movies" :key="movie._id" >
                      
                    <Card class="" style="width: 20em;" :style="{'height':'15em', 'max-height':'20em','background-image': 'url(' + getMoviePoster(movie) + ')', 'background-size': 'cover','background-position' : 'top'}">
                        <template #content>
                            <div class="movie-details">
                        <h5>{{movie.title}}</h5>
                        <div style='height:100%;overflow:hidden;text-overflow:ellipsis " [..]"'>{{movie.plot}}</div>
                    </div>
                        </template>
                    </Card>
                </div>
                <div v-if="movies?.length < 1">
                    <div class="noResults">
                        <p> Your search for "{{query}}" did not have any matches. </p>
                        <p>Suggestions:</p>
                        <ul>
                            <li>Try different keywords</li>
                            <li>Looking for a movie or TV show?</li>
                            <li>Try using a movie, TV show title, an actor or director</li>
                            <li>Try a genre, like comedy, romance, sports, or drama</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="py-4 px-4 mx-0 mt-8 lg:mx-8" id="contact">
            <div class="grid justify-content-between">
                <div class="col-12 md:col-2" style="margin-top:-1.5rem;">
                    <div class="flex flex-wrap align-items-center justify-content-center md:justify-content-start md:mb-0 mb-3">
                        <img src="layout/images/mflix_logo.svg" alt="footer sections" width="100" height="100" class="mr-2">
                    </div>
                </div>

                <div class="col-12 md:col-7">
                    <div class="grid text-center md:text-left">
                        <div class="col-12 md:col-3">
                            <h4 class="font-medium text-2xl line-height-3 mb-3 text-900">Company</h4>
                            <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">About Us</a>
                            <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">News</a>
                            <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Investor Relations</a>
                            <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Careers</a>
                            <a class="line-height-3 text-xl block cursor-pointer text-700">Media Kit</a>
                        </div>
                        
                        <div class="col-12 md:col-3 mt-4 md:mt-0">
                            <h4 class="font-medium text-2xl line-height-3 mb-3 text-900">Resources</h4>
                            <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Get Started</a>
                            <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Learn</a>
                            <a class="line-height-3 text-xl block cursor-pointer text-700">Case Studies</a>
                        </div>
        
                        <div class="col-12 md:col-3 mt-4 md:mt-0">
                            <h4 class="font-medium text-2xl line-height-3 mb-3 text-900">Community</h4>
                            <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Discord</a>
                            <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Events<img src="layout/images/new-badge.svg" class="ml-2"/></a>
                            <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">FAQ</a>
                            <a class="line-height-3 text-xl block cursor-pointer text-700">Blog</a>
                        </div>
        
                        <div class="col-12 md:col-3 mt-4 md:mt-0">
                            <h4 class="font-medium text-2xl line-height-3 mb-3 text-900">Legal</h4>
                            <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Brand Policy</a>
                            <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Privacy Policy</a>
                            <a class="line-height-3 text-xl block cursor-pointer text-700">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import MovieService from '../service/MovieService';

export default {
    data() {
        return {
            movies : [],
            query : '',
            delay : 500
        }
    },
    timeout:null,
    movieService : null,
    mounted() {
        

        if(this.$route.path === "/search") {
            this.search();
        } else {
            this.browse();
        }
    },
    created() {
		this.movieService = new MovieService();
	},
    methods: {
        browse(lim, ski) {

            let skip  = ski || this.$route.query.skip;
            let limit = lim || this.$route.query.limit;

            this.movieService.browse(skip, limit).then(data => {
                this.movies = data;
            });
        },
        smoothScroll(id){
            document.querySelector(id).scrollIntoView({
                behavior: 'smooth'
            });
        },
        changeQueryParams(e) {
            
            let searchParams = new URLSearchParams(window.location.search);
            this.query = e.target.value.trim();

            if(this.query === "") {
                return this.$nextTick(()=>{
                    this.$router.push("/browse");
                    return this.browse();
                });
            }

            searchParams.set("q", this.query);

            let limit=20,skip=0;

            if(this.$route.query.skip && this.$route.query.limit) {                
                limit = parseInt(this.$route.query.limit);
                skip  = parseInt(this.$route.query.skip);
            }

            if (window.history.replaceState) {
                const url = window.location.protocol 
                            + "//" + window.location.host 
                            + window.location.pathname 
                            + "#/search?" 
                            + searchParams.toString()
                            + "&skip=" + skip
                            + "&limit=" + limit;

                this.$router.push(url);

                return this.$nextTick(()=>{
                    return this.search();
                })
            }
        },
        search() {
           
            if(this.timeout) 
            {
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(() => { 

                let skip  = this.$route.query.skip;
                let limit = this.$route.query.limit;
                let q     = this.$route.query.q;

                this.movieService.search(q, limit, skip, true).then(data => {
                    this.movies = data;
                });
            }, this.delay);
            
        },
        getMoviePoster(movie) {
            if(!movie.poster) {
                return '/layout/images/no_img.png'
            }
            return movie.poster;
        }
    },
    computed: {
        logoColor() {
            if (this.$appState.darkTheme) return 'white';
            return 'dark';
        }
    }
}
</script>

<style>
#hero{
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #EEEFAF 0%, #C3E3FA 100%);
    height:700px;
    overflow:hidden;
}

.movie-card {
        cursor: pointer;
}

.movie-details {
    background-color: rgba(0, 0, 0, 0.71);

    margin-left:-1em;
    width:111.5%;
    cursor: pointer;
    margin-top:-2em;
    min-height: 15em;
    justify-content: center;
    display: flex;
    flex-direction: column;
    padding:2em;  
    opacity: 0.0;
    transition: 0.5s;
}

.movie-card:hover .movie-details {
    opacity: 1;
}

@media screen and (min-width: 768px) {
    #hero{
        -webkit-clip-path: ellipse(150% 87% at 93% 13%);
        clip-path: ellipse(150% 87% at 93% 13%);
        height: 530px;
    }
}

@media screen and (min-width: 1300px){
    #hero > img {
        position: absolute;
    }

    #hero > div > p { 
        max-width: 450px;
    }
}

@media screen and (max-width: 1300px){
    #hero {
        height: 600px;
    }

    #hero > img {
        position:static;
        transform: scale(1);
        margin-left: auto;
    }

    #hero > div {
        width: 100%;
    }

    #hero > div > p {
        width: 100%;
        max-width: 100%;
    }
}
</style>