let dataset = [
    {
        "indicator_id": "3",
        "indicator_name": "Household consumption of iodized salt",
        "prov_name": "Vientiane Capital",
        "pvalue": "93.6",
        "source_year": "2017"
    },
    {
        "indicator_id": "3",
        "indicator_name": "Household consumption of iodized salt",
        "prov_name": "Vientiane Capital",
        "pvalue": "79.5",
        "source_year": "2012"
    },
    {
        "indicator_id": "3",
        "indicator_name": "Household consumption of iodized salt",
        "prov_name": "Vientiane Capital",
        "pvalue": "83.8",
        "source_year": "2006"
    },
    {
        "indicator_id": "2",
        "indicator_name": "Iron\/folate supplementation among pregnant women",
        "prov_name": "Vientiane Capital",
        "pvalue": "25.4",
        "source_year": "2012"
    },
    {
        "indicator_id": "4",
        "indicator_name": "Prevalence of diarrhea in children under five years",
        "prov_name": "Vientiane Capital",
        "pvalue": "6.5",
        "source_year": "2017"
    },
    {
        "indicator_id": "4",
        "indicator_name": "Prevalence of diarrhea in children under five years",
        "prov_name": "Vientiane Capital",
        "pvalue": "10",
        "source_year": "2012"
    },
    {
        "indicator_id": "4",
        "indicator_name": "Prevalence of diarrhea in children under five years",
        "prov_name": "Vientiane Capital",
        "pvalue": "12.4",
        "source_year": "2006"
    },
    {
        "indicator_id": "4",
        "indicator_name": "Prevalence of diarrhea in children under five years",
        "prov_name": "Vientiane Capital",
        "pvalue": "6.1",
        "source_year": "2000"
    },
    {
        "indicator_id": "4",
        "indicator_name": "Prevalence of diarrhea in children under five years",
        "prov_name": "Vientiane Capital",
        "pvalue": "7.3",
        "source_year": "1997"
    },
    {
        "indicator_id": "1",
        "indicator_name": "Vitamin A Supplementation Coverage among children 6-59 months",
        "prov_name": "Vientiane Capital",
        "pvalue": "38.5",
        "source_year": "2017"
    },
    {
        "indicator_id": "1",
        "indicator_name": "Vitamin A Supplementation Coverage among children 6-59 months",
        "prov_name": "Vientiane Capital",
        "pvalue": "0",
        "source_year": "2012"
    },
    {
        "indicator_id": "1",
        "indicator_name": "Vitamin A Supplementation Coverage among children 6-59 months",
        "prov_name": "Vientiane Capital",
        "pvalue": "18.1",
        "source_year": "2006"
    }
]

//Set new var for indicate the unique indicator
let newList = [];
for (let i = 0; i < dataset.length; i++) {
    newList.push(dataset[i]["indicator_id"]);
}

const unique = (value, index, self) => {
    return self.indexOf(value) === index
}
console.log(dataset);
console.log(newList);

let uniqueList = newList.filter(unique);

console.log(uniqueList);

let newDatasetToUse = [];
for (let j = 0; j < uniqueList.length; j++) {
        let tempDataset = [];
        for (let k = 0; k < dataset.length; k++) {
            if (dataset[k]["indicator_id"] === uniqueList[j]) {
                tempDataset.push(dataset[k]);
            }
        }
        newDatasetToUse.push(tempDataset);
}

console.log(newDatasetToUse[0].map(d => d["pvalue"]));