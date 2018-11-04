const puppeteer = require('puppeteer');
const fs = require('fs');
const fsPath = require('fs-path');

const output = `../client-app/book_images.json`;

(async () => {

    let imageUrls = [];

    fs.readFile(`../client-app/books.json`, async (err, data) => {
        if (err) throw err;
        let books = JSON.parse(data);

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        for (var i = 0; i < books.length; i++) {

            

            let b = books[i];

            console.log(i + '/' + books.length + ' - going to url: ' + b.Link);
            await page.goto(b.Link[0]);

            await page.waitFor(3000);

            // Get the "viewport" of the page, as reported by the page.
            const imageUrl = await page.evaluate(() => {

                var id = document.querySelector('.coverButtonContainer .coverButton.enlargeCover').getAttribute('id');
                var img = document.querySelector('#' + id + '_cover > img').getAttribute('src');

                return img;

            });

            imageUrls.push(imageUrl);

        }


        fsPath.writeFile(output, JSON.stringify(imageUrls), () => { });

        console.log('done!');

        await browser.close();

    });


})();