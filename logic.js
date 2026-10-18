(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.BacklogLogic=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
const demo=[
{id:'D-01',title:'Réduire les demandes de pièces KYC',details:'Diminuer les dossiers incomplets',reach:850,impact:2,confidence:85,riceEffort:2,businessValue:9,criticality:9,riskReduction:9,jobSize:3},
{id:'D-02',title:'Simplifier le parcours de rachat',details:'Accélérer le traitement des demandes',reach:560,impact:3,confidence:80,riceEffort:3,businessValue:10,criticality:8,riskReduction:6,jobSize:5},
{id:'D-03',title:'Améliorer le suivi des demandes',details:'Rendre le statut visible aux clients',reach:1200,impact:1,confidence:90,riceEffort:2,businessValue:7,criticality:6,riskReduction:4,jobSize:2},
{id:'D-04',title:'Détecter les dossiers incomplets',details:'Éviter les reprises manuelles',reach:750,impact:2,confidence:75,riceEffort:1.5,businessValue:8,criticality:8,riskReduction:8,jobSize:4},
{id:'D-05',title:'Créer un tableau de pilotage',details:'Suivre les traitements en attente',reach:180,impact:1,confidence:95,riceEffort:1,businessValue:6,criticality:5,riskReduction:4,jobSize:2},
{id:'D-06',title:'Proposer une aide contextuelle',details:'Guider les utilisateurs',reach:450,impact:0.5,confidence:65,riceEffort:2.5,businessValue:5,criticality:4,riskReduction:3,jobSize:4}
];
function rice(x){const effort=Number(x.riceEffort);return effort>0?Number(x.reach)*Number(x.impact)*Number(x.confidence)/100/effort:0}
function wsjf(x){const size=Number(x.jobSize);return size>0?(Number(x.businessValue)+Number(x.criticality)+Number(x.riskReduction))/size:0}
function score(x,method){return method==='wsjf'?wsjf(x):rice(x)}
function rank(items,method){return [...items].sort((a,b)=>score(b,method)-score(a,method)||a.title.localeCompare(b.title,'fr'))}
function valid(x){return typeof x.title==='string'&&x.title.trim().length>0&&x.title.length<=120&&['reach','impact','confidence','riceEffort','businessValue','criticality','riskReduction','jobSize'].every(k=>Number.isFinite(Number(x[k])))&&Number(x.reach)>=0&&[.25,.5,1,2,3].includes(Number(x.impact))&&Number(x.confidence)>=0&&Number(x.confidence)<=100&&Number(x.riceEffort)>0&&['businessValue','criticality','riskReduction','jobSize'].every(k=>Number(x[k])>=1&&Number(x[k])<=10)}
return {demo,rice,wsjf,score,rank,valid};
});
