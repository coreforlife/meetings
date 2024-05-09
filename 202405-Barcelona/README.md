# Program - Computational Proteomics Session


Dates: from 2025-05-08 to 2024-05-10<br>


## Summary

### CRG by @rolivella

* Mention: QSample C4L Challenge project presentation. 
* New `atlas` pipeline written in Nextflow for both QCloud and QSample. New optimizations and algorithms. New nucleosides quality control or QCN1. 
* Rawstream project: a structured set of scripts written in bash to send DIA-NN process to a cluster for hundreds of RAW files. Here we can also discuss a similar joint project from VIB and FGCZ.
* Case study: [Globus upload to PRIDE](https://www.ebi.ac.uk/pride/markdownpage/globus) for the C4L harmonization study (4.6 TB).
* nf-core modules development:
   * https://nf-co.re/
   * Adapt this local to nf-core public: https://github.com/nf-core/quantms/tree/master/modules/local
   * Module already done: https://github.com/nf-core/modules/tree/master/modules/nf-core/thermorawfileparser  
   * Test data: https://github.com/nf-core/test-datasets/tree/modules/data/proteomics.  

### FGCZ by @cpanse

[![SIB in-silico talk](https://img.youtube.com/vi/acDiXq2xbOw/1.jpg)](https://www.youtube.com/watch?v=acDiXq2xbOw)

* R code snippets / news:
**koinar [#3392](https://github.com/Bioconductor/Contributions/issues/3392)
**[https://bioconductor.org/packages/rawDiag/](https://bioconductor.org/packages/rawDiag/)
* update compMSI @fgcz
* https://bioconductor.org/packages/rawDiag/ version 0.99.31 with shiny module
* [bfabricPy](https://github.com/fgcz/bfabricPy)
* http://ib2024.ch


### PCF by @fstein
* Comparison of TMT and DIA on same samples
* News on FragPipeCommandeR
* Comparison of different statistical decisions

#### Discussion points
* Best practice: DIA-NN vs Fragpipe DIA-NN
* Best practice: QC for DIA data
* Workflow management systems
* Automated methods and description texts for customers

### DKFZ by Martin
* Is anyone interested in sharing and discussing Spectronaut settings?
* Has someone used missRanger, the fast version of missforest and knows if they yield equivalent results?
https://cran.r-project.org/web/packages/missRanger/vignettes/missRanger.html
* AlphaPept v0.5.0 on Linux cluster first insights (open source makes it possible)
* Analysis optimization with HYE and fade-in fade-out, additional thoughts

### IMP by Gerhard
* Observations from DIA analysis in Spectronaut

# Aftermath 
* [proteoBench for C4L Challenge](http://fgcz-ms.uzh.ch/~cpanse/202403_C4LChallengeProject-proteomics-proteoBench.pdf)  - 2nd call! - kickoff meeting
* *NextFlow* or SnakeMake?
