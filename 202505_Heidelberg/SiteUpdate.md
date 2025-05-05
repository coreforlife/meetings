# Site update

## Vienna - Gerhard
- First 30 - 40 projects with DIA running with SpectroNaut.
- Extra filter for SpectroNaut. 2 Peptides with abundance above 200 (using triple proteome samples).
- IPs with DIA
- Running SpectroNaut without normalization
- Excel-converter. Reading PD outputs and transorming them into nice Excel. Now also for SpectroNaut.
- Three ms groups (Facility, Carls group and MPL).
- MPL developed python library using Jupyter Notebooks
- More automation:
  * Script that checks all the instruments, writes finished files into a list
  * Second scripts reads output and searches the files in FragPipe
  * Rawrr package to extract scan counts, TIC, etc. writing it to data.tables
  * Shiny that reads data.table outputs from rawrr package script
- samples submission tool in place

## VIB - Teresa
- pilot with nextflow for DiaNN
- Interactive reports ready
- Size of html is a problem with interactive cockpit
- Manual project analysis
- msqrob for statistical analsis
- in the future plan some test for SAINT and compare it to msqrob and limma

  Teresa raised concerns about code sustainability and discussed her work on interactive reports, while expressing interest in learning more about running scripts and potentially moving to servers for demanding tasks. The team explored the use of containerization, particularly Docker, for automation purposes. They also touched on challenges related to sparse data sets, the need for benchmarking, and the possibility of using Globus for file transfer.

Next steps:
- Teresa to explore containerization options for R scripts and statistical analysis workflows.
- Teresa to investigate and test parameters for DIA data analysis using SAINT for BioID and AP-MS experiments.
- Teresa to look into optimizing MS-Stats PTM analysis for better performance on large datasets.
- Team to consider attending courses or training on containerization and Docker usage.
- Teresa to explore the use of Frag-pipe Analyst for protein analysis and statistical workflows.
- Team to investigate the use of Globus for file transfers between institutions.
- Team to continue discussions on developing benchmarking strategies for proteomics software (Proteo-bench)

### Sustainability and Automation of Codes
Teresa discussed her concerns about the sustainability of their codes and the need for containerization. She also mentioned her work on interactive reports and the potential for hardware acceleration for some plots. Teresa expressed interest in learning more about running their scripts and the possibility of moving to servers for more demanding tasks. She also discussed the challenges of data sets with more sparsity and the need for benchmarking. The team also discussed the use of Docker containers for automation and the potential for using Globus for file transfer.



# Things to discuss
- Life demo of Gerhards tool
- Life demo of FragPipeCommandeR
- Interactive report from VIB
- Containerization of R scripts
- Server needed for statistical analysis
