export const RecentsPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center border">
          Item Copiado 1
        </div>
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center border">
          Item Copiado 2
        </div>
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center border">
          Item Copiado 3
        </div>
      </div>

      <div className="min-h-screen flex-1 rounded-xl bg-muted/30 border border-dashed p-4">
        <p className="text-sm text-muted-foreground italic">
          Histórico detalhado do clipboard aparecerá aqui...
        </p>
      </div>
    </div>
  );
};
