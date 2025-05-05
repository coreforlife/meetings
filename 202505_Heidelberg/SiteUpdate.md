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

## DKFZ - Martin
The meeting focused on team expansion, data analysis challenges, and workflow improvements in protein research. Discussions centered around adding new team members, developing quality scores for protein data, and addressing technical limitations in data processing. The team explored various approaches to protein quantification, normalization, and visualization, while also considering ways to enhance efficiency and communication in their research processes.

- Martin to continue evaluating and benchmarking the quality score system for proteomics data analysis.
- Martin to integrate the quality score system with Limma for statistical analysis.
- Martin to further develop and test the low input proteomics workflow for extracellular vesicles and IPs.
- Frank to explore alternative virtualization solutions due to increased VMware licensing costs.
- Martin to investigate and potentially implement database splitting in Frack pipe to optimize RAM usage.
- Martin to refine the normalization approach for IP experiments, particularly for cases with varying bait protein expression efficiency.
- Martin and Frank to continue discussing and refining normalization strategies for different proteomics experiments, including EVs and time series data.

### Dario Joins Team, Quality Score Development

Martin discussed the addition of Dario to their team as a scientist, who was previously in a challenging group at Dkfz. Martin mentioned that he currently has 5 to 10% development time, which will be extended to speed up processes. They are working on generating quality scores and have groups interested in providing feedback. Martin outlined the requirements for a quality measure of intensity per sample per protein group, which should reflect the intuition of mass spec experience people. They are currently using Ibaq values and PP to meet these requirements.


### Quantifying Protein Data With Limma

Martin discussed the challenges of quantifying protein data and the need for a continuous score system. He proposed using a weight matrix in Limma to incorporate the quantity scores, which would help in identifying rare cases of protein abundance. Martin also highlighted the importance of understanding the data to avoid setting thresholds and the need for benchmark data to define the score system. He mentioned the use of a confidence score to reflect the amount of information on every hit and the potential for multiple flowers in volcano plots. Martin emphasized the need to highlight presence-absence situations and the potential for different shapes depending on the number of identifications. He also discussed the importance of understanding the data to avoid over-interpretation of results.


### Challenges of Data Analysis With Raw Package

Martin discussed the challenges of using raw package for data analysis, particularly with large datasets. He mentioned that the raw package accesses raw files, which can be non-ideal for his purposes. Martin also discussed the issue of memory constraints, even with high-end workstations, and the need for efficient resource management. He suggested using Linux machines for data analysis, as they can handle larger datasets and are more cost-effective. Martin also mentioned the use of virtual machines for data analysis, but noted that they can be expensive. He concluded by suggesting the use of Docker for data analysis, which he believes will make the process easier.


### Protein Expression Normalization Challenges Discussed

Frank and Martin discussed the challenges of protein expression normalization in their workflows. Frank highlighted the difficulty of normalizing by bait protein efficiency due to varying expression levels across different samples. He suggested using the median of protein ratios as a normalization method, but acknowledged that this approach may not always be applicable. Martin agreed, noting that their current workflow involves cutting gels and analyzing the resulting proteins, which can be time-consuming. They also discussed the potential for isoform switches in development stages, which could complicate normalization. Frank proposed using a full change correlation plot to visualize the relationship between different protein ratios, but acknowledged that this method may not be suitable for all cases. The conversation ended with Frank sharing his efforts to streamline data analysis and customer communication through Google Docs and appointment scheduling.

## EMBL - Frank

Frank discussed strategies for increasing productivity and efficiency in the facility, including automation and streamlining processes. He highlighted the potential of scripts and automated systems to reduce repetitive tasks and improve project management. Additionally, Frank addressed challenges in maintaining accurate data and proposed solutions for better data access and booking management.

- Frank to extend the method generation script to include more explanatory text in the PDF output.
- Frank to update the analysis script to add more explanatory content to the PDF report.
- Frank to explore the possibility of creating an interactive "cockpit" for the analysis results.
- Team to investigate implementing a web-based tool for sample submission and project management.
- Team to consider containerization solutions for easier exchange of tools and systems between facilities.
- Team to explore options for integrating their systems with Active Directory for user authentication.
- Frank to continue developing the automated method writing and data analysis scripts.
- Team to work on improving the raw file naming and project assignment process to reduce errors.

Frank discussed the idea of streamlining processes in the facility to achieve 10 times more projects without increasing stress. He mentioned a script that automatically writes methods for customers based on publication data. Frank also discussed the creation of a method file for data analysis and the use of a Gmail file to create a user interface. He mentioned the need for automation to reduce repetitive tasks and improve efficiency. Frank also discussed the challenges of maintaining accurate project data and the potential for a web server to manage bookings and data access.

# Things to discuss
- Life demo of Gerhards tool
- Life demo of FragPipeCommandeR
- Interactive report from VIB
- Containerization of R scripts
- Server needed for statistical analysis
- Gerhard demo of sample submission
