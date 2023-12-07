import { useEffect, useState } from "react";
import { useBins } from "../../contexts/BinContext";
import Chart from "react-apexcharts";


function PieChartHumidity() {
    const { bins } = useBins();
    const [binVal, setBinVal] = useState([]);
    const [humidityAvg, setHumidityAvg] = useState([]);

    //extracting humidity value from all bins
    useEffect(function () {
        const binArr = bins.map((bin) => bin.humidity?.map(hum => hum.value));
        setBinVal([binArr]);


    }, [bins]);

    console.log(binVal);

    //gettting average of humidity values for each bin
    useEffect(() => {
        // Check if binVal is not empty
        if (binVal.length > 0) {
            // Calculate the average for each inner array in binVal
            const averages = binVal[0].map((innerArray, index) => {
                const numericValues = innerArray.map((value) => parseFloat(value));

                // Calculate the sum of numeric values in each inner array
                const sum = numericValues.reduce((acc, value) => acc + value, 0);

                // Calculate the average
                const average = sum / numericValues.length;

                // Return the average
                return {
                    data: average,
                    name: `Bin ${index + 1}`, // Adjust label as needed
                };
               
            });
            setHumidityAvg([averages]);
        }
    }, [binVal]);
 
    return (
     
        <Chart 
        type="pie" 
        width={450} 
      
        series={humidityAvg[0].map(bin => bin.data)} 
        options={{
            title: {text: "Average Humidity PieChart"}, 
            labels: humidityAvg[0].map((bin) => bin.name),
            noData:{text:"Empty data"}}}>


        </Chart>
    );
}

export { PieChartHumidity }



