import { el, element, formatDate } from './lib/utils';
import fetchEarthquakes from './lib/earthquakes';
import { init, createPopup } from './lib/map';

function helper(feature) {
  const myresult = el('li');
  const prop = feature.properties;
  const myPopup = createPopup(feature, prop.place);
  myresult.appendChild(el('div', el('h2', prop.title),
    el('dl',
      el('dt', 'Tími'),
      el('dd', formatDate(prop.time)),
      el('dt', 'Styrkur'),
      el('dd', `${prop.mag} á richter`)),
    element('div', { class: 'button' }, null,
      element('button', null, { click: () => { myPopup.openPopup(); } }, 'Sjá á korti'),
      element('a', { href: prop.url, target: '_blank' }, null, 'Skoða nánar'))));
  return myresult;
}

document.addEventListener('DOMContentLoaded', async () => {
  const loadingDIV = document.querySelector('.loading');
  const earthquakeDIV = document.querySelector('.earthquakes');

  init(document.querySelector('.map'));

  const data = await fetchEarthquakes();
  // console.log(data.features[0]);
  for (let i = 0; i < data.features.length; i += 1) {
    earthquakeDIV.appendChild(helper(data.features[i]));
  }

  loadingDIV.remove();
});
