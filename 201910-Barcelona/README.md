# Program - Computational Proteomics Session

Dates: from 2019-10-07 to 2019-10-09

Computational Proteomics Sessions: 

## 12-13h WG Session 2B: BioInf C4L Parallel Session I

* Small update/introduction from each node (5 min). 
* Short presentations (10 min aprox.) regarding some specific topics like: 
    * [C4L R package](https://github.com/coreforlife/c4lProteomics/tree/master/ProteomeQR) (@cpanse). 
  

## 14-17h WG Session 4B: BioInf C4L Parallel Session II

* On using [IsobarQuant](https://github.com/protcode/isob) and SpectroMine; Correlation using QC TMT (@fstein) [slides](https://github.com/coreforlife/meetings/files/3697789/C4L_Barcelona_V1.pdf)
* myProMS updates [slides](https://github.com/coreforlife/meetings/files/3720358/C4L_BioinfoCurie_20191007.pdf)
* QCloud API (@mserret). [docs](https://documenter.getpostman.com/view/8947947/SVn3qu8K?version=latest),
[slides1](https://github.com/coreforlife/meetings/files/3706916/C4L_BCN_2019_QCloud_C4L_API_MarcSerret.pdf),
[slides2](https://github.com/coreforlife/meetings/files/3706917/C4L_BCN_2019_QCloud_RogerOlivella.pdf),
[slides3](https://github.com/coreforlife/meetings/files/3706918/C4L_BCN_2019_QCloud_general_API_MarcSerret.pdf),
[slides4](https://github.com/coreforlife/meetings/files/3706919/C4L_BCN_2019_Telegram_MarcSerret.pdf)

* PDF weekly reports (@anstaes). 
* Discussion. 
* Hands on: 
    * @cpanse @rolivella: micro hackathon on explore a potential integration of [rawDiag](https://github.com/fgcz/rawDiag) within the [QCloud](http://qcloud2.crg.eu). - [DELIVERY](https://github.com/coreforlife/c4lProteomics/blob/master/RawFileReader-XIC-json) code snippet.



## actions for [next meeting](https://github.com/coreforlife/meetings/tree/master/202004-Vienna)
### CRG:

* Improve isotopologues extraction with XIC algorithm. see also [#6](https://github.com/coreforlife/c4lProteomics/issues/6)
* Publish QCloud C4L API to production server with accessible ports from outside the CRG.
* Make R sample snippets for accessing QCloud2 API. [#8](https://github.com/coreforlife/c4lProteomics/issues/8)
* Add to QCloud C4L Orbitrap Fusion Lumos 1 and 2 (from June) from the VIB.
* Evaluate QCloud API annotations insertion.
* Num. of proteins and peptides (and maybe also LVN Peptide Area) available on Telegram bot.

### VIB:

* Use the QCloud C4L API to generate the weekly PDF report instead of CSV files. [#8](https://github.com/coreforlife/c4lProteomics/issues/8)
* Improve outliers management in the weekly PDF report (by using Boxplots, ...).
* Make available with a link all past PDF reports. (VIB)
* Check why the file lastreport.pdf is not updateing every week though the current PDF file is actually generated (i.e. c4l-hs-week-20190930-20191006_Report.pdf).

### FGCZ:
* provide two proposals for the micro hackathon

