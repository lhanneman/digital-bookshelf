# Digital-Bookshelf

This is a web page that will display a digital bookshelf based on GoodReads.com data. Images of book spines are not available on GoodReads (or anywhere that I could find) so I'm using [ColorThief](https://github.com/KSemenenko/ColorThief) to pull the most prominent colors for the cover image, and using those for the spine color and title/author color. Like a digital picture frame, the books will transition over time to show them all. 

## ConsoleApp

Most of the GoodReads logic is handled in a console app that writes the JSON to text files. The reason for this is because it was unnecessarily difficult to do it all on the client. GoodReads only returns XML for one, and they do not support CORs so any web request is a pain to get working. I attempted to use a client side library to do pull the color info, but even that didn't work because of other CORs errors. The console app handles all of this for me, plus concatenating all of the JSON from each book request (20 books at a time) and providing a txt file the client app can read.

## ClientApp
The client app is a basic HTML page with some JavaScript. For each book, we generate a book spine, and add the color, title, author, etc. Then a simple transition is set up to animate the shelf.

## TODO: //

I got this idea from all the Raspberry Pi magic-mirror posts I see. The goal here is to create a simple web page that pulls info from whatever GoodRead's shelf I pick, and eventually power it by a Pi hooked to a monitor blended in with my phyiscal bookshelf.


