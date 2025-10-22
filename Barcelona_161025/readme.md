# Program - Computational Proteomics Session

Barcelona, 16th-17th of October 2025

## Roger - CRG Barcelona

https://github.com/proteomicsunitcrg/atlas
https://github.com/proteomicsunitcrg/rawocop

Roger explained the Qsample quality control system, which processes both DDA and DIA samples using automatic metrics and supports various workflows including FragPipe and DiaNN. He described the implementation of Docker containers for Fragpipe and DiaNN, with Sara noting their current challenges running Bruker due to rebooting issues and limited computational power. The system includes a web server with database functionality, and Roger clarified that while it requires some technical setup, users can process samples through the Atlas pipeline either locally or via a web interface, with output provided in TSV format.

Roger discussed issues with the demo website and pipeline, mentioning missing files and the need to update the container. He explained the process of copying files from acquisition computers to the pipeline using a Windows client, which involves adding a specific column in Excel and configuring a folder for the pipeline to listen to. Roger also described the functionality of the pipeline, including its ability to compute polymer contaminants and perform sample correlations. The discussion touched on the client-side implementation, file integrity checks, and potential alternatives for file transfer.

Roger discussed the completion and publication of a new QCloud pipeline for QC1 and HeLa, which took two years to develop. He explained the process of extracting metrics from report files and the challenges of working with different software versions, particularly for Fragpipe. Roger also touched on the need to discriminate between QC and non-QC samples when analyzing data. The group discussed the importance of using the most up-to-date software version for sample analysis while maintaining consistent reporting methods.

## Frank - EMBL - PCF Heidelberg

- Learning docker, nextflow, shiny
- New file copy system.
- Nextflow pipeline for DiaNN.
- Shiny-App for running nextflow pipeline.
- DIA PTM

Frank discussed his experience working with Docker and Linux, highlighting challenges he faced due to limited exposure to these technologies. He mentioned using tools like Visual Studio Code and Cursor, which incorporate AI features to aid in development. Frank also explained his workflow for developing and deploying software on Linux machines, including the use of Docker containers and SSH for remote work. He described a Nextflow pipeline for automating data processing and a Shiny app for job submission. Frank noted the benefits of having dedicated Linux machines for running software and mentioned ongoing work on file copy systems and post-translational modification analysis using DIA.

## Gerhard - Vienna

- 30 % higher throughput
- 2 FTE for data analysis

Gerhard discussed the development of a pipeline for processing raw files from instruments, focusing on automation and error handling. He explained the use of a Docker container to manage different versions of MaxQuant and described a method for checking if files are finished by querying file sizes and using a library to open files. Gerhard also mentioned plans to automate the backup process and integrate it with their infrastructure, addressing issues with file naming and storage limits. He concluded by highlighting the need for further development in automating project management and allowing customers to query and manage their samples through a web interface.

## Quentin - Paris

- MSclassifR
- 

## Martin DKFZ

- personal changes
- zoom data flow
- limpa experience?

Martin discussed data storage and analysis challenges, noting that file sizes were much larger than initially estimated, with worst-case scenarios reaching 500GB per day. He mentioned plans to upgrade network cards to 10 gigabit and discussed a new R package called Limpa for differential analysis of proteomics data, which he found promising despite some concerning figures in the paper.

Martin discussed issues with statistical analysis and data normalization in proteomics experiments. He explained problems with p-value calculations when counting dependent measurements from the same protein and suggested using weights to account for measurement quality. Frank also criticized the use of VSN normalization in certain conditions, particularly when dealing with missing values, advocating for simpler median normalization or quantile normalization instead. He emphasized the importance of maintaining the biological differences between samples during normalization and suggested condition-wise normalization as a potential solution for some experiments.

## Proteomics Software Challenges and Solutions

The team discussed challenges with software tools for proteomics data analysis, particularly regarding phospho-PTM detection and charge state handling. They explored issues with software bias and the need for more transparent scoring methods, with the group expressing concerns about relying too heavily on vendor-provided solutions. The group also discussed a project comparing different software tools' performance across datasets, noting that while mathematical approaches work in principle, real-world data quality issues need to be addressed. They concluded that developing more independent, customizable analysis solutions would be beneficial for providing clearer insights to customers.

## Christian, FGCZ

Christian discussed the limitations of their current data analysis system, noting that while it contains extensive raw file data, it lacks the necessary tools for proper analysis. They agreed that previous projects, including collaborations with the Bortenmiller lab, had not been successful due to technical challenges with mass spectrometry imaging and internal competition between metabolomics and proteomics teams. They also highlighted the need for better team collaboration and discussed the potential of mass spectrometry imaging for attracting attention and funding, despite its current limitations for untargeted daily business applications.

Christian discussed software management and reproducibility, noting that new software versions require generating new applications or cloning existing ones while maintaining Docker environments. They expressed frustration about lost resources and the challenges of working in a team, particularly when dealing with different units like bioinformatics and wet lab teams who have varying needs and skill levels. The conversation touched on the difficulties of managing shared tools and resources, with the group suggesting that working independently might be more effective, though he acknowledged the value of open source projects despite operational challenges.

Christian discussed the command line version of SpectroNaut, a .NET program, and its interface, which they found to be alpha stage and not as polished as other software. They noted that SpektroNaut has too many parameters, making it difficult for users to achieve desired results without extensive knowledge. Christian and the group agreed that this complexity could be a problem, especially for those without a deep understanding of the software.

Christian discussed the development and deployment of software applications, focusing on configuration files, setup options, and workflow files. They highlighted the use of MaxQuant for generating scaffold outputs and the integration of differential expression applications across various tools like MSQROP and Polevka. Christian emphasized the robustness of their system, which includes customizable reports and a bioconductor class for data injection, while Frank noted the challenges of balancing user customization with efficient maintenance. They also touched on the reusability of applications in sequencing projects and the creation of interactive shiny applications for user customization.

Christian discussed the development of a dashboard for monitoring mass spectrometry instruments, similar to QCloud but adapted for their specific needs. He explained that they use different software for different instruments, including Commit for DDA and Fragpipe for Bruker DDA runs. The dashboard allows him to track instrument usage, QC runs, and data processing, making it easier to address any issues that arise. Christian also mentioned that they have automated QC runs and transfer data to kubeCloud, which he rarely needs to adjust.

Christian discussed the robustness of their data processing system, which handles various types of data including QC01, DR, and DDA, writing outputs to a shared container. He explained their approach to data storage, preferring file-based methods over databases, and described how they manage large datasets using R and R Shiny modules. Christian also mentioned their data archiving system, which transfers data to tape storage after a certain period, with the option to retrieve it for a fee.
