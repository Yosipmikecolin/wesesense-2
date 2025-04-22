import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Statistics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Estadísticas de incidencias</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total Incidencias" value="10" />
          <StatCard title="Incidencias Abiertas" value="5" />
          <StatCard title="Incidencias Cerradas" value="5" />
        </div>
      </CardContent>
    </Card>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
