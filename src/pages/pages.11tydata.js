function determinePermalink(data){
  const {permalink,page} = data;
  if (permalink) return permalink;
  return `/${page.fileSlug.substr(5)}/`;
}


module.exports = {
  eleventyComputed: {
    layout: "base.html",
    permalink: (d) => determinePermalink(d)
  }
}
