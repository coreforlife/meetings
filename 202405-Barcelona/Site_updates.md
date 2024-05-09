VIB

1.	Implementation of MSqRob statistical package side by side with limma 
a.	protein group analysis starting at peptide level (still looking for a good protein group inference software)
b.	PTM analysis outside from MQ sites table summarization: 
MSqRobPTM workflow (Demeulemeester et al., 2024)
i.	PTM site level with correction for parent protein
ii.	Proteoform level with correction for parent protein

2.	Learning how to use Fragpipe (“universal data analysis tool”). Not used in routine as we were still trying to use alternatives (in house search engine/data analysis workflows (e.g. for DDA SAGE+MS2Rescore)) 

3.	Evaluation/implementation of new data analysis pipelines
a.	DIA applied to interaction proteomics (e.g. AP-MS) and PTM analysis.  
b.	Peptide mapping
i.	Identification of all peptides from a purified protein digested with 3 enzymes
1.	Biopharma Finder (Thermo), rather than classic search engine analysis against full proteome. 
c.	Immunopeptidomics and single cell
i.	Closely following what is being developed in the center’s research labs

4.	QSample set up
a.	Currently working on a VM (QSample webserver + atlas data analysis pipeline)

5.	Trying to prepare for computational hurdles associated with new Mass Specs and large scale studies (e.g. clinical, single cell, spatial)
a.	Testing on computer clusters (university, institute)
i.	Purchased new server (1TB RAM,192 CPUs (4x 48-Core processor))


 DKFZ

 1. Spectronaut settings optimization
 3. missRanger can replace missForest?
 4. AlphaPept on Linux as QC
 5. Optimization HYE, fade-in fade-out, thoughts for future benchmarking

EMBL Heidelberg
1. Comparison of TMT and DIA aquisition on the same sample
2. Comparison of DIA-NN with FragPipe-DIA-NN analysis (FragPipe gives lower nuber of IDs)
3. Creation of filtered DIA-NN outputs from report files and creation of simple QC plots
4. Comparison of different data processing steps and their influence on differential abundance analysis (batch-correction, normalization), no real effect

IMP
- expansion of excel exporter (MS2Go) for DIA (Spectronaut)
	+ using msReport python package from MPL
- comparisons of DDA and DIA results (regulated vs regulated, fold change/significance scatter)
	+ ground truth data sets
- universal function for PTM TMT + proteome results processing
- archiving data to azure cold storage

discussed: coautroship policy

up next: chimerys workflow for service, integration of ardia server for chimerys searches and QC
