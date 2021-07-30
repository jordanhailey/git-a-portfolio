function determinePermalink(data){
  const {permalink,page} = data;
  if (permalink) return permalink;
  if (page.filePathStem.substr(-5) == "index") return `/${page.filePathStem.substr(6)}.html`
  return `/${page.filePathStem.substr(6)}/`;
}


module.exports = {
  eleventyComputed: {
    layout: "base.html",
    permalink: (d) => determinePermalink(d)
  }
}
