const makeLinkObj = (text,href) => ({text,href})

const mainNav = [
  {...makeLinkObj("about me","/about/")},
  {...makeLinkObj("projects","/projects/")},
  {...makeLinkObj("work","/work/")},
]

const navigation = {main:mainNav}

module.exports = navigation
