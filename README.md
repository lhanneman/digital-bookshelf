# Digital-Bookshelf

[DEMO HERE](https://lhanneman.github.io/digital-bookshelf/index.html)

This is a web page that will display a digital bookshelf based on GoodReads.com data. Images of book spines are not available on GoodReads (or anywhere that I could find) so I'm displaying them as "album artwork", using Swiper JS. Like a digital picture frame, the books will transition over time to show them all. 

Ideally, the book covers would be the same size, as it will look better with the album artwork scroller. To make this as consistent as possible I created a new bookshelf in GoodReads called `audiobooks`, and then added each of my Audible Audiobooks to that shelf.
The reason for this is because most Audible covers are perfectly square. NOTE: I had to manually go to each book on this shelf and change the "edition" to the Audiobook (or any square-covered edition).



## node-app

I'm using a node app to call the GoodReads API (to get around CORS more easily). This pulls my shelf down, page by page, and outputs a JSON file.

## puppeteer
I created a small puppeteer app to scrape each link provided by the `node-app`. The reason for this is because I noticed several books do not have high-res images available. Apparently this is due to GoodReads not having the rights to serve images that are 
originally from Amazon, Audible, etc. So this is optional, but it will go to each book link and find the "enlarge photo" link and grab the url to the corresponding image.

## TODO: //

I got this idea from all the Raspberry Pi magic-mirror posts I see. The goal here is to create a simple web page that pulls info from whatever GoodRead's shelf I pick, and eventually power it by a Pi hooked to a monitor blended in with my phyiscal bookshelf.


