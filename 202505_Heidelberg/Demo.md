# Tool demos
## Short Summary
The meeting covered three main topics related to proteomics data analysis and processing. First, Gerhard discussed his ongoing project involving file processing and analysis, including methods for identifying and processing files. Next, Frank demonstrated the setup and usage of FragPipeCommandeR, a tool for running proteomics data analysis, explaining its configuration and workflow. Finally, Frank and Teresa presented their respective data analysis pipelines, which generate comprehensive reports and visualizations for proteomics data, with plans to make these tools more widely available.

## Next steps
- Teresa to add support for LIMMA in the analysis pipeline.
- Teresa to consider moving the analysis pipeline to command line execution instead of running from RStudio.
- Teresa to explore options for splitting the HTML report file to improve loading times for large datasets.
- Teresa to investigate adding a dropdown menu for selecting between multiple volcano plots in the HTML report.
- Frank to send Teresa the folder containing his analysis pipeline for her to try running it.

## Summary

### File Processing and Analysis Project
In the meeting, Gerhard discussed his ongoing project involving file processing and analysis. He detailed the process of identifying and processing files, including the use of a script that checks for changes in file size and attempts to open files with the raw on package. Gerhard also mentioned a second process that reads from a list of processed files and sorts them by time. He shared his experiences with the project and expressed interest in making it more project-based. Gerhard also discussed the use of different factors and variable modifications in the project. The team discussed potential issues and solutions, including the use of a try-catch function in scripts and the creation of a blacklist of problematic files.

### FragPipeCommandeR Setup and Usage
Frank demonstrates the setup and usage of FragPipeCommandeR, a tool for running proteomics data analysis. He explains the directory structure, configuration files, and how to customize the workflow. The tool uses a YAML file for setup, including paths to necessary software and email settings. Frank shows how to run the tool, which presents a user interface for selecting data folders, workflows, and modification options. He also mentions that the tool can be run in a non-interactive mode by providing a config file. The process includes running the analysis, creating log files, and sending an email upon completion.

### Proteomics Data Analysis Reporting Tools
Frank demonstrates a comprehensive data analysis pipeline that generates extensive QC plots, sequence alignment visualizations, and protein abundance information. The pipeline automatically creates reports with volcano plots, protein abundance rankings, and peptide identification details for the top 25 most abundant proteins. It includes features like color-coded peptide maps showing modifications and intensities. Frank mentions plans to make the tool available on GitHub after generalizing it and removing sensitive information. Teresa then presents her own reporting system, which generates interactive HTML reports with plots and tables summarizing protein quantification results, statistical analyses, and sample comparisons. Her system uses a combination of R scripts and R Markdown files to create customizable reports based on user-specified parameters. Both tools aim to provide comprehensive overviews of proteomics data analysis results in accessible formats.

### Interactive data analysis reports
Teresa presented generation of VIBs interactive summaries using R Markdown creating html documents.
