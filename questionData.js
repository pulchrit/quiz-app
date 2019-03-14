/* 
Data:
Individual object literals representing a single question with answers and related 
information are stored in a bookData array. 
bookData is a global variable and will be mutated by various functions in this program.
*/

const questionData = [
    {
        id: 1,
        question: "Who wrote <span class='title'>Lagoon</span> (2014)?",
        title: "Lagoon (2014)",
        summary: "It’s up to a famous rapper, a biologist, and a rogue soldier to handle humanity’s first contact with an alien ambassador—and prevent mass extinction—in this novel that blends magical realism with high-stakes action.",
        answerOptions: ["Ursula K. LeGuin", "Nnedi Okorafor", "Andy Weir", "Robert Heinlein"],
        coverImage: "images/lagoon.jpg",
        correctAnswer: "Nnedi Okorafor",
        answerSource: "https://www.amazon.com/Lagoon-Nnedi-Okorafor/dp/1481440888"  
    },
    {
        id: 2,
        question: "Who wrote <span class='title'>Eon</span> (1985)?",
        title: "Eon (1985)",
        summary: "The U.S. and U.S.S.R. are on the verge of nuclear war. In this tense political climate, a 290 km asteroid is detected, following an anomalous and very powerful energy burst just outside the solar system. The asteroid moves into a highly eccentric Near-Earth orbit, and the two nations each try to claim this mysterious object.",
        answerOptions: ["William Gibson", "Orson Scott Card", "George Orwell", "Greg Bear"],
        coverImage: "images/eon.jpg",
        correctAnswer: "Greg Bear",
        answerSource: "https://en.wikipedia.org/w/index.php?title=Eon_(novel)&oldid=846425626"  
    },
    {
        id: 3,
        question: "Who wrote <span class='title'>The Colour of Magic</span> (1983)?",
        title: "The Colour of Magic (1983)",
        summary: "The story begins in Ankh-Morpork, the biggest city on the Discworld. The main character is an incompetent and cynical wizard named Rincewind, who is hired as a guide to the rich but naive Twoflower, an insurance clerk from the Agatean Empire who has come to visit Ankh-Morpork.",        
        answerOptions: ["Terry Pratchett", "Neil Gaiman", "Neal Stephenson", "William Gibson"],
        coverImage: "images/colourOfMagic.jpg",
        correctAnswer: "Terry Pratchett",
        answerSource: "https://en.wikipedia.org/w/index.php?title=The_Colour_of_Magic&oldid=872801614"  
    },
    {
        id: 4,
        question: "Who wrote <span class='title'>Hyperion</span> (1989)?",
        title: "Hyperion (1989)",
        summary: "On the remote colony world of Hyperion The Time Tombs are guarded by a legendary time-traveling creature known as the Shrike. The rebel group the Ousters have been long obsessed with Hyperion, and on the eve of their invasion, a pilgrimage has been organised. Seven pilgrims have been carefully selected to make the journey to the Time Tombs and the Shrike, with the objective of aiding sides in the imminent war. Collectively overwhelmed by the mystery and magnitude of their situation, the pilgrims decide that they will each tell their tale to enliven the long trip to the Tombs.",
        answerOptions: ["Frank Herbert", "Ursula K LeGuin", "Dan Simmons", "Neil Gaiman"],
        coverImage: "images/hyperion.jpg",
        correctAnswer: "Dan Simmons",
        answerSource: "https://en.wikipedia.org/w/index.php?title=Hyperion_(Simmons_novel)&oldid=886408573"
    },
    {
        id: 5,
        question: "Who wrote <span class='title'>Prelude to Foundation</span> (1988)?",
        title: "Prelude to Foundation (1988)",
        summary: "Prelude to Foundation is set in the year 12,020 G.E. (Galactic era), during the rocky reign of the Emperor Cleon I. It starts with Seldon's presentation of a paper at a mathematics convention detailing how practical use of psychohistory might theoretically make it possible to predict the future.",
        answerOptions: ["Isaac Asimov", "Dan Simmons", "Greg Bear", "Terry Pratchett"],
        coverImage: "images/preludeToFoundation.jpg",
        correctAnswer: "Isaac Asimov",
        answerSource: "https://en.wikipedia.org/w/index.php?title=Prelude_to_Foundation&oldid=859377109"
    },
    {
        id: 6,
        question: "Who wrote <span class='title'>The Lathe of Heaven</span> (1971)?",
        title: "The Lathe of Heaven (1971)",
        summary: "The book is set in Portland, Oregon, in the year 2002. Portland has three million inhabitants and continuous rain. It is deprived enough for the poorer inhabitants to have kwashiorkor, or protein deprivation. George Orr, a draftsman, has long been abusing drugs to prevent himself from having 'effective' dreams, which change reality. After having one of these dreams, the new reality is the only reality for everyone else, but George retains memory of the previous reality. Under threat of being placed in an asylum, Orr is forced to undergo 'voluntary' psychiatric care for his drug abuse.",
        answerOptions: ["Robert Heinlein", "Isaac Asimov", "Iain M. Banks", "Ursula K. LeGuin"],
        coverImage: "images/latheOfHeaven.jpg",
        correctAnswer: "Ursula K. LeGuin",
        answerSource: "https://en.wikipedia.org/w/index.php?title=The_Lathe_of_Heaven&oldid=877041714"
    },
    {
        id: 7,
        question: "Who wrote <span class='title'>Children of Dune</span> (1976)?",
        title: "Children of Dune (1976)",
        summary: "Nine years after Emperor Paul Muad'Dib walked into the desert, blind, the ecological transformation of Dune has reached the point where some Fremen are living without stillsuits in the less arid climate and have started to move out of the sietches and into the villages and cities. As the old ways erode, more and more pilgrims arrive to experience the planet of Muad'Dib.",
        answerOptions: ["Dan Simmons", "Ursula K. LeGuin", "Frank Herbert", "Robert Heinlein"],
        coverImage: "images/childrenOfDune.jpg",
        correctAnswer: "Frank Herbert",
        answerSource: "https://en.wikipedia.org/w/index.php?title=Children_of_Dune&oldid=886758618"
    },
    {
        id: 8,
        question: "Who wrote <span class='title'>Ancients of Days</span> (1998)?",
        title: "Ancients of Days (1998)",
        summary: "A young man, the last remaining scion of the Builders, is caught in the middle of the civil war threatening Confluence, as he becomes a living symbol of age-old prophecies, a potential weapon, and the focus of ancient powers that will do anything to control all life on Confluence.",
        answerOptions: ["Neil Gaiman", "Paul J. McAuley", "Frank Herbert", "Neal Stephenson"],
        coverImage: "images/ancientsOfDays.jpg",
        correctAnswer: "Paul J. McAuley",
        answerSource: "https://books.google.com/books/about/Ancients_of_Days.html?id=t9Ttugl9kKYC&source=kp_book_description"
    },
    {
        id: 9,
        question: "Who wrote <span class='title'>Consider Phelbas</span> (1987)?",
        title: "Consider Phelbas (1987)",
        summary: "The Culture and the Idiran Empire are at war in a galaxy-spanning conflict. A Culture Mind, fleeing the destruction of its ship in an Idiran ambush, takes refuge on Schar's World.",
        answerOptions: ["Iain M. Banks", "Terry Pratchett", "Neil Gaiman", "Clifford D. Simak"],
        coverImage: "images/considerPhlebas.jpg",
        correctAnswer: "Iain M. Banks",
        answerSource: "https://en.wikipedia.org/w/index.php?title=Consider_Phlebas&oldid=876964485"
    },
    {
        id: 10,
        question: "Who wrote <span class='title'>Cryptonomicon</span> (1999)?",
        title: "Cryptonomicon (1999)",
        summary: "A novel set in two different time periods. One group of characters are World War II-era Allied codebreakers and tactical-deception operatives, and disillusioned Axis military and intelligence figures. The second narrative is set in the late 1990s, with characters that are (in part) descendants of those of the earlier time period, who employ cryptologic, telecom, and computer technology to build an underground data haven.",
        answerOptions: ["Margaret Atwood", "Kim Stanely Robinson", "Iain M. Banks", "Neal Stephenson"],
        coverImage: "images/cryptonomicon.jpg",
        correctAnswer: "Neal Stephenson",
        answerSource: "https://en.wikipedia.org/w/index.php?title=Cryptonomicon&oldid=879555233"
    },
];

function getQuestionData() {
    return questionData;
}