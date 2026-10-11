import { sceneDirection } from './scenes.js';
import { storyManuscripts } from './story-manuscripts.js';

const extraDiscoveries = {
  butterfly: { name:'Brinque com a borboleta', reaction:'A borboleta voou para te dar um olá!', effect:'fly' },
  bird: { name:'Chame o passarinho', reaction:'Piu, piu! O passarinho respondeu.', effect:'fly' },
  flower: { name:'Abra as florzinhas', reaction:'Mais uma flor abriu no jardim!', effect:'bloom' },
  star: { name:'Acenda uma luzinha', reaction:'Plim! Uma luzinha só para você.', effect:'magic' }
};
// Nenhuma descoberta repete o principal ou a outra descoberta, e o amigo escondido não está à vista. O índice dos extras não muda, para seguir alinhado com sceneAnchors.extras.
function distinct(storyId, page) {
  const used = new Set([page.object]);
  const swap = extra => {
    const object = Object.keys(extraDiscoveries).find(key => !used.has(key) && key !== page.hidden);
    used.add(object);
    return { ...extra, object, ...extraDiscoveries[object] };
  };
  const extras = page.extras.map(extra => used.has(extra.object) ? swap(extra) : (used.add(extra.object), extra));
  if (!used.has(page.hidden)) return { extras, hidden:page.hidden };
  const friends = storyId === 'princesa' ? ['lion','bird','rabbit'] : ['bird','rabbit'];
  let hidden = friends.find(key => !used.has(key));
  if (!hidden) {
    const index = extras.findIndex(extra => friends.includes(extra.object));
    if (index < 0) return { extras, hidden:page.hidden };
    hidden = extras[index].object;
    used.add(page.hidden);
    extras[index] = swap(extras[index]);
  }
  return { extras, hidden };
}
export const stories = storyManuscripts.map(story => ({...story,pages:story.pages.map((page,index)=>{
  const direction=sceneDirection(story.id,index,page);
  return {...page,...direction,
    ...distinct(story.id,{object:page.object,
      extras:page.extras || [index%2?'bird':'butterfly',index%3?'flower':'star'].map((object,i)=>({object,...extraDiscoveries[object],position:i?[12,82]:[12,19]})),
      hidden:page.hidden || (story.id==='princesa' && index>1?'lion':index%2?'rabbit':'bird')}),
    art:page.art || story.id,
    audio:`/audio/${story.id}-${index+1}.m4a`
  };
})}));
export const categories = ['Todas as histórias','Na floresta','Um pouco de magia','Bichinhos e amigos'];
export function getStory(id) { return stories.find(story => story.id === id); }
