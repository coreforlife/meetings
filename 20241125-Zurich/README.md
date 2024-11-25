# 

participants: T, M, Q, W, P, C, F


- quick intro proteobench challange

round table update each site:

- Teresa (VIB)
1.	New server (since May)
o	PowerEdge R7625 Server
o	2 x AMD EPYC 9454 2.75GHz, 48C/96T, 256M Cache (290W) DDR5-
4800
VM	OS	RAM (Gb)	Cores	DiskSpace Gb
1	Win10	64	20	80
2	Ubuntu	512	32	80
3	Win10	64	20	80
4	Win10	64	20	80

2.	DiaNN 1.9.x
o	Better output:
	Data visualization
	Less false positive IDs
	Allegedly better quant
	Drawbacks:
•	More complicated analysis setup
o	2-step analyses
o	Fasta concatenation needed (!?)

3.	New generation of project reports
o	From pptx+excel -> html+excel
o	From limma -> msqrob2/limma
o	Rmarkdown (did not see advantage of Quarto for the time being)

4.	QSample 
o	Tracking all 4 Thermo mass specs
o	New pipeline and webserver update since 1 month
	Faster DDA pipeline (~ 7min): Fragpipe
	Faster DIA pipeline (ca. 15-30 min): DiaNN using previously generated predicted spectral library
	diaPASEF support (~ 50 min)


EMBL / Frank
- external proteomics course coming up
- QC-plots for pLink outputs
- tool for automated DiaNN executution (DiaNN-commandeR)
- further development on FragPipeCommandeR
- further integration of AI into daily life (chatGPT and github copilot)
- Future development:
  - interactive html outputs for customers
  - better documentation (better explanatatory PDFs, videos guiding the user through an analysis)
 - Discussion needed:
   - How to deal with increasing file sizes (e.g. Astral files)
   - How to deal with all the new software developments (new versions, DiaNN, chimerys etc.)
   - How to best benchmark them and decide on which software to use and develop easy to use tools
