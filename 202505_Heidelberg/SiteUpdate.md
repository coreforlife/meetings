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



# Things to discuss
- Life demo of Gerhards tool
- Life demo of FragPipeCommandeR
- Interactive report from VIB
- Containerization of R scripts
- Server needed for statistical analysis
