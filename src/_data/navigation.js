const makeLinkObj = (text,href) => ({text,href})

const mainNav = [
  {...makeLinkObj("about me","/about/")},
//   {...makeLinkObj("projects","/projects/")},
//   {...makeLinkObj("work","/work/")},
  {...makeLinkObj("hire me","/contact/")},
]

const navigation = {main:mainNav}

module.exports = navigation
