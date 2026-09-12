# Essais de design — Ventouses & Gua Sha

Trois directions de design pour le site du cabinet (Ivry-sur-Seine), accessibles
depuis une page d'accueil commune.

| Maquette | Direction | Technologie |
|---|---|---|
| Nº1 — **Papier** | Éditorial lumineux : Fraunces, filets fins, esprit magazine | HTML/CSS autonome |
| Nº2 — **Nocturne** | Spa premium : vert profond, or champagne, cartes de verre | HTML/CSS autonome |
| Nº3 — **Contemporain** | Moderne chaleureux : nav pilule, bento, animations | Vite + Tailwind v4 + GSAP + Lenis |

## Voir les maquettes

```bash
docker compose up        # serveur Vite dans un conteneur Node 22
# → http://localhost:5173
```

Les maquettes 1 et 2 s'ouvrent aussi directement en double-cliquant sur le
fichier `maquette-1.html` / `maquette-2.html` (aucune dépendance).

## Build statique

```bash
docker compose run --rm vite npm run build   # → dist/ déployable tel quel
```

## Structure

```
├── index.html            # page d'accueil : accès aux trois maquettes
├── maquette-{1,2}.html   # maquettes autonomes
├── maquette-3.html       # maquette Vite (src/maquette-3.{css,js})
├── src/                  # Tailwind tokens + animations GSAP/Lenis
├── vite.config.js        # multipage
└── docker-compose.yml    # dev en conteneur (node:22-alpine)
```
