const nonNullNonEmptyObject = (obj) => typeof obj == "object" && obj !== null && obj !== {}
function parseAttributes(attributes,isStyleAttr=false) {
  let attrs = "";
  if (nonNullNonEmptyObject(attributes)) {
    try {
      for (attr in attributes) {
        let val = attributes[attr];
        if (val == "" && !/aria/.test(attr)) continue;
        if (isStyleAttr) {
          attrs += ` ${attr}:${val};`
        }
        else if (attr == "style") attrs += ` ${attr}="${parseAttributes(val,true)}"`;
        else attrs += ` ${attr}="${val}"`
      }
    } catch (error) {
      console.log({error})
    }
  }
  return attrs;
}

function parseBlock(block) {
  if (!block) return block;
  const {tagName,attributes,nodes:n} = block;
  const nodes = Array.from(n);
  if (!tagName && block) return block;
  const attrs = parseAttributes(attributes);
  if (/^[hb]r$/.test(tagName)) return `<${tagName}>`
  else if (/^input$/.test(tagName)) return `<${tagName} ${attrs} />`
  if (nodes.length) {
    const inside = nodes.map(node=>parseBlock(node)).join("") || "";
    const output = `<${tagName} ${attrs} >${inside||""}</${tagName}>`;
    return output;
  } else return block;
}
module.exports = parseBlock;
