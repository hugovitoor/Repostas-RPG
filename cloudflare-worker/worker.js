/**
 * A ÚLTIMA NOTIFICAÇÃO — Cloudflare Worker
 * Deploy this file as a Worker. Keep it separate from the public GitHub Pages repo.
 */
const ANSWERS = new Map();
function add(keys, answer) { for (const key of keys) ANSWERS.set(normalize(key), answer); }
function normalize(value) {
  return String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[!?.,;:]+/g, ' ').replace(/\s+/g, ' ').trim();
}
add(['J. F.','J F'],'Teve culpa disso tudo.');
add(['4','Quatro'],'Culpados.');
add(['5','Cinco'],'Afastados.');
add(['Eu'],'Raiz.');
add(['Observam'],'Precisam.');
add(['Sombras'],'Ele é culpado de tudo isso.');
add(['ABFFS'],'Manipulação.');
add(['Segredo'],'Todos têm. Cabe a você querer saber.');
add(['Sangue'],'Aliado.');
add(['Morte'],'Mantém o ciclo.');
add(['Energia'],'__HOST__');
add(['Medo'],'__GLITCH__');
add(['Conhecimento'],'😡😡😡');
add(['F'],'Culpados.');
add(['Quatro F'],'Culpados.');
add(['J. F. e seus quatro f.'],'Afastados.');
add(['Vale Seco'],'Abençoada.');
add(['Instagram'],'Porta-voz.');
add(['Olhos'],'Por toda a parte.');
add(['Francisco'],'Que o Diabo não o faça sofrer tanto.');
add(['Neto de Francisco'],'Cúmplice.');
add(['Chuva'],'Apenas à meia-noite.');
add(['Sinais'],'Tudo são sinais se você for fã de sinais de sinais tudo são sinais.');
add(['Notificação'],'Todos vai ter.');
add(['A Última Notificação'],'É inevitável.');
add(['Dispositivo Móvel'],'Que descubram o principal.');
add(['Sozinho'],'Ele está.');
add(['Jhon Frederick'],'__GLITCH__');
add(['Criatura'],'__GLITCH__');
add(['Estou Seguro?'],'Quem está?');
add(['Estou Sozinho?'],'A solitude às vezes é a melhor resposta quando se pensa num universo de possibilidades.');
add(['Meia-noite'],'Pinga.');
add(['Raízes da Árvore'],'Fortificadas.');
add(['Portugal'],'Agarrado.');
add(['Lama'],'Agarra.');
add(['L','S'],'__GLITCH__');
add(['Pietro Mendez', 'Pietro', 'Mendez'],'Devedores');
add(['Tibúrcia Bosch Usher', 'Tibúrcia', 'Bosch', 'Usher', 'Tibúrcia Bosch', 'Tibúrcia Usher'],'Gênesis 3:15');
add(['Rodrygo Vargas Silveira', 'Rodrygo', 'Vargas', 'Silveira', 'Rodrygo Vargas', 'Rodrygo Silveira'],'Escritura');
add(['Ikaro Minervino', 'Ikaro', 'Minervino'],'Estrelas');
add(['Liana'], 'Frenética')
add(['Lago'],'Fica esplêndida em dias de lua cheia.');
add(['JO FA. P','JO FA P'],'__GLITCH__');
add(['Rocha'],'Segredos.');
add(['Nossa Senhora da Rocia'],'Te enganaram com esse nome.');
add(['Nossa Senhora da Rocha'],'Rogai por nós.');
add(['Telas'],'Premonição.');
add(['Jaci Fier'],'Morta.');
add(['Oi','Olá','Ola','E aí','Eai','Bom dia','Boa tarde','Boa noite'],'Você chegou. Isso não significa que foi convidado.');
add(['Estou vivo','Estou viva','Estou vivo?','Estou viva?'],'Por enquanto.');
add(['Quem é você','Quem está aí'],'A pergunta certa é: quem está respondendo?');
add(['Ajuda','Me ajuda','Socorro'],'A ajuda sempre cobra alguma coisa.');
add(['Obrigado','Obrigada','Valeu'],'A gratidão também deixa rastros.');
add(['Tchau','Adeus','Até logo'],'Ninguém vai embora por completo.');
add(['Quem sou eu'],'Um nome é só a primeira camada.');
add(['Por quê','Por que','Porque','Porquê'],'Porque alguém precisava perguntar.');
add(['Chuva à meia-noite','Chuva meia-noite'],'Você já sabe quando. Ainda não sabe por quê.');
add(['Bill','Bill Cipher'],'Símbolos são portas. Nem toda porta deveria abrir.');
add(['Árvore','Arvore'],'Ela cresce onde alguém esqueceu de olhar.');
add(['Raiz'],'O que está enterrado também sustenta.');
add(['Lama e chuva'],'Tudo volta ao lugar de onde veio.');
add(['Você está aí','Está me ouvindo'],'Estou onde você deixou a pergunta.');
add(['Teste','Testando'],'Sinal recebido.');
const GENERIC = [
 'A resposta existe. Você ainda não aprendeu a reconhecê-la.',
 'Silêncio também é uma forma de resposta.',
 'Essa palavra já foi dita antes. Não por você.',
 'O sinal está fraco. Tente quando a chuva começar.',
 'Nem toda pergunta pertence a quem a fez.',
 'Você encontrou uma porta. Isso não quer dizer que deva abri-la.',
 'A árvore não responde. Ela se lembra.',
 'Anotado. Alguém vai saber que você perguntou.'
];
function json(data, status=200) {
 return new Response(JSON.stringify(data), {status, headers:{
  'Content-Type':'application/json; charset=utf-8',
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Methods':'POST, OPTIONS',
  'Access-Control-Allow-Headers':'Content-Type',
  'Cache-Control':'no-store'
 }});
}
export default {
 async fetch(request) {
  if (request.method === 'OPTIONS') return new Response(null,{status:204,headers:{
   'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST, OPTIONS',
   'Access-Control-Allow-Headers':'Content-Type','Access-Control-Max-Age':'86400'
  }});
  if (request.method !== 'POST') return json({error:'Method not allowed'},405);
  let body;
  try { body = await request.json(); } catch { return json({error:'Invalid JSON'},400); }
  const query = String(body?.query ?? '').trim();
  if (!query || query.length > 180) return json({error:'Invalid query'},400);
  const answer = ANSWERS.get(normalize(query));
  if (answer === '__HOST__') return json({type:'host'});
  if (answer === '__GLITCH__') return json({type:'glitch'});
  if (answer) return json({type:'text',answer});
  return json({type:'text',answer:GENERIC[Math.floor(Math.random()*GENERIC.length)]});
 }
};
