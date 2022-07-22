import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from "chart.js";
import { BaseChartDirective } from "ng2-charts";

import DataLabelsPlugin from "chartjs-plugin-datalabels";
import { reduce } from "rxjs";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	title = "angular-charts";

	@ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

	public barChartOptions: ChartConfiguration["options"] = {
		responsive: true,
		// We use these empty structures as placeholders for dynamic theming.
		scales: {
			x: {
				stacked: true,
				grid: {
					display: false,
					borderColor: "#8E8F90",
					borderWidth: 2,
				},
			},
			y: {
				stacked: true,
				grid: {
					borderColor: "#8E8F90",
					borderWidth: 2,
				},
			},
		},
		plugins: {
			legend: {
				display: true,
			},
			datalabels: {
				anchor: "end",
				align: "end",
			},
		},
	};
	public barChartType: ChartType = "bar";
	public barChartPlugins = [DataLabelsPlugin];

	public barChartData: ChartData<"bar"> = {
		labels: ["2006", "2007", "2008", "2009", "2010", "2011", "2012"],
		datasets: [
			{
				data: [65, 59, 80, 81, 56, 55, 40],
				label: "Series A",
				stack: "a",
				backgroundColor: "#82CBCA",
				hoverBackgroundColor: "#82CBCA",
			},
			{
				data: [28, 48, 40, 19, 86, 27, 90],
				label: "Series B",
				stack: "a",
				backgroundColor: "#212733",
				hoverBackgroundColor: "#343C4B",
			},
		],
	};

	// events
	public chartClicked({ event, active }: { event?: ChartEvent; active?: {}[] }): void {
		console.log(event, active);
	}

	public chartHovered({ event, active }: { event?: ChartEvent; active?: {}[] }): void {
		console.log(event, active);
	}

	public randomize(): void {
		// Only Change 3 values
		this.barChartData.datasets[0].data = [
			Math.round(Math.random() * 100),
			59,
			80,
			Math.round(Math.random() * 100),
			56,
			Math.round(Math.random() * 100),
			40,
		];

		this.chart?.update();
	}
}
