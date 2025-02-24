# EuPA Open Lab Day / Data analysis

## Data analysis steps

### QC plots
- Mass Spec QC (LC, Analyzer etc.)
- Peptide-based (miscleavages, modifications)
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
