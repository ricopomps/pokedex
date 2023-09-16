export enum Charts {
  stats = "Stats",
  sales = "Produtos vendidos",
  incomeByProducts = "Rendimentos por produto",
}

interface SingularValue {
  label: string;
  value: number;
}

interface SingleReportData {
  label: string;
  value: number;
}

interface MultipleReportData {
  label: string;
  values: SingularValue[];
}

type ReportData = SingleReportData[] | MultipleReportData[];

interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string[];
  minBarLength?: number;
  borderColor: string;
  borderWidth: number;
}

export interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

function isSingleReportData(data: ReportData): data is SingleReportData[] {
  return "value" in data[0];
}

function isMultipleReportData(data: ReportData): data is MultipleReportData[] {
  return "values" in data[0];
}

export function transformDataForChart(
  backendData: ReportData,
  reportType?: Charts
): ChartData {
  if (backendData?.length === 0)
    throw Error("Não existem dados para o período informado");
  if (isMultipleReportData(backendData)) {
    const labels = backendData.map((entry) => entry.label);
    const datasets: Dataset[] = [];

    const uniqueLabels = Array.from(
      new Set(
        backendData.flatMap((entry) => entry.values.map((value) => value.label))
      )
    );
    const labelColors: string[] = [
      "#ffbe0b",
      "#fb5607",
      "#ff006e",
      "#8338ec",
      "#3a86ff",
      "#8bf08b",
    ];

    uniqueLabels.forEach((label, index) => {
      const data = backendData.map(
        (entry) =>
          entry.values.find((value) => value.label === label)?.value ?? 0
      );

      datasets.push({
        label,
        minBarLength: 7,
        data,
        backgroundColor: [labelColors[index % labelColors.length]],
        borderColor: "black",
        borderWidth: 2,
      });
    });

    return {
      labels,
      datasets,
    };
  } else if (isSingleReportData(backendData)) {
    return {
      labels: backendData.map((entry) => entry.label),
      datasets: [
        {
          label: reportType ?? "Relatório",
          data: backendData.map((entry) => entry.value),
          backgroundColor: [`#f8ce41`],
          borderColor: "black",
          minBarLength: 7,
          borderWidth: 2,
        },
      ],
    };
  } else {
    throw new Error("Formato de inválido de informações");
  }
}
