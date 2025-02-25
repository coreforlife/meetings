# [EuPA Open Lab Day / Data analysis](https://eupa.org/events/https-eupa-org-wp-content-uploads-2025-01-join-us-in-gathertown-in-our-digital-proteopolis-world-1-pdf/)

- [Registration](https://forms.office.com/pages/responsepage.aspx?id=3hyB1-_sbEmPkaF4YkG5nN6aImF9kF9KijkcfWWEhJtUNURTU1dNS1dRWEUwRjlBSzVYOERCQlhGOS4u&route=shorturl)

## Data analysis in Core Facilities
- FAIR principles
- in an ideal scenario open-source, published and actively developed and professional support
- in best case: CLI for application coupling to LIMS
- Input/Output delivered to reproduce on local infrastructure
- Nice reports and comprehensive results 

## Data analysis steps

### QC plots
- Mass Spec QC (LC, Analyzer etc.)
- Peptide-based (missed cleavages, modifications)
- Identification
- Quantification accuracy
- Reproducibility (e.g. CVs)
- PCA analysis

### Preprocessing / filtering
- How to compose the FASTA file?
- Which cut-offs (e.g. Unique Peptides, contaminants)

### Normalization
- Median
- VSN
- Quantile
- etc.

### Batch effect detection and removal
- Yes or no
  
### Imputation
- Yes or no
- Missing at random vs missing at low abundance

### Differential abundance analysis
#### Methods
- t-test
- Limma
- MSqRob
- MSstats
- prolfqua
- etc.

#### Exploratory plots
- Volcano
- MA
- p-value histogram

### Clustering analysis
- heatmaps
- hierarchical vs kmeans
  
### Functional analysis
- Over-Representation Analysis (ORA) vs Gene Set Enrichment Analysis (GSEA)
- Pathway analysis

## Software to process raw files
### Open-source vs Free vs commercial
- MaxQuant
- DiaNN
- FragPipe
- Biognosys (SpectroNaut, SpectroMine)
- MSAID's Chimerys

### Benchmarking
e.g. ProteoBench

### How to keep up with versioning and new developments
- Reproducibility
- New algorithms
