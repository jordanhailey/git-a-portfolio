const fs = require('fs');
// /**
//  * Mock function for using a block builder e.g. a CMS
//  */
const parseBlock = require('./filters/parseBlock');
module.exports = ( eleventyConfig ) => {
  eleventyConfig.addFilter('parseBlock',(block)=>parseBlock(block));
  eleventyConfig.addPassthroughCopy({'src/_passthrough':'/'});
  /** development 404 redirect - only when running eleventy --serve, see static site host documentation for handling redirects */
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, bs) {
        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync('_site/404.html');
          // Add 404 http status code in request header.
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });
  return {
    htmlTemplateEngine:"njk",
    markdownTemplateEngine:"njk",
    dir: {
      input:'src',
    }
  }
}
