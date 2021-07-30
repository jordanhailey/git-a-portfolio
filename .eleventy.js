module.exports = ( eleventyConfig ) => {
  eleventyConfig.addPassthroughCopy({'src/_passthrough':'/'})
  return {
    htmlTemplateEngine:"njk",
    markdownTemplateEngine:"njk",
    dir: {
      input:'src',
    }
  }
}
