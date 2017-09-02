using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Newtonsoft.Json;
using System.Xml;
using System.IO;
using System.Drawing;


namespace ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            const string apiKey = "XXXXXX";

            var readShelfUrl = $"https://www.goodreads.com/review/list/30736581.xml?key={apiKey}&v=2&shelf=read";
            var keepGoing = true;
            var bookNodes = new List<XmlNode>();
            var bookColors = new List<BookColors>();

            var page = 1;

            while (keepGoing)
            {
                using (var wc = new WebClient())
                {
                    var xml = wc.DownloadString(readShelfUrl + "&page=" + page);
                    var doc = new XmlDocument();
                    doc.LoadXml(xml);

                    var parentNode = doc.GetElementsByTagName("GoodreadsResponse")[0];
                    var pageInfo = parentNode.SelectSingleNode("reviews").Attributes;
                    var end = Convert.ToInt64(pageInfo["end"].Value);
                    var total = Convert.ToInt64(pageInfo["total"].Value);

                    var books = parentNode.SelectNodes("reviews/review/book").Cast<XmlNode>().ToList();

                    bookNodes.AddRange(books);

                    if (end >= total)
                    {
                        keepGoing = false;
                    }

                    page++;


                }



            }

            var bookJson = JsonConvert.SerializeObject(bookNodes);
            File.WriteAllText("c:\\goodreads\\book_info.json", bookJson);

            foreach (var bookInfo in bookNodes)
            {
                var imageUrl = bookInfo.SelectSingleNode("image_url").InnerText;
                var bookId = Convert.ToInt64(bookInfo.SelectSingleNode("id").InnerText);

                var colorThief = new ColorThiefDotNet.ColorThief();
                var bitmap = GetBitmap(imageUrl);
                var colors = colorThief.GetPalette(bitmap, 3);

                bookColors.Add(new BookColors()
                {
                    BookId = bookId,
                    Colors = colors.OrderByDescending(c => c.Population).Select((a, i) => new ColorInfo()
                    {
                        HexCode = a.Color.ToHexString(),
                        IsDark = a.IsDark,
                        Population = a.Population
                    }).ToList()

                });

            }

            var colorJson = JsonConvert.SerializeObject(bookColors);
            File.WriteAllText("c:\\goodreads\\book_colors.json", colorJson);

        }

        private static Bitmap GetBitmap(string url)
        {
            var request = WebRequest.Create(url);
            var response = request.GetResponse();
            var responseStream = response.GetResponseStream();
            return new Bitmap(responseStream);
        }
    }

    public class BookColors
    {
        public long BookId { get; set; }
        public List<ColorInfo> Colors { get; set; }
    }

    public class ColorInfo
    {
        public string HexCode { get; set; }
        public bool IsDark { get; set; }
        public int Population { get; set; }
    }

}
