const fs = require('node:fs');
const assert = require('node:assert/strict');
const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('assets/js/app.js', 'utf8');
const css = fs.readFileSync('assets/css/styles.css', 'utf8');
for (const id of ['familyForm','familyMembers','addFamilyBtn','familySummary','voterForm','selectedFamily','dashboard','records','customize','tools']) {
  assert.match(html, new RegExp('id="'+id+'"'), 'Missing element '+id);
}
for (const phrase of ['renderFamilies','refreshFamilyChoices','duplicateOf','localStorage','familyId','isFamilyHead']) assert.ok(js.includes(phrase), 'Missing '+phrase);
assert.ok(css.includes('data-theme="dark"'), 'Missing dark theme');
assert.ok(html.includes('assets/js/app.js') && html.includes('assets/css/styles.css'));
console.log('Static smoke checks passed');
