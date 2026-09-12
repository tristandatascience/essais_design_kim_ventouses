# Essais de design — Ventouses & Gua Sha

Trois directions de design pour le site du cabinet (Ivry-sur-Seine), accessibles
depuis une page d'accueil commune.

| Maquette | Direction | Technologie |
|---|---|---|
| Nº1 — **Papier** | Éditorial lumineux : Fraunces, filets fins, esprit magazine | HTML/CSS autonome |
| Nº2 — **Nocturne** | Spa premium : vert profond, or champagne, cartes de verre | HTML/CSS autonome |
| Nº3 — **Contemporain** | Moderne chaleureux : nav pilule, bento, animations | Vite + Tailwind v4 + GSAP + Lenis |

## Voir les maquettes

**Dev (hot-reload)** :

```bash
docker compose --profile dev up    # → http://localhost:5173
```

**Production / VPS** (build Vite + nginx, image ~25 Mo) :

```bash
docker compose up -d               # → http://localhost:8081 (APP_PORT modifiable)
```

Projet Docker **isolé** du site de prod (`soma-souffle`, port 8080) : nom de
projet compose (`essais-design-maquettes`), conteneur (`essais-design`), image
et port tous distincts — aucun risque de collision.

### Déployer sur le VPS

Construire sur la machine de dev puis exporter (jamais de `npm install` sur le VPS) :

```bash
docker compose build web
docker save essais-design-kim-ventouses:latest | gzip > maquettes.tar.gz
scp maquettes.tar.gz docker-compose.yml nginx.conf user@vps:
# sur le VPS : gunzip -c maquettes.tar.gz | docker load && docker compose up -d
```

La maquette 3 est servie telle quelle après build (HTML/CSS/JS produits par
Vite dans `dist/`, servis par nginx avec gzip et cache long sur les assets).

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
