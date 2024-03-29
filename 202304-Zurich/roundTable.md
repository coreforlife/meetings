# 2023-04-27 0930

## FS
- Working on FragpipeCommandeR
- razor peptides in FragPipe.
- spectro mine (DDA/TMT); cmd option non-free;
- fragpipe >v19
- ppms for instrument booking
- p: qc-plots; throughout (20min)
## Q
- package for classify Spectra using [MSclassifR](https://CRAN.R-project.org/package=MSclassifR) [preprint](https://www.biorxiv.org/content/10.1101/2022.03.14.484252v1)
- shiny app for comparing mod/unmod protein ...
(20min)

## T
- dev small script making annotation spectra
- pipeline N-terminomics
- MSqRob
- LIMS core connect
- QC scripts (*)

## M
- moving towards DIA Spectronaut (v17)

## G	
- pricing
- progress DIA (for high complex samples)
- Spectronaut for IPs?
- improve Spectronaut accuracy (15min pres)

## CJ
- New group leader
- Renaming into Computational ...
- Ongoing efforts for imaging, single cell
- New building 
- Started DIA (DiaNN commandline) 
- Fragpipe-TMT
- html reporting
- new searchengine-DAE applications, with fragpipe/MQ+prolfqua-SAINT

# Workload
- EMBL and DKFZ have one bioinformatician doing data analysis. THe others have 2 on average.
- FGCZ has highest throughput in terms of # projects and # pulications. Muc larger team as well.
- Projects/paper ratio discussed. 

## Spectronaut/DIANN:
W 15min
G 15min
discussion 20min

## QC-plot session:

## Common plots:
- sample intensity dists (boxplot/density)
- sample correlation heatmaps/dendrograms
- ID rates
- PCAs

## FS
- Includes QC plots for TMT and fractionation
- peptide nb and intensity along the analytical run
- elution colored by hydrophobicity and pI
- they also have PTM experiment QC plots

## Q
- Based on PTXQC
- several dendrograms to show sample similarity (e.g. protein ID overlapping)

## M
- PTM
- missing values heatmap
- stacked barplot with # modified residues

## G

script that parses PD result in pstgresql db
- Mass deviation boxplot
- MIssed cleavages
- ID rates
- charge state distributions
- score dists density plot for targets and decoys (>150 score)
- # Psms vs RT 
- search space per PSM 

## W

QC plots for evaluating preprocessing steps (e.g. normalization before and after)
- density plots for proteins with different # of missing values (check if shift to the left)
- cv intergroup and overall
- iRT 

## see also
[QC_output_Heidelberg.pdf](QC_output_Heidelberg.pdf), 
[fgcz_MQ_QC_report-1.pdf](fgcz_MQ_QC_report-1.pdf), 
[qc.pdf](qc.pdf), 
[IMP_VBC_human_yeast_incQC.xlsm](IMP_VBC_human_yeast_incQC.xlsm)

	
# special topics: 
- PTM 
- protein group inference
- normalization
- MSStats PTM adjusted fc
- MSqRob PTM

## best praxis
- [http://www.ensembl.org/Homo_sapiens/Info/Index](http://www.ensembl.org/Homo_sapiens/Info/Index) if you do [DR]NA and proteomics projects.

# tools:
- FragPipe Analyzer
- Interesting integrative new tool for downstream analysis
https://rdrr.io/github/ftwkoopmans/msdap/


# presentations
- W benchmarking DIANN FragPipe using TripleProteome
- G benchmarking DIANN Spectronaut using HUMAN YEAST
- Q [MSclassifR](https://CRAN.R-project.org/package=MSclassifR) [preprint](https://www.biorxiv.org/content/10.1101/2022.03.14.484252v1)
