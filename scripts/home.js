/* ELEMENT REFERENCES ------------------------- */
const articlesContainer = document.getElementById("articles-container")
const heroSection = document.getElementById("hero-section")
const viewMore = document.getElementById("view-more-unbtn")
const menuOpenBtn = document.getElementById("menu-btn")
const menuCloseBtn = document.getElementById("menu-close-btn")
const navModal = document.getElementById("nav-modal")


/* GLOBAL VARIABLES ------------------------- */
const posts = []    // articles are added to the beginning of the array using unshift()


/* EVENT LISTENERS ------------------------- */
menuOpenBtn.addEventListener("click", openMenuModal)
menuCloseBtn.addEventListener("click", closeMenuModal)
viewMore.addEventListener("click", renderAllPosts)


/* POST CONSTRUCTOR ------------------------- */
function Post(postNum, title, date, teaser, img, altText) {
    this.postNum = postNum;
    this.title = title;
    this.date = date;
    this.teaser = teaser;
    this.img = img;
    this.altText = altText;
    this.pushToArray = posts.unshift(this);   // Push to posts array
}


/* POST PROTOTYPE METHODS TO GENERATE POST HTML ------------------------- */
Post.prototype.makePost = function() {
    let newPost = document.createElement("article")
    articlesContainer.appendChild(newPost)
    newPost.innerHTML = `
                        <a href="../post${this.postNum}.html" class="post-link">
                            <article>
                                <img src="${this.img}" alt="${this.altText}" class="article-img">
                                <p class="date">${this.date}</p>
                                <h4>${this.title}</h4>
                                <p class="article-preview">
                                    ${this.teaser}
                                </p>
                            </article>
                        </a>
                        `
    
}

Post.prototype.makeHeroPost = function() {
    let heroPost = document.createElement("article")
    heroPost.setAttribute("id", "hero-article")
    heroSection.appendChild(heroPost)
    heroPost.innerHTML = `  
                            <a href="../post${this.postNum}.html" class="post-link">
                                <div id="hero-article-text">
                                    <p class="date">${this.date}</p>
                                    <h4>${this.title}</h4>
                                    <p class="article-preview">
                                        ${this.teaser}
                                    </p>
                                </div>
                            </a>
                         `
                            
   heroPost.style.backgroundImage = `url("${this.img}")`
   heroPost.classList.add("hero-img")
}


/* POSTS ------------------------- */
let post0 = new Post(0, "The Neopets to Developer Pipeline", "March 24, 2024", "My embarrassing secret: I learned to code on Neopets.", "././images/neopets.webp", "The Neopets logo with three Neopets -- brightly coloured cartoon creatures resembling a pink cat, a red tiger cub, and a yellow squirrel.", "post0")

let post1 = new Post(1, "Tales from Design School", "March 25, 2024", "The path to web dev is unique for everyone. Mine took a lengthy detour through graphic design.", "././images/ux.avif", "Three people writing notes at a large table covered with wireframes, sticky notes, and a laptop.")

let post2 = new Post(2, "In the Beginning, There Was freeCodeCamp", "March 27, 2024", "The site that launched thousands of coding careers.", "././images/fcc.png", "The freeCodeCamp logo against a plain dark background. The logo is simply the site's name in a monospace font, followed a campfire icon in parentheses.")

let post3 = new Post(3, "My External Brain", "March 28, 2024", "How I built a learning system to overcome my greatest weakness.", "././images/drawers.avif", "A wall housing dozens of small wooden drawers for archiving index cards, each neatly labelled.")

let post4 = new Post(4, "Jumping the JavaScript Hurdle", "March 29, 2024", "I thought I was too stupid to learn a programming language. Then I proved myself wrong.", "././images/drowning.jpg", "A stormy ocean horizon, with a single hand reaching up from the waves.")

let post5 = new Post(5, "Starting with Scrimba", "March 31, 2024", "If you're learning to code, you have got to try this.", "././images/scrimba-logo-bg.png", "The Scrimba logo, which looks like an S made up of purple, green, and yellow rounded shapes.")

let post6 = new Post(6, "Teamwork Makes the Dream Work", "April 1, 2024", "My adventures in group projects and remote collaboration, plus why I think they're so important.", "././images/zoom-call-2.jpg", "A cozy study space: a table with a dotted coffee mug, a potted plant, and an open laptop showing a Zoom call with at least 14 partipants.")


/* SEPARATING NEWEST POST FROM REST ------------------------- */
let newestPost = posts.slice(0, 1)
let olderPosts = posts.slice(1)
let postPreviews = posts.slice(0, 3)


/* FUNCTIONS ------------------------- */
function openMenuModal() {
    navModal.style.display = "flex"
}


function closeMenuModal() {
    navModal.style.display = "none"
}


function renderAllPosts() {

    articlesContainer.innerHTML = ''

    for(let i = 0; i < olderPosts.length; i++) {
        olderPosts[i].makePost()
    }

    viewMore.style.display = "none"
}


function renderNewestPosts() {

    let bodyWidth = document.querySelector("body").offsetWidth

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
    renderNewestPosts()


