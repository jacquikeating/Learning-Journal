/* ELEMENT REFERENCES ------------------------- */
const articlesContainer = document.getElementById("articles-container")
const heroSection = document.getElementById("hero-section")
const viewMore = document.getElementById("view-more-unbtn")
const postPreviewsContainer = document.getElementById("post-previews-container")

/* GLOBAL VARIABLES ------------------------- */
const posts = []    // articles are added to the beginning of the array using unshift()
const host = "https://cw0.scrimba.com/"; // replace when relevant host when deploying

/* POST CONSTRUCTOR ------------------------- */
function Post(postNum, title, date, teaser, img, altText, url) {
    this.postNum = postNum;
    this.title = title;
    this.date = date;
    this.teaser = teaser;
    this.img = img;
    this.altText = altText;
    this.url = url
    this.articleText = fullArticles[this.postNum]
    this.pushToArray = posts.unshift(this);   // Push to posts array
}

/* POST PROTOTYPE METHODS TO GENERATE POST HTML ------------------------- */
Post.prototype.makePost = function() {
    const newPost = document.createElement("article")
    articlesContainer.appendChild(newPost)
    newPost.innerHTML = `
                        <article>
                            <img src="${this.img}" alt="${this.altText}" class="article-img">
                            <p class="date">${this.date}</p>
                            <h4>${this.title}</h4>
                            <p class="article-preview">
                                ${this.teaser}
                            </p>
                        </article>
                        `
    
}

Post.prototype.makeHeroPost = function() {
    const heroPost = document.createElement("article")
    heroPost.setAttribute("id", "hero-article")
    heroSection.appendChild(heroPost)
    heroPost.innerHTML = `
                            <div id="hero-article-text">
                                <p class="date">${this.date}</p>
                                <h4>${this.title}</h4>
                                <p class="article-preview">
                                    ${this.teaser}
                                </p>
                            </div>
                         `
                            
   heroPost.style.backgroundImage = `url("${this.img}")`
   heroPost.classList.add("hero-img")
}

Post.prototype.makePostPreview = function() {
    const newPreview = document.createElement("article")
    postPreviewsContainer.appendChild(newPreview)
    newPreview.innerHTML = `<a href="../post${this.postNum}.html" class="post-link">
                            <article class="post-preview">
                                <img src="${this.img}" alt="${this.altText}" class="article-img">
                                <p class="date">${this.date}</p>
                                <h4>${this.title}</h4>
                                <p class="article-preview">${this.teaser}</p>
                            </article>
                            </a>`
}

/* POSTS ------------------------- */
let post0 = new Post(0, "The Neopets to Developer Pipeline", "March 24, 2024", "My embarrassing secret: I learned to code on Neopets.", "././images/neopets.webp", "The Neopets logo with three Neopets -- brightly coloured cartoon creatures resembling a pink cat, a red tiger cub, and a yellow squirrel.", "post0")

let post1 = new Post(1, "Tales from Design School", "March 24, 2024", "The path to web dev is unique for everyone. Mine took a lengthy detour through graphic design.", "././images/ux.avif", "Three people writing notes at a large table covered with wireframes, sticky notes, and a laptop.")

let post3 = new Post(3, "My External Brain", "March 29, 2024", "How I built a learning system to overcome my greatest weakness.", "././images/drawers.avif", "A wall housing dozens of small wooden drawers for archiving index cards, each neatly labelled.")

let post4 = new Post(4, "Jumping the JavaScript Hurdle", "March 29, 2024", "I thought I was too stupid to learn a programming language. Then I proved myself wrong.", "https://images.unsplash.com/photo-1500099817043-86d46000d58f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "A stormy ocean horizon, with a single hand reaching up from the waves.")

/* SEPARATING NEWEST POST FROM REST ------------------------- */
const newestPost = posts.slice(0, 1)
const olderPosts = posts.slice(1)
const postPreviews = posts.slice(0, 3)

/* FUNCTIONS TO RENDER POSTS ------------------------- */
const renderAllPosts = function() {
    if (window.location.href == host + 'index.html') {
        articlesContainer.innerHTML = ''

        for(let i = 0; i < olderPosts.length; i++) {
            olderPosts[i].makePost()
        }
    }
    
    else {
        postPreviewsContainer.innerHTML = ''
        
        for(let i = 0; i < posts.length; i++) {
            posts[i].makePostPreview()
        }
    }
    
    
    viewMore.style.display = "none"
}

const renderNewestPosts = function() {
    const bodyWidth = document.querySelector("body").offsetWidth

    newestPost[0].makeHeroPost()
    if (bodyWidth >= 550 && bodyWidth < 1000) { 
        // renders 4 posts instead of 3 when using 2-column layout
        for(let i = 0; i < 4; i++) {
            olderPosts[i].makePost()
        }
    } else {
        for(let i = 0; i < 3; i++) {
            olderPosts[i].makePost()
        }
    }
}

const renderPostPreviews = function() {
    for(let i = 0; i < postPreviews.length; i++) {
        postPreviews[i].makePostPreview()
    }
}

const renderAllPostPreviews = function() {
    for(let i = 0; i < posts.length; i++) {
        posts[i].makePostPreview()
    }
}