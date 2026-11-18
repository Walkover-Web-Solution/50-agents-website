// Every comparison page (pages-brief B4): 12 alternatives pages and 8 versus pages, one content file each.
import type { ComparePage } from './types';
import zapierAlt from './zapier-alternatives';
import n8nAlt from './n8n-alternatives';
import makeAlt from './make-alternatives';
import lindyAlt from './lindy-alternatives';
import gumloopAlt from './gumloop-alternatives';
import relevanceAlt from './relevance-ai-alternatives';
import relayAlt from './relay-app-alternatives';
import bardeenAlt from './bardeen-alternatives';
import activepiecesAlt from './activepieces-alternatives';
import iftttAlt from './ifttt-alternatives';
import powerAlt from './power-automate-alternatives';
import pipedreamAlt from './pipedream-alternatives';
import vsZapier from './50agents-vs-zapier';
import vsMake from './50agents-vs-make';
import vsN8n from './50agents-vs-n8n';
import vsLindy from './50agents-vs-lindy';
import vsGumloop from './50agents-vs-gumloop';
import vsRelevance from './50agents-vs-relevance-ai';
import vsSoftr from './50agents-vs-softr';
import vsGlide from './50agents-vs-glide';

export const COMPARE: ComparePage[] = [
  zapierAlt, n8nAlt, makeAlt, lindyAlt, gumloopAlt, relevanceAlt, relayAlt, bardeenAlt, activepiecesAlt, iftttAlt, powerAlt, pipedreamAlt,
  vsZapier, vsMake, vsN8n, vsLindy, vsGumloop, vsRelevance, vsSoftr, vsGlide,
];
