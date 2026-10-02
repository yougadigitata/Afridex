# AFRIDEX — Plan de continuité

## Positionnement
Site vitrine du cabinet AFRIDEX (Afrique Défis et Expertises), basé à Ouagadougou. Le design est une direction éditoriale « intelligence du terrain » : bleu nuit pour la rigueur, vert-lime pour le mouvement et motifs de boussole/grille pour relier expertise, territoire et impact.

## Structure technique
- `src/index.tsx` : SPA Hono. Les données des 7 pôles et des 35 formations sont centralisées en haut du fichier. `/formations` et `/formations.html` réutilisent la même interface avec un scroll initial sur le catalogue.
- `public/static/style.css` : identité visuelle, responsive mobile-first, accessibilité et micro-animations.
- `public/static/app.js` : menu mobile, filtres texte/thème/durée/coût, préremplissage du formulaire depuis une formation, contact API et reveal animations.
- `public/static/images/logo-afridex.png` : logo existant réutilisé.
- `public/manus-routes.json` : manifeste des routes publiques.
- `RAPPORT.md` : journal des ajouts et livraisons.

## Règles de contenu
- Catalogue 2026 : exactement 35 formations, 7 thèmes, lieu Ouagadougou/Ouaga, coûts 50 000 ou 75 000 FCFA.
- Ne pas enregistrer de clé GitHub ou Cloudflare dans le dépôt, les scripts, le rapport ou les artefacts.
- Les champs contact sont actuellement accusés réception par `/api/contact`; aucune messagerie externe n’est branchée.

## Reprise rapide
```bash
npm install
npm run build
npm run dev:sandbox
```
Le preview local est servi sur le port 3000. Avant déploiement, vérifier `/`, `/formations`, le PDF et le formulaire.
