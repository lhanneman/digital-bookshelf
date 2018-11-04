const fetch = require('node-fetch');
const parseXML = require('xml2js').parseString;
const fs = require('fs-path');

const output = `../ClientApp/books.json`;

const api_key = 'p7kdrPq136G6GldRFvcgw';
const get_shelf_url = 'https://www.goodreads.com/review/list';
const user_id = '30736581';
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
                    write();
                } else {
                    page++;
                    getPage();
                }

            });
        });

}

const write = () => {
    fs.writeFile(output, JSON.stringify(books), () => { });
}

run();