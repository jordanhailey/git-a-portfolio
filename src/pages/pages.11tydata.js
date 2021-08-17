function determinePermalink(data){
  const {permalink,page} = data;
  if (permalink !== undefined) return permalink;
  if (page.filePathStem.substr(-5) == "index") return `${page.filePathStem.substr(6,page.filePathStem.length-11)}`
  return `${page.filePathStem.substr(6)}/`;
}


module.exports = {
  eleventyComputed: {
    layout: "base.html",
    permalink: (d) => determinePermalink(d)
  }
}
