const fetch = require('node-fetch');
const parseXML = require('xml2js').parseString;
const fs = require('fs-extra');

const output = `../client-app/books.json`;

const api_key = '';
const get_shelf_url = 'https://www.goodreads.com/review/list';
const user_id = '';
const shelf_name = 'audiobooks';

let page = 1;
let books = [];

const run = () => {
    getPage();
}

const getPage = () => {

    fetch(`${get_shelf_url}/${user_id}.xml?key=${api_key}&v=2&shelf=${shelf_name}&page=${page}`)
        .then(res => res.text())
        .then(xml => {
            parseXML(xml, function (err, result) {

                var topNode = result.GoodreadsResponse.reviews[0];
                topNode.review.forEach(r => {

                    let b = r.book[0];

                    books.push({
                        Title: b.title,
                        Image: b.image_url,
                        Link: b.link
                    });
                });

                let total = +topNode.$.total;
                let end = +topNode.$.end;
                let done = end >= total;

                if (done) {
                    fs.writeJson(output, books, err => {
                        if (err) return console.error(err)
                        console.log('success!')
                    });
                } else {
                    page++;
                    getPage();
                }

            });
        });

}

run();