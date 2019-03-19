# Program - Proteome Informatics Session

date: 2019-03-18 11:30-12:45

* All: Introductions (5min)

* Patrick (Curie): Overview of [myProMS](https://doi.org/10.1002/pmic.200600784) and associated workflows (15min)

* Lena (MPI): Differential abundance analysis with limma including results reporting (15min)

* Frank (EMBL): A script writing scripts: towards a reproducible, transparent and personalized data analysis for proteomics (15min)

* Christian (FGCZ): Analysing core4life QC data using [rawDiag](https://fgcz.github.io/rawDiag/) (15min)

* Summary - collection ideas fro upcoming events, e.g., hackathon


# Common Intrest 

- share Rmd scripts (MaxQuant LFQ) and apply it on different data, e.g., embl TMT yeast.


# Discussion Common Tools of Intrest 

- https://github.com/bartongroup/Proteus

- https://github.com/protcode/isob


# Notes

## rock MaxQuant on Linux


increase max_map_count 

```
cpanse@fgcz-r-028:~ > cat /proc/sys/vm/max_map_count
655350
root@fgcz-r-028:~# echo "655300" >  /proc/sys/vm/max_map_count
root@fgcz-r-028:~# cat /proc/sys/vm/max_map_count
655300
```

run the job

```{bash}
docker run -it -v /scratch/MAXQUANT/WU186531/:/scratch/MAXQUANT/WU186531/  -v /usr/local/MaxQuant/:/usr/local/MaxQuant/ -v /srv/www/htdocs:/srv/www/htdocs --user 40482:10147  mono:5.16.0.179 bash

# inside the docker instance
cd /scratch/MAXQUANT/WU186531/ \
  && mono /usr/local/MaxQuant/MaxQuant_1.6.2.3/MaxQuant/bin/MaxQuantCmd.exe WU186531.xml
```

Version numbers:

|mono|5.16.0.179|
|MaxQuant|1.6.2.3|


input:
84 Q Exactive HF-X Orbitrap

FASTA size: 434MB

more details on the job configuration [WU185740](https://fgcz-bfabric.uzh.ch/bfabric/userlab/show-workunit.html?id=185740)

runtime: 4 weeks
memory: 256GB
