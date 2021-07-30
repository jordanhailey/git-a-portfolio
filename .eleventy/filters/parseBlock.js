// {% set c = node.container if node.container else "" %}{% if c == "br" or c == "hr"%}<{{ c | safe }}/>{% elif not c%}{{node | trim}}
// {% else %}
// {% set children %}{% for node in node.nodes %}{% include './node.html' %}{% endfor %}{% endset %}
// {% set hasAside = false %}
// {% for child in children %}{%set hasAside = true if child.container == "aside" else hasAside %}{% endfor %}
// {% set attrs %}
// {% for i in node.attrs %}
// {% for k,v in i %}{{k|safe}}="{{v|safe}}"{% endfor %}
// {% endfor %}
// {% endset %}
// <{{ c | safe }} {{ attrs | safe}}>{{ children | trim | safe }}</{{ c | safe }}>
// {% endif %}

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
  const {tagName,attributes,nodes} = block;
  if (!tagName && block) return block;
  const attrs = parseAttributes(attributes);
  // const attrs = attributes?.map(attr => {
  //   return Object.entries(attr).map(([k,v]) => `${k}=${typeof v == "object" ? JSON.stringify(v).replace(/"/g,"'") : v}`)
  // }).join(" ") || "";
  if (/^[hb]r$/.test(tagName)) return `<${tagName}>`
  else if (/^input$/.test(tagName)) return `<${tagName} ${attrs} />`
  const inside = nodes?.map(node=>parseBlock(node)).join("") || "";
  const output = `<${tagName} ${attrs} >${inside||""}</${tagName}>`;
  // console.log({output})
  return output;
}
module.exports = parseBlock;
