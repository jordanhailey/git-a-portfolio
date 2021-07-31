// /**
//  * Mock function for using a block builder e.g. a CMS
//  */
const parseBlock = require('./filters/parseBlock');
module.exports = ( eleventyConfig ) => {
  eleventyConfig.addFilter('parseBlock',(block)=>parseBlock(block));
  eleventyConfig.addPassthroughCopy({'src/_passthrough':'/'});
  return {
    htmlTemplateEngine:"njk",
    markdownTemplateEngine:"njk",
    dir: {
      input:'src',
    }
  }
}
